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
        <div class="product-image-wrapper" v-if="imageShape !== 'none'">
          <img
            v-if="product.imageBase64"
            :src="product.imageBase64"
            :class="['product-image', imageShape]"
            alt="صورة المنتج"
          />
          <div v-else class="product-image placeholder" :class="imageShape"></div>
        </div>

        <span class="product-name">{{ product.name }}</span>

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
import { ref, computed, watchEffect } from 'vue'

interface Product {
  id: string
  name: string
  basePrice: number
  finalPrice: number
  sectionId: string
  status: string
  imageBase64?: string
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
    imageShape: 'circle' | 'roundedSquare' | 'rectangle' | 'none'
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
  font-family: var(--font-family, 'Cairo');
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
  font-family: var(--font-family, 'Cairo');
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
</style>
