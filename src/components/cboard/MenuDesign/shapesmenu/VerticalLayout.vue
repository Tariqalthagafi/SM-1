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
          <span class="product-name">{{ product.name }}</span>
          <span class="product-price">
            <span v-if="product.finalPrice !== product.basePrice" class="old-price">
              {{ product.basePrice }} {{ currencySymbol }}
            </span>
            <span class="final-price">
              {{ product.finalPrice }} {{ currencySymbol }}
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  products: any[]
  sections: any[]
  colors: Record<string, string>
}>()

const currencySymbol = 'ر.س'
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
  justify-content: space-between;
  align-items: center;
}

.product-name {
  font-weight: bold;
}

.product-price {
  font-size: 0.8rem;
  color: var(--priceText-color, #333);
  background-color: var(--priceBackground-bg, transparent);
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
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
