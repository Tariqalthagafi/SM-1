<template>
  <section class="product-list">
    <!-- زر إضافة منتج جديد -->
    <button class="add-button" @click="startNewProduct">➕ إضافة منتج جديد</button>

    <!-- 🆕 نموذج إضافة منتج -->
    <ProductEditor
      v-if="!editingId && showNewForm"
      :edit="tempProduct"
      @save="saveProduct"
      @cancel="cancelEdit"
    />

    <!-- 📦 قائمة المنتجات مع السحب والإفلات -->
    <draggable
      v-model="productsStore.products"
      item-key="id"
      handle=".drag-handle"
      @end="saveOrder"
    >
      <template #item="{ element }">
        <div class="product-container">
          <!-- ✏️ نموذج تعديل منتج -->
          <ProductEditor
            v-if="editingId === element.id"
            :edit="element"
            @save="saveProduct"
            @cancel="cancelEdit"
          />

          <!-- 👁️ صف عرض منتج -->
          <ProductRow
            v-else
            :product="element"
            @edit="startEdit"
            @delete="deleteProduct"
          />
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
import ProductRow from './ProductRow.vue'

const productsStore = useProductsStore()
const editingId = ref<string | null>(null)
const tempProduct = ref<Product>(productsStore.createEmptyProduct())
const showNewForm = ref(false)

onMounted(() => {
  productsStore.load()
})

function startNewProduct() {
  tempProduct.value = productsStore.createEmptyProduct()
  editingId.value = null
  showNewForm.value = true
}

function startEdit(product: Product) {
  editingId.value = product.id
  showNewForm.value = false
}

function cancelEdit() {
  editingId.value = null
  tempProduct.value = productsStore.createEmptyProduct()
  showNewForm.value = false
}

function saveProduct(updated: Product) {
  if (editingId.value) {
    productsStore.updateProduct(editingId.value, updated)
  } else {
    const newProduct = {
      ...updated,
      id: crypto.randomUUID(),
      order: productsStore.products.length
    }
    productsStore.addProduct(newProduct)
  }
  cancelEdit()
}

function deleteProduct(id: string) {
  productsStore.deleteProduct(id)
}

// 📌 حفظ الترتيب الجديد بعد السحب
async function saveOrder() {
  await Promise.all(
    productsStore.products.map((p, i) => {
      p.order = i
      return productsStore.directSave(p) // دالة جديدة في الـ store تحفظ بدون إعادة تحميل
    })
  )
  // ترتيب المصفوفة في الواجهة
  productsStore.products.sort((a, b) => a.order - b.order)
}

</script>

<style scoped>


.add-button {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
.add-button:hover {
  background-color: #005fa3;
}
</style>
