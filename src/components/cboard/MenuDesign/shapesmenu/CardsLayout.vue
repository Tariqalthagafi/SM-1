<template>
  <div class="cards-layout">
    <div
      v-for="product in products"
      :key="product.id"
      class="card"
    >
      <div class="card-image" v-if="imageShape !== 'hidden'">
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
        <p v-if="product.calories !== undefined" class="product-calories">
  🍽 {{ product.calories }} سعرة حرارية
</p>

        <p v-if="product.description" class="product-description">
  {{ product.description }}
</p>

      </div>

      <div class="card-body">
        <div class="product-price" :class="offerStyle">
          <template v-if="offerStyle === 'strikeOnly' && product.offerLabel">
            <span class="old-price">{{ product.basePrice }} <span v-html="currencySymbol"></span></span>
            <span class="final-price">{{ product.finalPrice }} <span v-html="currencySymbol"></span></span>
          </template>

          <template v-else-if="offerStyle === 'strikeWithSaving' && product.offerLabel">
            <span class="offer-label">🔥 وفر {{ product.basePrice - product.finalPrice }} <span v-html="currencySymbol"></span></span>
            <span class="old-price">{{ product.basePrice }} <span v-html="currencySymbol"></span></span>
            <span class="final-price">{{ product.finalPrice }} <span v-html="currencySymbol"></span></span>
          </template>

          <template v-else-if="offerStyle === 'strikeWithBadge' && product.offerLabel">
            <span class="offer-label">🔖 خصم {{ Math.round((1 - product.finalPrice / product.basePrice) * 100) }}%</span>
            <span class="old-price">{{ product.basePrice }} <span v-html="currencySymbol"></span></span>
            <span class="final-price">{{ product.finalPrice }} <span v-html="currencySymbol"></span></span>
          </template>

          <template v-else>
            <span class="final-price">{{ product.finalPrice }} <span v-html="currencySymbol"></span></span>
          </template>
        </div>

        <div v-if="product.hasAllergens && product.allergens?.length" class="allergens-display">
          <span
            v-for="allergen in product.allergens"
            :key="allergen"
            class="allergen-icon"
            :class="allergenIconStyle"
          >
            {{ getAllergenSymbol(allergenIconStyle ?? 'boxedA') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  products: {
    id: string
    name: string
    basePrice: number
    finalPrice: number
    offerLabel?: string
    imageBase64?: string
    allergens?: string[]
    hasAllergens?: boolean
    description?: string
    calories?: number
  }[]
  currencySymbol: string
  currencyKey: string
  imageShape: 'circle' | 'roundedSquare' | 'rectangle' | 'hidden'
  offerStyle: 'strikeOnly' | 'strikeWithSaving' | 'strikeWithBadge'
  allergenIconStyle?: 'colored' | 'outlined' | 'monochrome' | 'hidden' | 'boxedA' | 'boldA' | 'warningTriangle'
}>()

function getAllergenSymbol(style: string): string {
  switch (style) {
    case 'boxedA':
    case 'colored':
    case 'outlined':
      return '🅰'
    case 'boldA':
    case 'monochrome':
      return 'A'
    case 'warningTriangle':
      return '⚠'
    case 'hidden':
      return ''
    default:
      return '?'
  }
}
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

.card-header {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--titleText-color, #000);
}

.card-body {
  font-size: 0.9rem;
  background-color: var(--productBackground-bg, transparent);
  padding: 0.5rem;
  border-radius: 4px;
}

.product-price {
  font-weight: bold;
  color: var(--priceText-color, #333);
  background-color: var(--priceBackground-bg, transparent);
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
}

.old-price {
  text-decoration: line-through;
  color: red;
  margin-inline-end: 0.3rem;
}

.final-price {
  font-weight: bold;
  color: #2e7d32;
}

.offer-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--offerLabel-color, #FF7A00);
  margin-top: 0.2rem;
  display: inline-block;
}

.allergens-display {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.allergen-icon.boxedA {
  background-color: #ffe5e5;
  color: var(--allergenIcon-color, #d00);
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
  font-size: 0.85rem;
}

.allergen-icon.outlined {
  border: 1px solid var(--allergenIcon-color, #d00);
  padding: 0.2rem;
  border-radius: 4px;
  color: var(--allergenIcon-color, #d00);
  font-size: 0.85rem;
}

.allergen-icon.warningTriangle {
  color: var(--allergenIcon-color, #FF7A00);
  font-size: 1rem;
}

.allergen-icon.monochrome {
  color: var(--allergenIcon-color, #666);
  font-size: 0.85rem;
}

.allergen-icon.boldA {
  font-weight: bold;
  color: var(--allergenIcon-color, #333);
  font-size: 0.85rem;
}

.allergen-icon.hidden {
  display: none;
}
.product-description {
  font-size: 0.8rem;
  color: var(--descriptionText-color, #666);
  margin-top: 0.4rem;
  line-height: 1.4;
}
.product-calories {
  font-size: 0.75rem;
  color: var(--caloriesText-color, #888);
  margin-top: 0.3rem;
}

</style>
