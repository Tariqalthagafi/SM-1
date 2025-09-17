<template>
  <div class="linker-page">
    <h2>🔗 ربط المنتجات بالأقسام</h2>

    <div v-if="productsStore.products.length">
      <ProductlinkerRow
        v-for="product in productsStore.products"
        :key="product.id"
        :product="product"
      />
    </div>

    <div v-else class="empty-state">
      لا توجد منتجات لعرضها.
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/cboard/products'
import { useOffersStore } from '@/stores/cboard/offers'
import { useSectionStore } from '@/stores/cboard/sections'
import ProductlinkerRow from '@/components/cboard/linker/ProductlinkerRow.vue'

const productsStore = useProductsStore()
const offersStore = useOffersStore()
const sectionsStore = useSectionStore()

onMounted(() => {
  Promise.all([
    offersStore.load(),
     sectionsStore.load(),
    productsStore.load(),
  ])
})
</script>

<style scoped>
.linker-page {
  padding: 2rem;
  background-color: #f9f9f9;
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
}

.empty-state {
  padding: 1rem;
  color: #777;
  font-style: italic;
}
</style>
