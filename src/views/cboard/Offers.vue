<template>
  <div class="page-wrapper">
    <div class="offers-dashboard">
      <h2 class="page-title">{{ t('cboard.offers.title') }}</h2>

      <!-- قائمة العروض -->
      <OfferList />
    </div>
  </div>
</template>

<script setup lang="ts">
import OfferList from '@/components/cboard/Offers/OfferList.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: max-content;
  padding: 2rem 1rem;
  background-color: #FFFFFF;
  overflow-x: hidden;
}

.offers-dashboard {
  width: 100%;
  max-width: 1000px;
  display: grid;
  row-gap: 1.5rem;
  padding: 0;
  background-color: transparent;
  box-sizing: border-box;
  font-family: 'Tajawal', sans-serif;
}

.page-title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #1C1C1C;
  border-bottom: 1px solid #E0E0E0;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

/* ✅ بطاقة العرض */
.offer-row {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
}
.offer-row:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* ✅ زر الإضافة */
.add-offer-btn {
  background-color: #FF7A00;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
}
.add-offer-btn:hover {
  background-color: #e96c00;
}

/* ✅ دعم الجوال */
@media (max-width: 768px) {
  .offers-dashboard {
    padding: 1rem;
  }

  .offer-row {
    padding: 0.75rem;
  }
}
</style>

