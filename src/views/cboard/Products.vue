<template>
  <div class="page-wrapper">
    <div class="products-dashboard">
      <h2 class="page-title">{{ t('cboard.products.title') }}</h2>

      <section>
        <ProductList />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductList from '@/components/cboard/Products/ProductList.vue'
import { useProducts } from '@/components/cboard/Products/useProducts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { products } = useProducts()
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
  font-weight: 600;
  color: #1C1C1C;
  border-bottom: 1px solid #E0E0E0;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  text-align: start;
}

.product-count {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
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
