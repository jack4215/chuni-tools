<template>
  <div v-if="songList.length">
    <table class="custom-table">
      <colgroup>
        <col />
        <col />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th>曲繪</th>
          <th>曲名</th>
          <th>難度</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="song in songList" :key="song.title + song.diff">
          <td>
            <img :src="getImageUrl(song.image)" width="100" :alt="song.title" />
          </td>
          <td>
            <span v-if="song.lang" :lang="song.lang">{{ song.title }}</span>
            <span v-else>{{ song.title }}</span>
          </td>
          <td>
            <span lang="en">
              <font :color="getColor(song.diff)">[{{ song.diff }}] </font>
              <span v-if="song.diff !== 'WE'">Lv.{{ song.level }}</span>
              <span v-else>{{ song.level }}</span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  input: {
    type: String,
    required: true
  }
})

const musicData = ref([])
const songList = ref([])

const difficultyMap = {
  BAS: 'lev_bas',
  ADV: 'lev_adv',
  EXP: 'lev_exp',
  MAS: 'lev_mas',
  ULT: 'lev_ult'
}

function getColor(diff) {
  switch (diff) {
    case 'BAS': return '#8ae29a'
    case 'ADV': return '#ea8a55'
    case 'EXP': return '#ed5a77'
    case 'MAS': return '#dd8aee'
    case 'ULT': return '#78deff'
    case 'WE':  return '#f6e73c'
    default: return '#cccccc'
  }
}

function getImageUrl(filename) {
  return `https://new.chunithm-net.com/chuni-mobile/html/mobile/img/${filename}`
}

function getWEStars(we_star) {
  const map = {
    '1': '1☆',
    '3': '2☆',
    '5': '3☆',
    '7': '4☆',
    '9': '5☆'
  }
  return map[we_star] || '?☆'
}

// ★ 新增：語言偵測函式
function detectLang(text) {
  if (!text) return null;
  // 偵測日文 (平假名 \u3040-\u309f 或 片假名 \u30a0-\u30ff)
  if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) {
    return 'ja';
  }
  // 偵測純英文 (ASCII)
  if (/^[\x00-\x7F]+$/.test(text)) {
    return 'en';
  }
  // 其他 (例如中文/純漢字)
  return null;
}

function processInput() {
  const lines = props.input.trim().split('\n')
  songList.value = lines.map(line => {
    // 找出最後一個逗號的位置
    const lastCommaIndex = line.lastIndexOf(',')
    
    // 如果沒有找到逗號，回傳預設值或跳過
    if (lastCommaIndex === -1) return null
    
    // 利用 slice 切分歌名與難度
    const rawTitle = line.slice(0, lastCommaIndex).trim()
    const diff = line.slice(lastCommaIndex + 1).trim().toUpperCase()

    if (diff === 'WE') {
      const song = musicData.value.find(s =>
        s.title === rawTitle &&
        s.we_kanji &&
        s.we_star
      )
      const finalTitle = song?.title || rawTitle;
      return {
        title: finalTitle,
        diff,
        level: song ? `${getWEStars(song.we_star)}${song.we_kanji}` : '?',
        image: song?.image || '',
        lang: detectLang(finalTitle) 
      }
    }

    // 一般難度
    const song = musicData.value.find(s =>
      s.title === rawTitle && s[difficultyMap[diff]]
    )
    const levelKey = difficultyMap[diff]
    const finalTitle = song?.title || rawTitle;
    
    return {
      title: finalTitle,
      diff,
      level: song?.[levelKey] || '?',
      image: song?.image || '',
      lang: detectLang(finalTitle) 
    }
  }).filter(Boolean) // 過濾掉格式錯誤產生 null 的行
}

onMounted(async () => {
  const res = await fetch('https://chuni-event.tsaibee.org/music.json')
  musicData.value = await res.json()
  processInput()
})
</script>

<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse;
  max-width: 585px;
}

.custom-table th, .custom-table td {
  border: 1px solid var(--vp-input-border-color);
  padding: 8px;
  word-break: break-word;
  overflow-wrap: break-word;
}
.custom-table colgroup col:nth-child(1) {
  width: 20%;
}
.custom-table colgroup col:nth-child(2) {
  width: 60%;
}
.custom-table colgroup col:nth-child(3) {
  width: 20%;
}
</style>