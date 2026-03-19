<template>
  <div class="chuni-stats-container">
    <div class="controls">
      <button :class="{ active: currentDiff === 'EXP' }" @click="changeDiff('EXP')">EXP</button>
      <button :class="{ active: currentDiff === 'MAS' }" @click="changeDiff('MAS')">MAS</button>
      <button :class="{ active: currentDiff === 'ULT' }" @click="changeDiff('ULT')">ULT</button>
      
      <div class="divider"></div>

      <div class="toggle-wrapper">
        <label class="switch">
          <input type="checkbox" v-model="isPercent">
          <span class="slider"></span>
        </label>
        <span class="toggle-label">Percent (%)</span>
      </div>

      <div class="divider"></div>

      <div class="filter-wrapper">
        <label>Ct:</label>
        <input type="number" v-model.number="minCt" step="0.1" min="1" max="15.7" class="ct-input">
        <span>~</span>
        <input type="number" v-model.number="maxCt" step="0.1" min="1" max="15.7" class="ct-input">
      </div>
      
      <span class="status-text" :class="{ error: isError }">{{ loadingStatus }}</span>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th @click="handleSort('title')" :class="getSortClass('title')">Title</th>
            <th @click="handleSort('constant')" :class="getSortClass('constant')">Ct</th>
            <th @click="handleSort('Players')" :class="getSortClass('Players')">Players</th>
            <th @click="handleSort('MAX')" :class="getSortClass('MAX')">MAX</th>
            <th @click="handleSort('SSSp')" :class="getSortClass('SSSp')">SSS+</th>
            <th @click="handleSort('SSS')" :class="getSortClass('SSS')">SSS</th>
            <th @click="handleSort('SSp')" :class="getSortClass('SSp')">SS+</th>
            <th @click="handleSort('SS')" :class="getSortClass('SS')">SS</th>
            <th @click="handleSort('S')" :class="getSortClass('S')">S</th>
            <th @click="handleSort('AJ')" :class="getSortClass('AJ')">AJ</th>
            <th @click="handleSort('FC')" :class="getSortClass('FC')">FC</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in sortedData" :key="row.id">
            <td :title="row.title" class="song-title">{{ row.title }}</td>
            <td class="constant-text" :style="{ color: ctColor }">{{ row.constant > 0 ? row.constant.toFixed(1) : '-' }}</td>
            <td>{{ row.Players.toLocaleString() }}</td>
            <td>{{ formatNum(row.MAX, row.Players) }}</td>
            <td>{{ formatNum(row.SSSp, row.Players) }}</td>
            <td>{{ formatNum(row.SSS, row.Players) }}</td>
            <td>{{ formatNum(row.SSp, row.Players) }}</td>
            <td>{{ formatNum(row.SS, row.Players) }}</td>
            <td>{{ formatNum(row.S, row.Players) }}</td>
            <td class="aj-text">{{ formatNum(row.AJ, row.Players) }}</td>
            <td class="fc-text">{{ formatNum(row.FC, row.Players) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const API_BASE = "https://chuni-api.tsaibee.org";

// 響應式狀態 (State)
const currentDiff = ref('MAS');
const isPercent = ref(false);
const loadingStatus = ref('Loading...');
const isError = ref(false);

// Ct 範圍過濾
const minCt = ref(1.0);
const maxCt = ref(15.7);

// 排序狀態
const sortCol = ref('constant');
const sortDesc = ref(true);

// 靜態資料與快取
let idxMap = {};
const allStatsCache = ref({
  EXP: [],
  MAS: [],
  ULT: []
});

// 當前顯示資料直接對應快取
const currentData = computed(() => allStatsCache.value[currentDiff.value] || []);

// 1. 初始化載入共用資料與所有難度 (只跑一次)
const init = async () => {
  try {
    loadingStatus.value = "Loading...";
    isError.value = false;
    
    const [idxRes, constRes, expRes, masRes, ultRes] = await Promise.all([
      fetch("https://chuni.tsaibee.org/data/idx.json"),
      fetch("https://chuni.tsaibee.org/data/song-const/crossverse.json"),
      fetch(`${API_BASE}/stat-exp`),
      fetch(`${API_BASE}/stat-mas`),
      fetch(`${API_BASE}/stat-ult`)
    ]);
    
    const idxData = await idxRes.json();
    const constMap = await constRes.json();
    const expData = await expRes.json();
    const masData = await masRes.json();
    const ultData = await ultRes.json();

    idxData.forEach(song => {
      idxMap[song.id] = song.title;
    });

    // 資料處理 Helper 函數
    const processData = (rawData, diffName) => {
      return rawData.map(row => {
        const title = idxMap[row.id] || "未知歌曲";
        let constant = 0;
        if (constMap[title] && constMap[title][diffName]) {
          constant = constMap[title][diffName];
        }
        return { ...row, title, constant };
      });
    };

    // 處理並存入快取
    allStatsCache.value.EXP = processData(expData, 'EXP');
    allStatsCache.value.MAS = processData(masData, 'MAS');
    allStatsCache.value.ULT = processData(ultData, 'ULT');

    loadingStatus.value = "";

  } catch (error) {
    console.error(error);
    loadingStatus.value = "Error fetching data";
    isError.value = true;
  }
};

// 2. 切換難度 (改為單純切換狀態，不再發送 Request)
const changeDiff = (diff) => {
  currentDiff.value = diff;
};

// 計算屬性：Ct 顏色動態對應
const ctColor = computed(() => {
  const colors = {
    EXP: '#ed5a77',
    MAS: '#dd8aee',
    ULT: '#78deff'
  };
  return colors[currentDiff.value] || 'inherit';
});

const percentColumns = ['MAX', 'SSSp', 'SSS', 'SSp', 'SS', 'S', 'AJ', 'FC'];

// 3. 計算屬性：處理過濾與排序
const sortedData = computed(() => {
  // 先進行 Ct 範圍過濾
  const filtered = currentData.value.filter(row => {
    return row.constant >= minCt.value && row.constant <= maxCt.value;
  });

  // 再進行排序
  return filtered.sort((a, b) => {
    let valA = a[sortCol.value];
    let valB = b[sortCol.value];

    if (isPercent.value && percentColumns.includes(sortCol.value)) {
      valA = a.Players > 0 ? (valA / a.Players) : 0;
      valB = b.Players > 0 ? (valB / b.Players) : 0;
    }

    if (typeof valA === 'string') {
      return sortDesc.value ? valB.localeCompare(valA) : valA.localeCompare(valB);
    }
    
    return sortDesc.value ? (valB - valA) : (valA - valB);
  });
});

// 4. 表頭排序
const handleSort = (column) => {
  if (sortCol.value === column) {
    sortDesc.value = !sortDesc.value;
  } else {
    sortCol.value = column;
    sortDesc.value = true;
  }
};

const getSortClass = (column) => {
  if (sortCol.value !== column) return '';
  return sortDesc.value ? 'sort-desc' : 'sort-asc';
};

// 5. 格式化數字
const formatNum = (val, players) => {
  if (players === 0) return 0;
  if (isPercent.value) {
    return ((val / players) * 100).toFixed(2) + "%";
  }
  return val.toLocaleString();
};

onMounted(() => {
  init();
});
</script>

<style scoped>
.chuni-stats-container {
  margin-top: 1rem;
}

.controls {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
  flex-wrap: wrap;
}

button {
  background-color: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
  border: 1px solid var(--vp-button-alt-border);
  padding: 6px 14px;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.2s;
}

button.active {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-button-brand-text);
  border-color: var(--vp-c-brand-1);
}

button:hover:not(.active) {
  background-color: var(--vp-button-alt-hover-bg);
}

.divider {
  width: 1px;
  height: 24px;
  background-color: var(--vp-c-divider);
  margin: 0 5px;
}

/* Slider Switch 樣式 */
.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: var(--vp-c-default-soft);
  transition: .3s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

input:checked + .slider {
  background-color: var(--vp-c-brand-1);
}

input:checked + .slider:before {
  transform: translateX(20px);
}

.toggle-label {
  font-size: 0.9rem;
  user-select: none;
}

/* Ct Filter 樣式 */
.filter-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
}

.ct-input {
  width: 60px;
  padding: 4px 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  text-align: center;
}

.ct-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.status-text {
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
  margin-left: auto;
}

.status-text.error {
  color: var(--vp-c-danger-1);
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  white-space: nowrap;
}

th, td {
  border: 1px solid var(--vp-c-divider);
  padding: 8px 10px;
  text-align: right;
}

th {
  background-color: var(--vp-c-bg-soft);
  cursor: pointer;
  user-select: none;
  position: sticky;
  top: 0;
  z-index: 10;
  transition: background-color 0.2s;
  width: 100%;
  text-align: center;
}

th:hover {
  background-color: var(--vp-c-bg-mute);
}

th.sort-asc::after { content: " ▲"; color: var(--vp-c-brand-1); font-size: 0.8em; }
th.sort-desc::after { content: " ▼"; color: var(--vp-c-brand-1); font-size: 0.8em; }

.song-title {
  text-align: left;
  max-width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.constant-text {
  font-weight: bold;
}

.aj-text {
  color: #ffd744;
}

.fc-text {
  color: #a3ccf5;
}
</style>