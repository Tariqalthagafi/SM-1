<template>
  <div class="grid-layout">
    <div
      v-for="product in products"
      :key="product.id"
      class="product-card"
    >
      <div class="product-name">{{ product.name }}</div>
      <div class="product-price">
        {{ product.finalPrice }} {{ currencySymbol }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  products: any[]
  sections: any[]
  colors: Record<string, string>
}>()

const currencySymbol = 'ر.س'
</script>

<style scoped>
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  background-color: var(--bodyBackground-bg, #f0f0f0);
  padding: 1rem;
  border-radius: 8px;
}

/* ✅ بطاقة المنتج */
.product-card {
  background-color: var(--cardBackground-bg, #ffffff);
  color: var(--titleText-color, #000);
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
  font-size: 0.9rem;
  font-family: var(--font-family, 'Cairo');
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
}

.product-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* ✅ اسم المنتج */
.product-name {
  margin-bottom: 0.3rem;
  font-weight: bold;
}

/* ✅ السعر */
.product-price {
  color: var(--priceText-color, #333);
  background-color: var(--priceBackground-bg, transparent);
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
}
</style>
