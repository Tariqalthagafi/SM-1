<template>
  <section class="product-list">
    <!-- زر إضافة منتج جديد -->
    <button class="add-button" @click="startNewProduct">➕ إضافة منتج جديد</button>

    <!-- نموذج إضافة منتج -->
    <ProductEditor
      v-if="showNewForm"
      :edit="tempProduct"
    />

    <!-- قائمة المنتجات مع السحب والإفلات -->
    <draggable
      v-model="productsStore.products"
      item-key="id"
      handle=".drag-handle"
      @end="saveOrder"
    >
      <template #item="{ element }">
        <div class="product-container">
          <ProductEditor :edit="element" />
        </div>
      </template>
    </draggable>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProductsStore } from '@/stores/cboard/products'
import type { Product } from '@/types/contexts/Products'
import draggable from 'vuedraggable'

import ProductEditor from './ProductEditor.vue'

const productsStore = useProductsStore()
const tempProduct = ref<Product>(productsStore.createEmptyProduct())
const showNewForm = ref(false)

onMounted(() => {
  productsStore.load()
})

function startNewProduct() {
  const newProduct = {
    ...productsStore.createEmptyProduct(),
    id: crypto.randomUUID(),
    order: 0
  }
  productsStore.products.unshift(newProduct)
  productsStore.directSave(newProduct)
  showNewForm.value = false
}
  
async function saveOrder() {
  await Promise.all(
    productsStore.products.map((p, i) => {
      p.order = i
      return productsStore.directSave(p)
    })
  )
  productsStore.products.sort((a, b) => a.order - b.order)
}
</script>

<style scoped>
.product-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: 'Tajawal', sans-serif;
}

.add-button {
  align-self: flex-start;
  padding: 0.4rem 0.8rem;
  font-size: 0.95rem;
  background-color: #FF7A00;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-button:hover {
  background-color: #e96c00;
}

.product-container {
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #E0E0E0; /* ✅ خط رمادي بسيط */
}

</style>
