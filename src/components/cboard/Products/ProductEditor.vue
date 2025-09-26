<template>
  <div class="product-editor-row">
    <!-- أدوات التحكم -->
    <div class="action-group">
      <button class="drag-handle" title="اسحب لتحريك">⠿</button>
      <button class="delete-btn" @click="deleteProduct" title="حذف المنتج">🗑️</button>
    </div>

    <!-- اسم المنتج -->
    <div class="field">
      <label>اسم المنتج</label>
      <input
        v-model="localProduct.name"
        @blur="saveField('name')"
        @keyup.enter="saveField('name')"
        required
      />
    </div>

    <!-- الوصف -->
    <div class="field">
      <label>الوصف</label>
      <input
        v-model="localProduct.description"
        @blur="saveField('description')"
        @keyup.enter="saveField('description')"
      />
    </div>

    <!-- السعرات -->
    <div class="field">
      <label>السعرات الحرارية</label>
      <input
        v-model.number="localProduct.calories"
        type="number"
        min="0"
        @blur="saveField('calories')"
        @keyup.enter="saveField('calories')"
      />
    </div>

    <!-- مسببات الحساسية -->
    <div class="field">
      <label>مسببات الحساسية</label>
      <AllergensPicker
        v-model="localProduct.allergens"
        @change="saveField('allergens')"
      />
    </div>

    <!-- رفع صورة -->
    <div class="field image-upload">
      <label>الصورة</label>
      <div class="upload-row">
        <button class="upload-btn" @click="triggerUpload" title="رفع صورة جديدة">➕</button>
        <ProductImagePreview
          v-if="localProduct.imageBase64"
          :imageUrl="localProduct.imageBase64"
          :altText="localProduct.name"
        />
      </div>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="handleUpload"
        style="display: none"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product } from '@/types/contexts/Products'
import ProductImagePreview from './ProductImagePreview.vue'
import AllergensPicker from './AllergensPicker.vue'
import { useProductsStore } from '@/stores/cboard/products'

const props = defineProps<{ edit: Product }>()
const productsStore = useProductsStore()
const emit = defineEmits(['delete'])

const localProduct = ref<Product>({
  ...props.edit,
  allergens: Array.isArray(props.edit.allergens) ? [...props.edit.allergens] : [],
  imageBase64: props.edit.imageBase64 || ''
})

const fileInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  localProduct.value = {
    ...props.edit,
    allergens: Array.isArray(props.edit.allergens) ? [...props.edit.allergens] : [],
    imageBase64: props.edit.imageBase64 || ''
  }
})

function saveField(field: keyof Product) {
  productsStore.updateProduct(localProduct.value.id, {
    ...localProduct.value,
    allergens: [...(localProduct.value.allergens ?? [])] // ✅ منع خطأ TypeScript
  })
}

function deleteProduct() {
  productsStore.deleteProduct(localProduct.value.id)
  emit('delete')
}

function triggerUpload() {
  fileInput.value?.click()
}

async function handleUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onloadend = () => {
    localProduct.value.imageBase64 = reader.result as string
    saveField('imageBase64')
  }
  reader.readAsDataURL(file)
}
</script>

<style scoped>
.product-editor-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.5rem 0;
  font-family: 'Tajawal', sans-serif;
}

.action-group {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.drag-handle {
  cursor: grab;
  background-color: #F0F0F0;
  border: none;
  padding: 0.3rem;
  border-radius: 6px;
  font-size: 1.1rem;
}
.drag-handle:hover {
  background-color: #E0E0E0;
}
.drag-handle:active {
  cursor: grabbing;
}

.delete-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #f44336;
}
.delete-btn:hover {
  color: #d32f2f;
}

.field {
  display: flex;
  flex-direction: column;
  width: 180px;
}

.field label {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
  color: #1C1C1C;
}

.field input {
  padding: 0.4rem 0.6rem;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  background-color: #FFFFFF;
  font-size: 0.85rem;
  color: #1C1C1C;
}

.image-upload .upload-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.upload-btn {
  background-color: #FF7A00;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.2rem;
  cursor: pointer;
}
.upload-btn:hover {
  background-color: #e96c00;
}
</style>
