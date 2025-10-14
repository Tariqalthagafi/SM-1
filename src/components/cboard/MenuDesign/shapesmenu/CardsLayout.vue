<template>
  <div class="cards-layout">
    <div
      v-for="product in products"
      :key="product.id"
      class="card"
    >
      <!-- ✅ صورة المنتج -->
      <div class="card-image" v-if="imageShape !== 'none'">
        <img
          v-if="product.imageBase64"
          :src="product.imageBase64"
          :class="['product-image', imageShape]"
          alt="صورة المنتج"
        />
        <div v-else class="product-image placeholder" :class="imageShape"></div>
      </div>

      <div class="card-header">
        <span class="product-name">{{ product.name }}</span>
      </div>

      <div class="card-body">
        <span class="product-price">
          <span v-if="product.finalPrice !== product.basePrice" class="old-price">
            {{ product.basePrice }}
            <span v-if="currencyKey !== 'svg-riyal'">{{ currencySymbol }}</span>
            <span v-else v-html="currencySymbol"></span>
          </span>

          <span class="final-price">
            {{ product.finalPrice }}
            <span v-if="currencyKey !== 'svg-riyal'">{{ currencySymbol }}</span>
            <span v-else v-html="currencySymbol"></span>
          </span>
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
  currencySymbol: string
  currencyKey: string
  imageShape: 'circle' | 'roundedSquare' | 'rectangle' | 'none'
}>()
</script>

<style scoped>
.cards-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  background-color: var(--bodyBackground-bg, #f0f0f0);
  padding: 1rem;
  border-radius: 8px;
}

/* ✅ البطاقة */
.card {
  width: calc(33.333% - 1rem);
  background-color: var(--cardBackground-bg, #ffffff);
  color: var(--titleText-color, #000);
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  font-family: var(--font-family, 'Cairo');
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* ✅ صورة المنتج */
.card-image {
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

/* ✅ رأس البطاقة */
.card-header {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--titleText-color, #000);
}

/* ✅ جسم البطاقة */
.card-body {
  font-size: 0.9rem;
  background-color: var(--productBackground-bg, transparent);
  padding: 0.5rem;
  border-radius: 4px;
}

/* ✅ السعر */
.product-price {
  font-weight: bold;
  color: var(--priceText-color, #333);
  background-color: var(--priceBackground-bg, transparent);
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
}

/* ✅ السعر القديم */
.old-price {
  text-decoration: line-through;
  color: red;
  margin-right: 0.3rem;
}

/* ✅ السعر النهائي */
.final-price {
  font-weight: bold;
  color: var(--currencyIcon-color, inherit);
}

/* ✅ رمز العرض */
.offer-label {
  background-color: var(--offerLabel-bg, #007bff);
  color: #fff;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  display: inline-block;
}

/* ✅ رمز الحساسية */
.allergen-icon {
  color: var(--allergenIcon-color, #ff0000);
  font-size: 1.2rem;
  margin-left: 0.3rem;
}

/* ✅ رمز المنتج المنتهي */
.expired-icon {
  color: var(--expiredProductIcon-color, #9e9e9e);
  font-size: 1.2rem;
  margin-left: 0.3rem;
}
</style>
