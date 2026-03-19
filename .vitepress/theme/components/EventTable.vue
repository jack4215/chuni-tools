<script setup>
import { ref, onMounted, watch } from 'vue'

// 傳入 id，預設值為 "1"
const props = defineProps({
  id: {
    type: [String, Number],
    default: '1'
  }
})

const cards = ref([])
const isLoading = ref(true)
const expandedCards = ref([])
const hasError = ref(false)

const toggleExpand = (index) => {
  const i = expandedCards.value.indexOf(index)
  if (i >= 0) {
    expandedCards.value.splice(i, 1)
  } else {
    expandedCards.value.push(index)
  }
}

const fetchData = async () => {
  isLoading.value = true
  hasError.value = false
  try {
    const res = await fetch(`https://chuni-api.tsaibee.org/eventp?id=${props.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

    const data = await res.json()

    cards.value = data
      .filter(entry => entry.Player) // 只保留 player 資料
      .slice(0, 99) // 最多顯示前 99 筆
  } catch (err) {
    console.error('Error:', err)
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})

// 如果 props.id 改變，重新 fetch
watch(() => props.id, () => {
  fetchData()
})
</script>


<template>
  <div v-if="isLoading" id="loading">
    <div :class="hasError ? 'error-spinner' : 'spinner'">
      <template v-if="hasError">!</template>
    </div>
    <div class="loading-text">
      {{ hasError ? 'An error occurred, please try again later.' : 'Loading...' }}
    </div>
  </div>

  <div v-else-if="hasError" id="loading">
    <div class="error-spinner">!</div>
    <div class="loading-text">An error occurred, please try again later.</div>
  </div>

  <div v-else class="card-list">
    <div
      class="player-card"
      :class="[
        { expanded: expandedCards.includes(index) },
        {
          'gold-card': Number(card.Rank) === 1,
          'silver-card': Number(card.Rank) === 2,
          'bronze-card': Number(card.Rank) === 3
        }
      ]"
      v-for="(card, index) in cards"
      :key="index"
      @click="toggleExpand(index)"
    >
      <div class="card-header">
        <span class="player-name">{{ card.Player || '' }}</span>
        <span class="player-total">{{ card.Total || '' }}</span>
        <span
          class="player-rank"
          :class="{
            gold: Number(card.Rank) === 1,
            silver: Number(card.Rank) === 2,
            bronze: Number(card.Rank) === 3
          }"
        >
          {{ card.Rank || '' }}
        </span>
      </div>

      <div class="card-body" v-if="expandedCards.includes(index)">
        <div><strong>Track 1：</strong>{{ card.Track1 || '' }}</div>
        <div><strong>Track 2：</strong>{{ card.Track2 || '' }}</div>
        <div><strong>Track 3：</strong>{{ card.Track3 || '' }}</div>
      </div>

      <div class="card-footer">
        <small class="time-text">{{ card.Time }}</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.round-card-wrapper {
  margin: 1em 0;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  border-collapse: collapse;
  width: 100%;
  min-width: 600px;
  background-color: var(--vp-c-bg-soft);
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;   
}

thead {
  background-color: var(--vp-c-bg-alt);
}

th, td {
  padding: 12px 5px;
  text-align: center;
  font-size: 0.95rem;
  border-bottom: 1px solid var(--vp-c-divider);
  white-space: nowrap;
}

th {
  font-weight: 600;
}

tbody tr:hover {
  background-color: rgba(100, 100, 100, 0.07);
  transition: background-color 0.2s;
}

tbody tr:last-child td {
  border-bottom: none;
}

#loading {
  text-align: center;
  margin: 5rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.9375rem;
}
.error-spinner {
  margin: 6rem 0 3rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-2);
  font-size: 4rem;
  font-weight: 500;
}
.spinner {
  margin: 1.5rem auto;
  border: 0.5rem solid var(--vp-c-bg-alt);
  border-top-color: var(--vp-c-text-2);
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  animation: spin 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite;
}
@keyframes spin {
  0%  { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.card-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
}

.player-card {
  position: relative;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  padding: 1rem 1rem 2.1rem 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: background-color 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.player-card.expanded {
  padding: 1rem;
}

.player-card:hover {
  background-color: rgba(100, 100, 100, 0.05);
}
.gold-card {
  background: linear-gradient(115deg, #dea80950 45%, #fbd92350 45%);
  transition: background 0.3s;
}
.gold-card:hover {
  background: linear-gradient(115deg, #dea80960 45%, #fbd92360 45%);
}

.silver-card {
  background: linear-gradient(115deg, #5aaec750 45%, #77d6fb50 45%);
  transition: background 0.3s;
}
.silver-card:hover {
  background: linear-gradient(115deg, #5aaec760 45%, #77d6fb60 45%);
}

.bronze-card {
  background: linear-gradient(115deg, #ec6d0550 45%, #fda41250 45%);
  transition: background 0.3s;
}
.bronze-card:hover {
  background: linear-gradient(115deg, #ec6d0560 45%, #fda41260 45%);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
}

.player-name {
  flex: 1 1 45%;
  font-weight: 600;
  text-align: left;
}

.player-total {
  flex: 0 0 35%;
  text-align: center;
}

.player-rank {
  flex: 0 0 20%;
  text-align: center;
  font-style: italic;
  font-weight: bold;
  color: var(--vp-code-line-number-color);
  font-size: 3rem;
  user-select: none;
}
.player-rank.gold {
  color: #c9ae17;
}
.player-rank.silver {
  color: #58bbdb;
}
.player-rank.bronze {
  color: #CD7F32;
}
.card-body {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-footer {
  position: absolute;
  bottom: 4px;
  right: 8px;
}

.time-text {
  font-size: 0.75rem;
  color: #888;
}

</style>

