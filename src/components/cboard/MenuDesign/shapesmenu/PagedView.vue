// صفحات قابلة للسحب
<template>
  <div class="paged-view">
    <div class="page-content">
      <h5 class="category-title" :style="{ color: props.colors.titleText }">
        {{ currentCategory.name }}
      </h5>

      <div class="cards-layout">
        <div
          v-for="product in currentCategory.products"
          :key="product.id"
          class="card"
          :style="{ backgroundColor: props.colors.cardBackground, color: props.colors.titleText }"
        >
          <!-- ✅ صورة المنتج -->
          <div class="card-image" v-if="props.imageShape !== 'hidden'">
            <img
              v-if="product.imageBase64"
              :src="product.imageBase64"
              :class="['product-image', props.imageShape]"
              alt="صورة المنتج"
            />
            <div v-else class="product-image placeholder" :class="props.imageShape"></div>
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

            <!-- ✅ مسببات الحساسية -->
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
        </div>
      </div>
    </div>

    <div class="page-controls">
      <button @click="prevPage" :disabled="index === 0">← السابق</button>
      <button @click="nextPage" :disabled="index === props.categories.length - 1">التالي →</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Product {
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
}

interface Category {
  id: string
  name: string
  products: Product[]
}

const props = defineProps<{
  categories: Category[]
  currencySymbol: string
  currencyKey: string
  imageShape: 'circle' | 'roundedSquare' | 'rectangle' | 'hidden'
  offerStyle: 'strikeOnly' | 'strikeWithSaving' | 'strikeWithBadge'
  allergenIconStyle?: 'colored' | 'outlined' | 'monochrome' | 'hidden' | 'boxedA' | 'boldA' | 'warningTriangle'
  colors: Record<string, string>
}>()

const index = ref(0)
const currentCategory = computed(() => props.categories[index.value])

function nextPage() {
  if (index.value < props.categories.length - 1) index.value++
}

function prevPage() {
  if (index.value > 0) index.value--
}

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
.paged-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.category-title {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
font-family: var(--font-family);
  color: var(--titleText-color, #000);
}

.cards-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  width: calc(33.333% - 1rem);
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 1rem;
font-family: var(--font-family);
  background-color: var(--cardBackground-bg, #fff);
  color: var(--titleText-color, #000);
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
}

.card-body {
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 4px;
}

.product-price {
  font-weight: bold;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
}

.old-price {
  text-decoration: line-through;
  color: red;
  margin-right: 0.3rem;
}

.final-price {
  font-weight: bold;
}

.page-controls {
  display: flex;
  justify-content: space-between;
}

.page-controls button {
  padding: 0.5rem 1rem;
  background-color: var(--accent-bg, #FF7A00);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
font-family: var(--font-family);
  font-weight: bold;
}

.page-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* ✅ تنسيقات مسببات الحساسية المضافة */
.allergens-display {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  justify-content: flex-start;
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
