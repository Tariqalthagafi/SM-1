<template>
  <div class="cards-layout">
    <div
      v-for="product in products"
      :key="product.id"
      class="card"
    >
      <div class="card-header">
        <span class="product-name">{{ product.name }}</span>
      </div>

      <div class="card-body">
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
</template>

<script setup lang="ts">
defineProps<{
  products: any[]
  colors: Record<string, string>
}>()

const currencySymbol = 'ر.س'
</script>

<style scoped>
.cards-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  background-color: var(--bodyBackground-bg, #f0f0f0);
  padding: 1rem;
  border-radius: 8px;
}

/* ✅ البطاقة */
.card {
  width: calc(33.333% - 1rem);
  background-color: var(--cardBackground-bg, #ffffff);
  color: var(--titleText-color, #000);
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  font-family: var(--font-family, 'Cairo');
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* ✅ رأس البطاقة */
.card-header {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--titleText-color, #000);
}

/* ✅ جسم البطاقة */
.card-body {
  font-size: 0.9rem;
  background-color: var(--productBackground-bg, transparent);
  padding: 0.5rem;
  border-radius: 4px;
}

/* ✅ السعر */
.product-price {
  font-weight: bold;
  color: var(--priceText-color, #333);
  background-color: var(--priceBackground-bg, transparent);
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
}

/* ✅ السعر القديم */
.old-price {
  text-decoration: line-through;
  color: red;
  margin-right: 0.3rem;
}

/* ✅ السعر النهائي */
.final-price {
  font-weight: bold;
  color: var(--currencyIcon-color, inherit);
}

/* ✅ رمز العرض */
.offer-label {
  background-color: var(--offerLabel-bg, #007bff);
  color: #fff;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  display: inline-block;
}

/* ✅ رمز الحساسية */
.allergen-icon {
  color: var(--allergenIcon-color, #ff0000);
  font-size: 1.2rem;
  margin-left: 0.3rem;
}

/* ✅ رمز المنتج المنتهي */
.expired-icon {
  color: var(--expiredProductIcon-color, #9e9e9e);
  font-size: 1.2rem;
  margin-left: 0.3rem;
}

</style>
