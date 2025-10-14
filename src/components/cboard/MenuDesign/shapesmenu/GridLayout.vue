<template>
  <div class="grid-layout">
    <div
      v-for="product in products"
      :key="product.id"
      class="product-card"
    >
      <!-- ✅ صورة المنتج -->
      <div class="product-image-wrapper" v-if="imageShape !== 'none'">
        <img
          v-if="product.imageBase64"
          :src="product.imageBase64"
          :class="['product-image', imageShape]"
          alt="صورة المنتج"
        />
        <div v-else class="product-image placeholder" :class="imageShape"></div>
      </div>

      <div class="product-name">{{ product.name }}</div>

      <div class="product-price">
        <span class="final-price">
          {{ product.finalPrice }}
          <span v-if="currencyKey !== 'svg-riyal'">{{ currencySymbol }}</span>
          <span v-else v-html="currencySymbol"></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  products: {
    id: string
    name: string
    basePrice: number
    finalPrice: number
    imageBase64?: string
  }[]
  sections?: any[]
  currencySymbol: string
  currencyKey: string
  imageShape: 'circle' | 'roundedSquare' | 'rectangle' | 'none'
}>()
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

/* ✅ صورة المنتج */
.product-image-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  background-color: #eee;
}

/* الأشكال */
.product-image.circle {
  border-radius: 50%;
}

.product-image.roundedSquare {
  border-radius: 12px;
}

.product-image.rectangle {
  width: 120px;
  height: 80px;
  border-radius: 6px;
}

.product-image.none {
  display: none;
}

.product-image.placeholder {
  background-color: #ddd;
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

.final-price {
  font-weight: bold;
}
</style>
