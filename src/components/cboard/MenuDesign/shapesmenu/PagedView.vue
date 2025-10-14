<template>
  <div class="paged-view">
    <div class="page-content">
      <h5 class="category-title">{{ currentCategory.name }}</h5>

      <div class="cards-layout">
        <div
          v-for="product in currentCategory.products"
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

    <div class="page-controls">
      <button @click="prevPage" :disabled="index === 0">← السابق</button>
      <button @click="nextPage" :disabled="index === categories.length - 1">التالي →</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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

const index = ref(0)
const currentCategory = computed(() => categories[index.value])

function nextPage() {
  if (index.value < categories.length - 1) index.value++
}

function prevPage() {
  if (index.value > 0) index.value--
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
  font-family: 'Tajawal', sans-serif;
  font-weight: bold;
}

.page-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
