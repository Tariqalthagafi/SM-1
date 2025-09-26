<template>
  <div class="linker-page">
<h2>🔗 إدارة تسعير المنتجات وربطها بالأقسام</h2>

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
  background-color: #fff; /* خلفية بيضاء ناعمة */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: 'Tajawal', sans-serif;
}

h2 {
  font-size: 1.6rem;
  font-weight: 600;
  color: #1C1C1C;
  border-bottom: 1px solid #E0E0E0; /* خط فصل بسيط */
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

/* حالة عدم وجود منتجات */
.empty-state {
  padding: 1rem;
  color: #999;
  font-size: 0.9rem;
  font-style: italic;
  border: 1px dashed #ccc;
  border-radius: 6px;
  background-color: #fdfdfd;
  text-align: center;
}

.product-linker-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #E0E0E0;
}

</style>
