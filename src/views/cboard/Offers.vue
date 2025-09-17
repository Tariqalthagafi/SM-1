<template>
  <div class="offers-page">
    <h2>📦 إدارة العروض</h2>

    <!-- قائمة العروض -->
    <OfferList />
  </div>
</template>

<script setup lang="ts">
import OfferList from '@/components/cboard/Offers/OfferList.vue'
</script>

<style scoped>
.offers-page {
  padding: 2rem;
  background-color: #f9f9f9;
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
}
</style>