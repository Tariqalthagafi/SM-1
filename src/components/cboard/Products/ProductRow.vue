<template>
  <div class="product-row">
    <div class="field">
      <label>اسم المنتج:</label>
      <input :value="product.name || 'بدون اسم'" readonly />
    </div>

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
        <button v-if="product.imageBlob" @click="previewImage(product.imageBlob)">
          📷 معاينة
        </button>
        <span v-else>لا يوجد صورة</span>
      </div>
    </div>

    <div class="action-buttons">
      <!-- زر السحب -->
      <button class="drag-handle" title="اسحب لتحريك">⠿</button>

      <!-- أزرار التعديل والحذف -->
      <button @click="emit('edit', product)">✏️</button>
      <button @click="emit('delete', product.id)">🗑️</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/contexts/Products'

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
  gap: 1rem;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
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
  color: #444;
}

.field input {
  padding: 0.4rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  font-size: 0.85rem;
}

.image-preview {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.image-preview label {
  font-weight: bold;
  font-size: 0.85rem;
  color: #444;
}

.action-buttons {
  margin-left: auto;
  display: flex;
  gap: 0.5rem;
}

/* زر السحب */
.drag-handle {
  cursor: grab;
  background: #f0f0f0;
  border: none;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
}
.drag-handle:active {
  cursor: grabbing;
}
</style>
