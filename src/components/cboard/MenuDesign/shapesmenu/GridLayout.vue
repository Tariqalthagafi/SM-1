<template>
  <div class="grid-layout" :style="{ backgroundColor: colors.bodyBackground }">
    <div
      v-for="product in products"
      :key="product.id"
      class="product-card"
      :style="{ backgroundColor: colors.cardBackground, color: colors.titleText }"
    >
      <!-- ✅ صورة المنتج -->
      <div class="product-image-wrapper" v-if="imageShape !== 'hidden'">
        <img
          v-if="product.imageBase64"
          :src="product.imageBase64"
          :class="['product-image', imageShape]"
          alt="صورة المنتج"
        />
        <div v-else class="product-image placeholder" :class="imageShape"></div>
      </div>

      <div class="product-name">
        {{ product.name }}
        <p v-if="product.calories !== undefined" class="product-calories">
          🍽 {{ product.calories }} سعرة حرارية
        </p>
        <p v-if="product.description" class="product-description">
          {{ product.description }}
        </p>
      </div>

      <!-- ✅ السعر حسب نمط العرض -->
      <div class="product-price" :class="offerStyle" :style="{ backgroundColor: colors.priceBackground, color: colors.priceText }">
        <template v-if="offerStyle === 'strikeOnly' && product.offerLabel">
          <span class="old-price">{{ product.basePrice }} <span v-html="currencySymbol"></span></span>
          <span class="final-price">{{ product.finalPrice }} <span v-html="currencySymbol"></span></span>
        </template>

        <template v-else-if="offerStyle === 'strikeWithSaving' && product.offerLabel">
          <span class="offer-label" :style="{ color: colors.offerLabel }">
            🔥 وفر {{ product.basePrice - product.finalPrice }} <span v-html="currencySymbol"></span>
          </span>
          <span class="old-price">{{ product.basePrice }} <span v-html="currencySymbol"></span></span>
          <span class="final-price">{{ product.finalPrice }} <span v-html="currencySymbol"></span></span>
        </template>

        <template v-else-if="offerStyle === 'strikeWithBadge' && product.offerLabel">
          <span class="offer-label" :style="{ color: colors.offerLabel }">
            🔖 خصم {{ Math.round((1 - product.finalPrice / product.basePrice) * 100) }}%
          </span>
          <span class="old-price">{{ product.basePrice }} <span v-html="currencySymbol"></span></span>
          <span class="final-price">{{ product.finalPrice }} <span v-html="currencySymbol"></span></span>
        </template>

        <template v-else>
          <span class="final-price">{{ product.finalPrice }} <span v-html="currencySymbol"></span></span>
        </template>
      </div>

      <!-- ✅ مسببات الحساسية -->
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
  sections?: any[]
  currencySymbol: string
  currencyKey: string
  imageShape: 'circle' | 'roundedSquare' | 'rectangle' | 'hidden'
  offerStyle: 'strikeOnly' | 'strikeWithSaving' | 'strikeWithBadge'
  allergenIconStyle?: 'colored' | 'outlined' | 'monochrome' | 'hidden' | 'boxedA' | 'boldA' | 'warningTriangle'
  colors: Record<string, string>
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
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
}

.product-card {
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

.product-name {
  margin-bottom: 0.3rem;
  font-weight: bold;
}

.product-price {
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
  margin-top: 0.2rem;
  display: block;
}

.allergens-display {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  justify-content: center;
}

.allergen-icon.boxedA {
  background-color: #ffe5e5;
  color: #d00;
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
  font-size: 0.85rem;
}

.allergen-icon.outlined {
  border: 1px solid #d00;
  padding: 0.2rem;
  border-radius: 4px;
  color: #d00;
  font-size: 0.85rem;
}

.allergen-icon.warningTriangle {
  color: #FF7A00;
  font-size: 1rem;
}

.allergen-icon.monochrome {
  color: #666;
  font-size: 0.85rem;
}

.allergen-icon.boldA {
  font-weight: bold;
  color: #333;
  font-size: 0.85rem;
}

.allergen-icon.hidden {
  display: none;
}

.product-description {
  font-size: 0.8rem;
  margin-top: 0.4rem;
  line-height: 1.4;
}

.product-calories {
  font-size: 0.75rem;
  margin-top: 0.3rem;
}
</style>
