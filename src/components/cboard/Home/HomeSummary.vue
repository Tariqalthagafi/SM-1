<template>
  <section class="summary-section">
    <h2 class="section-title">{{ t('cboard.home.summary.title') }}</h2>
    <div class="summary-cards">
      <SummaryCard 
        :title="t('cboard.home.summary.totalVisits')" 
        :value="totalVisits + ' ' + t('cboard.home.summary.Visits')" 
      />
      <SummaryCard 
        :title="t('cboard.home.summary.todayVisits')" 
        :value="todayVisits + ' ' + t('cboard.home.summary.Visits')" 
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import SummaryCard from './SummaryCard.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// ✅ بيانات ثابتة للعرض فقط
const totalVisits = ref(3)
const todayVisits = ref(3)
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
  color: #000000;
  font-weight: bold;
  margin: 0;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
</style>
