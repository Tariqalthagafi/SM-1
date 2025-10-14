<template>
  <div class="vertical-layout">
    <div
      v-for="section in sections"
      :key="section.id"
      class="section-block"
    >
      <h5 class="section-title">{{ section.name }}</h5>

      <div class="product-list">
        <div
          v-for="product in products.filter(p => p.sectionId === section.id && p.status === 'visible')"
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
  </div>
</template>

<script setup lang="ts">
defineProps<{
  products: {
    id: string
    name: string
    basePrice: number
    finalPrice: number
    sectionId: string
    status: string
    imageBase64?: string
  }[]
  sections: {
    id: string
    name: string
  }[]
  colors: Record<string, string>
  currencySymbol: string
  currencyKey: string
  imageShape: 'circle' | 'roundedSquare' | 'rectangle' | 'none'
}>()
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
  font-family: var(--font-family, 'Cairo');
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
  font-family: var(--font-family, 'Cairo');
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

/* ✅ اسم المنتج */
.product-name {
  font-weight: bold;
  flex: 1;
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
</style>
