<template>
  <section class="offer-list">
    <!-- بطاقة الإضافة -->
    <OfferAddCard @save="loadOffers" />

    <!-- قائمة العروض -->
    <OfferCard
      v-for="offer in offers"
      :key="offer.id"
      :offer="offer"
      @edit="editOffer"
      @toggle="toggleOffer"
      @updated="loadOffers"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useOffers } from './useOffers.ts'
import OfferAddCard from './OfferAddCard.vue'
import OfferCard from './OfferCard.vue'
import type { Offer } from '@/types/contexts/offers1.ts'

const { offers, loadOffers, updateOffer, toggleOfferActive } = useOffers()

onMounted(async () => {
  await loadOffers()
})

function editOffer(offer: Offer) {
  // TODO: افتح OfferAddCard مع بيانات العرض للتعديل
  console.log('تعديل العرض:', offer)
}

async function toggleOffer(offer: Offer) {
  await toggleOfferActive(offer.id)   // ✅ استخدام الدالة الجاهزة
  await loadOffers()
}
</script>

<style scoped>
.offer-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: 'Tajawal', sans-serif;
}
</style>
