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

      <!-- ✅ السعر حسب نمط العرض -->
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
      
      <!-- ✅ إضافة منطق عرض مسببات الحساسية -->
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
      <!-- نهاية منطق عرض مسببات الحساسية -->
      
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
    offerLabel?: string
    imageBase64?: string
    // ✅ خصائص مسببات الحساسية للمنتج
    allergens?: string[]
    hasAllergens?: boolean
  }[]
  sections?: any[]
  currencySymbol: string
  currencyKey: string
  imageShape: 'circle' | 'roundedSquare' | 'rectangle' | 'none'
  offerStyle: 'strikeOnly' | 'strikeWithSaving' | 'strikeWithBadge'
  // ✅ إضافة نمط الأيقونة فقط
  allergenIconStyle?: 'colored' | 'outlined' | 'monochrome' | 'hidden' | 'boxedA' | 'boldA' | 'warningTriangle'
}>()

// ✅ إضافة دالة المساعد (Helper Function) من CardsLayout.vue
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
  background-color: var(--bodyBackground-bg, #f0f0f0);
  padding: 1rem;
  border-radius: 8px;
}

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
  color: #FF7A00;
  margin-top: 0.2rem;
  display: block;
}

/* ✅ تنسيقات مسببات الحساسية المضافة */
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
</style>
