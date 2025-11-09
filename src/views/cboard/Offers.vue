<template>
  <div class="offers-page">
    <h2>{{ t('cboard.offers.title') }}</h2>


    <!-- قائمة العروض -->
    <OfferList />
  </div>
</template>

<script setup lang="ts">
import OfferList from '@/components/cboard/Offers/OfferList.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

</script>

<style scoped>
.offers-page {
  padding: 2rem;
  background-color: #fff; /* أبيض نقي */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}


h2 {
  font-size: 1.6rem;
  font-weight: 600;
  color: #1C1C1C;
  border-bottom: 1px solid #E0E0E0; /* خط فصل بسيط */
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

.offer-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #E0E0E0;
  font-family: 'Tajawal', sans-serif;
}

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

</style>