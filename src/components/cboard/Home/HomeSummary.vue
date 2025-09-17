<template>
  <div class="summary-cards">
    <SummaryCard title="📋 المنتجات" :value="homeStore.productCount + ' منتج'" />
    <SummaryCard title="📁 الأقسام" :value="homeStore.categoryCount + ' قسم'" />
    <SummaryCard title="🕒 آخر تعديل" :value="homeStore.lastUpdated" />
  </div>
</template>

<script setup lang="ts">
import { useHomeStore } from '@/stores/cboard/homeStore'
import SummaryCard from './SummaryCard.vue'

const homeStore = useHomeStore()
</script>

<style scoped>
.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.2rem;
}
</style>
