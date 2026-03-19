<template>
  <div>
    <h2>System status</h2>
    <table>
      <thead>
        <tr>
          <th>Port</th>
          <th>Status </th>
          <th>Response time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="api in apis" :key="api.name">
          <td>{{ api.name }}</td>
          <td :class="{'ok': api.status === 'ok', 'fail': api.status === 'fail'}">
            {{ api.statusText }}
          </td>
          <td>{{ api.timeText }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const apis = ref([
  { name: 'Port 1', url: 'https://chuni-api.tsaibee.org/eventp?id=1', status: '', statusText: '', timeText: '' },
  { name: 'Port 2', url: 'https://chuni-api.tsaibee.org/eventp?id=2', status: '', statusText: '', timeText: '' },
  { name: 'Port 3', url: 'https://chuni-api.tsaibee.org/eventp?id=3', status: '', statusText: '', timeText: '' },
  { name: 'Port 4', url: 'https://chuni-api.tsaibee.org/eventp?id=4', status: '', statusText: '', timeText: '' },
  { name: 'Port 5', url: 'https://chuni-api.tsaibee.org/eventp?id=5', status: '', statusText: '', timeText: '' }
])

function checkStatus() {
  apis.value.forEach(api => {
    const start = Date.now()
    fetch(api.url, { method: 'POST' })
      .then(res => {
        const elapsed = Date.now() - start
        if (res.ok) {
          api.status = 'ok'
          api.statusText = '✅ Ok'
          api.timeText = `${elapsed} ms`
        } else {
          api.status = 'fail'
          api.statusText = '❌ Error'
          api.timeText = '-'
        }
      })
      .catch(() => {
        api.status = 'fail'
        api.statusText = '❌ Error'
        api.timeText = '-'
      })
  })
}

onMounted(() => {
  checkStatus()
  setInterval(checkStatus, 300000)
})
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}
.ok {
  color: green;
  font-weight: bold;
}
.fail {
  color: red;
  font-weight: bold;
}
</style>
