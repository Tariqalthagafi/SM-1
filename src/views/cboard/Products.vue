<template>
  <div class="menu-content">
    <h1 class="page-title">إدارة المنتجات في المنيو</h1>
    <div class="product-count">عدد المنتجات: {{ productStore.products.length }}</div>

    <!-- قائمة المنتجات -->
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
  padding: 2rem;
  background-color: #f9f9f9;
}

.page-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.product-count {
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #666;
}

section {
  margin-bottom: 2rem;
}
</style>
