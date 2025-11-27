<template>
  <section class="product-list">
    <!-- بطاقة إضافة منتج دائمًا ظاهرة -->
    <ProductAddCard
      :expanded="showNewForm"
      :productCount="products.length"
      @toggle="expandOnly"
      @collapse="showNewForm = false"
      @added="showNewForm = false"
    />

    <!-- قائمة المنتجات مع السحب والإفلات -->
    <draggable
      v-model="products"
      item-key="id"
      handle=".drag-handle"
      @end="saveOrder"
      class="product-grid"
    >
      <template #item="{ element }">
        <div class="product-container card-box">
          <ProductEditor :edit="element" />
        </div>
      </template>
    </draggable>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import ProductEditor from './ProductEditor.vue'
import ProductAddCard from './ProductAddCard.vue'
import { useProducts } from './useProducts'
import type { Product } from '@/types/contexts/products1.ts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { products, updateProduct } = useProducts()

const showNewForm = ref(false) // ✅ البطاقة تبدأ متمددة

async function saveOrder() {
  await Promise.all(
    products.value.map((p: Product, i: number) => {
      p.sequ = i
      return updateProduct(p.id, { sequ: i })
    })
  )
  products.value.sort((a, b) => a.sequ - b.sequ)
}

function expandOnly() {
  if (!showNewForm.value) showNewForm.value = true
}
</script>

<style scoped>
.product-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: 'Tajawal', sans-serif;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.card-box {
  background-color: #fff;
  border: 1px solid #FF7A00;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  width: 100%;
  max-width: 400px;
}

.product-container {
  width: 100%;
}
</style>
