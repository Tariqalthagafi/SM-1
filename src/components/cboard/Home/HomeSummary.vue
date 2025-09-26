<template>
  <section class="summary-section">
    <h2 class="section-title">ملخص النشاط</h2>
    <div class="summary-cards">
      <SummaryCard title="👁️ إجمالي الزيارات" :value="totalVisits + ' زيارة'" />
      <SummaryCard title="📅 زيارات اليوم" :value="todayVisits + ' زيارة'" />
      <SummaryCard title="🕒 آخر تعديل" :value="homeStore.lastUpdated" />
    </div>
  </section>
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
.summary-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: 'Tajawal', sans-serif;
}

.section-title {
  font-size: 1.4rem;
  color: #000000; /* ✅ برتقالي للتمييز */
  font-weight: bold;
  margin: 0;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
</style>
