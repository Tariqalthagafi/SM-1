<template>
  <div class="vertical-layout" :style="{ backgroundColor: props.colors.bodyBackground }">
    <div
      v-for="section in props.sections"
      :key="section.id"
      class="section-block"
    >
      <h5 class="section-title" :style="{ color: props.colors.sectionTitleText }">
        {{ section.name }}
      </h5>

      <div class="product-list">
        <div
          v-for="product in props.products.filter(p => p.sectionId === section.id && p.status === 'visible')"
          :key="product.id"
          class="product-item"
          :style="{ backgroundColor: props.colors.productBackground, color: props.colors.titleText }"
        >
          <!-- ✅ صورة المنتج -->
          <div class="product-image-wrapper" v-if="props.imageShape !== 'hidden'">
            <img
              v-if="product.imageBase64"
              :src="product.imageBase64"
              :class="['product-image', props.imageShape]"
              alt="صورة المنتج"
            />
            <div v-else class="product-image placeholder" :class="props.imageShape"></div>
          </div>

          <!-- ✅ تجميع اسم المنتج وعلامة الحساسية -->
          <div class="product-info-group">
            <span class="product-name">{{ product.name }}</span>
            <p v-if="product.calories !== undefined" class="product-calories">
              🍽 {{ product.calories }} سعرة حرارية
            </p>

            <p v-if="product.description" class="product-description">
              {{ product.description }}
            </p>

            <div v-if="product.hasAllergens && product.allergens?.length" class="allergens-display">
              <span
                v-for="allergen in product.allergens"
                :key="allergen"
                class="allergen-icon"
                :class="props.allergenIconStyle"
              >
                {{ getAllergenSymbol(props.allergenIconStyle ?? 'boxedA') }}
              </span>
            </div>
          </div>

          <!-- ✅ السعر -->
          <div
            class="product-price"
            :class="props.offerStyle"
            :style="{ backgroundColor: props.colors.priceBackground, color: props.colors.priceText }"
          >
            <template v-if="props.offerStyle === 'strikeOnly' && product.offerLabel">
              <span class="old-price">{{ product.basePrice }} <span v-html="props.currencySymbol"></span></span>
              <span class="final-price">{{ product.finalPrice }} <span v-html="props.currencySymbol"></span></span>
            </template>

            <template v-else-if="props.offerStyle === 'strikeWithSaving' && product.offerLabel">
              <span class="offer-label" :style="{ color: props.colors.offerLabel }">
                🔥 وفر {{ product.basePrice - product.finalPrice }} <span v-html="props.currencySymbol"></span>
              </span>
              <span class="old-price">{{ product.basePrice }} <span v-html="props.currencySymbol"></span></span>
              <span class="final-price">{{ product.finalPrice }} <span v-html="props.currencySymbol"></span></span>
            </template>

            <template v-else-if="props.offerStyle === 'strikeWithBadge' && product.offerLabel">
              <span class="offer-label" :style="{ color: props.colors.offerLabel }">
                🔖 خصم {{ Math.round((1 - product.finalPrice / product.basePrice) * 100) }}%
              </span>
              <span class="old-price">{{ product.basePrice }} <span v-html="props.currencySymbol"></span></span>
              <span class="final-price">{{ product.finalPrice }} <span v-html="props.currencySymbol"></span></span>
            </template>

            <template v-else>
              <span class="final-price">{{ product.finalPrice }} <span v-html="props.currencySymbol"></span></span>
            </template>
          </div>
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
    sectionId: string
    status: string
    imageBase64?: string
    offerLabel?: string
    allergens?: string[]
    hasAllergens?: boolean
    description?: string
    calories?: number
  }[]
  sections: {
    id: string
    name: string
  }[]
  colors: Record<string, string>
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
.vertical-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: var(--bodyBackground-bg, #f0f0f0);
  padding: 1rem;
  border-radius: 8px;
}

.section-block {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.section-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--sectionTitleText-color, #222);
font-family: var(--font-family);
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-item {
  background-color: var(--productBackground-bg, #ffffff);
  color: var(--titleText-color, #000);
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
font-family: var(--font-family);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

/* ✅ صورة المنتج */
.product-image-wrapper {
  flex-shrink: 0;
}

.product-image {
  width: 60px;
  height: 60px;
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
  width: 80px;
  height: 60px;
  border-radius: 6px;
}

.product-image.none {
  display: none;
}

.product-image.placeholder {
  background-color: #ddd;
}

/* ✅ تجميع اسم المنتج وعلامة الحساسية */
.product-info-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

/* ✅ اسم المنتج */
.product-name {
  font-weight: bold;
}

/* ✅ السعر */
.product-price {
  font-size: 0.8rem;
  color: var(--priceText-color, #333);
  background-color: var(--priceBackground-bg, transparent);
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
}

.old-price {
  text-decoration: line-through;
  color: var(--expiredProductIcon-color, red);
  margin-right: 0.3rem;
}

.final-price {
  font-weight: bold;
  color: var(--currencyIcon-color, inherit);
}

/* ✅ تنسيقات مسببات الحساسية المضافة */
.allergens-display {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
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
  color: var(--descriptionText-color, #666);
  margin-top: 0.4rem;
  line-height: 1.4;
}
.product-calories {
  font-size: 0.75rem;
  color: var(--caloriesText-color, #888);
  margin-top: 0.3rem;
}

/* نهاية تنسيقات مسببات الحساسية */
</style>
