<template>
  <div class="grid-view">
    <!-- عرض الأقسام -->
    <div v-if="!selectedCategory" class="grid-categories">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="category-box"
        @click="selectedCategory = cat"
      >
        {{ cat.name }}
      </button>
    </div>

    <!-- عرض المنتجات داخل القسم -->
    <div v-else class="grid-products">
      <button class="back-btn" @click="selectedCategory = null">← عودة</button>
      <h5 class="category-title">{{ selectedCategory.name }}</h5>

      <div class="cards-layout">
        <div
          v-for="product in selectedCategory.products"
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
              <span
                v-if="product.finalPrice !== product.basePrice"
                class="old-price"
              >
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { categories, currencySymbol, currencyKey, imageShape } = defineProps<{
  categories: {
    id: string
    name: string
    products: {
      id: string
      name: string
      basePrice: number
      finalPrice: number
      imageBase64?: string
    }[]
  }[]
  currencySymbol: string
  currencyKey: string
  imageShape: 'circle' | 'roundedSquare' | 'rectangle' | 'none'
}>()

const selectedCategory = ref<typeof categories[0] | null>(null)
</script>

<style scoped>
.grid-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.grid-categories {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

.category-box {
  padding: 1rem;
  background-color: var(--cardBackground-bg, #f5f5f5);
  color: var(--titleText-color, #000);
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Tajawal', sans-serif;
  font-weight: bold;
  transition: background 0.2s ease;
}

.category-box:hover {
  background-color: var(--accent-bg, #FF7A00);
  color: white;
}

.back-btn {
  background: none;
  border: none;
  color: var(--accent-bg, #FF7A00);
  font-weight: bold;
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.category-title {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: 'Tajawal', sans-serif;
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
  font-family: 'Cairo', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--cardBackground-bg, #fff);
  color: var(--titleText-color, #000);
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
</style>
