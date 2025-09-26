<template>
  <div class="menu-content">
    <h1 class="page-title">إدارة المنتجات في المنيو</h1>
    <div class="product-count">عدد المنتجات: {{ productStore.products.length }}</div>

    <section>
      <ProductList />
    </section>
  </div>
</template>

<script setup lang="ts">
import ProductList from '@/components/cboard/Products/ProductList.vue'
import { useProductsStore } from '@/stores/cboard/products'

const productStore = useProductsStore()
</script>

<style scoped>
.menu-content {
  padding: 0; /* ✅ إزالة الحواف الزائدة */
  background-color: transparent; /* ✅ إزالة الخلفية الرمادية */
  font-family: 'Tajawal', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-title {
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0;
  color: #FF7A00; /* ✅ برتقالي للتمييز */
}

.product-count {
  font-size: 1rem;
  color: #1C1C1C; /* ✅ أسود للنص */
}

section {
  margin: 0;
}
</style>
