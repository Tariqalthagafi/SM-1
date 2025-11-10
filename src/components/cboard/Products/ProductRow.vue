<template>
  <div class="product-row">
    <div class="action-group">
      <button class="drag-handle" title="اسحب لتحريك">⠿</button>
      <button @click="emit('edit', product)" title="تعديل">✏️</button>
      <button @click="emit('delete', product.id)" title="حذف">🗑️</button>
    </div>

    <span class="product-name">{{ product.name || 'بدون اسم' }}</span>

    <div class="field">
      <label>الوصف:</label>
      <input :value="product.description || 'لا يوجد وصف'" readonly />
    </div>

    <div class="field">
      <label>السعرات الحرارية:</label>
      <input
        :value="product.calories ? product.calories + ' سعرة حرارية' : 'غير محدد'"
        readonly
      />
    </div>

    <div class="field">
      <label>مسببات الحساسية:</label>
      <input
        :value="(product.allergens && product.allergens.length)
          ? product.allergens.join(', ')
          : 'لا يوجد'"
        readonly
      />
    </div>

    <div class="image-preview">
      <label>الصورة:</label>
      <div>
        <button v-if="product.image_blob" @click="previewImage(product.image_blob)">
          📷 معاينة
        </button>
        <span v-else>لا يوجد صورة</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/contexts/products.ts'

const props = defineProps<{ product: Product }>()
const emit = defineEmits(['edit', 'delete'])

function previewImage(blob: Blob) {
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank')
}
</script>

<style scoped>
.product-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  border: none;
  border-radius: 0;
  background-color: transparent;
  font-family: 'Tajawal', sans-serif;
}

.action-group {
  display: inline-flex;
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
  transition: background-color 0.2s ease;
}
.drag-handle:hover {
  background-color: #E0E0E0;
}
.drag-handle:active {
  cursor: grabbing;
}

button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.2rem;
  color: #1C1C1C;
}
button:hover {
  color: #FF7A00;
}

.product-name {
  font-size: 1rem;
  font-weight: bold;
  color: #1C1C1C;
  margin-inline-start: 0.5rem;
  white-space: nowrap;
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

.image-preview {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.image-preview label {
  font-weight: bold;
  font-size: 0.85rem;
  color: #1C1C1C;
}
</style>
