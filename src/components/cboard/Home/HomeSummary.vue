<template>
  <div class="summary-cards">
    <SummaryCard title="👁️ إجمالي الزيارات" :value="totalVisits + ' زيارة'" />
    <SummaryCard title="📅 زيارات اليوم" :value="todayVisits + ' زيارة'" />
    <SummaryCard title="🕒 آخر تعديل" :value="homeStore.lastUpdated" />
  </div>
</template>

<script setup lang="ts">

import { useHomeStore } from '@/stores/cboard/homeStore'
import SummaryCard from './SummaryCard.vue'
import { computed } from 'vue'

const homeStore = useHomeStore()

const totalVisits = computed(() => homeStore.activityLog.length)

const todayVisits = computed(() => {
  const today = new Date().toISOString().slice(0, 10)
  return homeStore.activityLog.filter(log => log.startsWith(today)).length
})

</script>
<style scoped>

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.2rem;
}

</style>