// عرض بالقسم 

<template>
  <div class="sectioned-layout">
    <!-- ✅ شريط الأقسام -->
    <div class="section-buttons">
      <button
        v-for="section in sections"
        :key="section.id"
        :class="{ active: section.id === activeSectionId }"
        @click="activeSectionId = section.id"
      >
        {{ section.name }}
      </button>
    </div>

    <!-- ✅ المنتجات الخاصة بالقسم المختار -->
    <div class="products">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-item"
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

        <span class="product-name">{{ product.name }}</span>
        <p v-if="product.calories !== undefined" class="product-calories">
  🍽 {{ product.calories }} سعرة حرارية
</p>

        <p v-if="product.description" class="product-description">
  {{ product.description }}
</p>


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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'

interface Product {
  id: string
  name: string
  basePrice: number
  finalPrice: number
  sectionId: string
  status: string
  imageBase64?: string
  offerLabel?: string
  // ✅ إضافة خصائص مسببات الحساسية للمنتج
  allergens?: string[]
  hasAllergens?: boolean
  description?: string
  calories?: number
}

interface Section {
  id: string
  name: string
}

interface ColorSettings {
  [key: string]: string
}

const props = withDefaults(
  defineProps<{
    products: Product[]
    sections: Section[]
    colors: ColorSettings
    currencySymbol: string
    currencyKey: string
    imageShape: 'circle' | 'roundedSquare' | 'rectangle' | 'hidden'
    offerStyle: 'strikeOnly' | 'strikeWithSaving' | 'strikeWithBadge'
    // ✅ إضافة خصائص نمط الأيقونة
    allergenIconStyle?: 'colored' | 'outlined' | 'monochrome' | 'hidden' | 'boxedA' | 'boldA' | 'warningTriangle'
  }>(),
  {
    products: () => [],
    sections: () => [],
    colors: () => ({})
  }
)

const activeSectionId = ref('')

const filteredProducts = computed(() =>
  props.products.filter((p) => p.sectionId === activeSectionId.value && p.status === 'visible')
)

watchEffect(() => {
  if (!activeSectionId.value && props.sections.length) {
    activeSectionId.value = props.sections[0].id
  }
})

// ✅ إضافة دالة المساعد (Helper Function)
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
.sectioned-layout {
  margin-top: 1rem;
  background-color: var(--bodyBackground-bg, #f0f0f0);
  padding: 1rem;
  border-radius: 8px;
}

/* ✅ أزرار الأقسام */
.section-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  overflow-x: auto;
}

.section-buttons button {
  padding: 0.4rem 0.8rem;
  border: none;
  background-color: var(--sectionBackground-bg, #eee);
  color: var(--sectionTitleText-color, #000);
  cursor: pointer;
  border-radius: 6px;
  font-weight: bold;
font-family: var(--font-family);
  transition: background-color 0.2s ease;
}

.section-buttons button.active {
  background-color: var(--offerLabel-bg, #007bff);
  color: white;
}

/* ✅ شبكة المنتجات */
.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.75rem;
}

/* ✅ بطاقة المنتج */
.product-item {
  background-color: var(--productBackground-bg, #ffffff);
  color: var(--titleText-color, #000);
  padding: 0.6rem;
  border-radius: 6px;
  text-align: center;
  font-size: 0.85rem;
font-family: var(--font-family);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
}

.product-item:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* ✅ صورة المنتج */
.product-image-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 0.4rem;
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

/* ✅ اسم المنتج */
.product-name {
  display: block;
  margin-bottom: 0.2rem;
  font-weight: bold;
}

/* ✅ السعر */
.product-price {
  font-size: 0.8rem;
  color: var(--priceText-color, #333);
  background-color: var(--priceBackground-bg, transparent);
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
}

/* ✅ السعر القديم */
.old-price {
  text-decoration: line-through;
  color: var(--expiredProductIcon-color, red);
  margin-right: 0.3rem;
}

/* ✅ السعر النهائي */
.final-price {
  font-weight: bold;
  color: var(--currencyIcon-color, inherit);
}

/* ✅ تنسيقات مسببات الحساسية المضافة */
.allergens-display {
  margin-top: 0.3rem;
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
