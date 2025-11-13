<template>
  <div class="page-wrapper">
    <div class="products-dashboard">
      <h1 class="page-title">{{ t('cboard.products.title') }}</h1>
      <div class="product-count">
        {{ t('cboard.products.count', { count: productStore.products.length }) }}
      </div>

      <section>
        <ProductList />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductList from '@/components/cboard/Products/ProductList.vue'
import { useProductsStore } from '@/stores/cboard/products'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const productStore = useProductsStore()
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

.products-dashboard {
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
  font-weight: bold;
  margin: 0;
  color: #FF7A00;
}

.product-count {
  font-size: 1rem;
  color: #1C1C1C;
}

section {
  margin: 0;
}

/* دعم الجوال */
@media (max-width: 768px) {
  .products-dashboard {
    padding: 1rem;
  }
}
</style>
