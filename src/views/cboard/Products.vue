<template>
  <div class="menu-content">
   

    <!-- قائمة المنتجات -->
    <section>
      <ProductList />
    </section>
  </div>
</template>

<script setup lang="ts">
// ✅ استيراد المكون الموحد
import ProductList from '@/components/cboard/Products/ProductList.vue'
</script>

<style scoped>
.menu-content {
  padding: 2rem;
  background-color: #f9f9f9;
}
section {
  margin-bottom: 2rem;
}
</style>
