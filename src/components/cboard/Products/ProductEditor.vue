<template>
  <div class="product-editor-row">
    <div class="field">
      <label>اسم المنتج</label>
      <input v-model="localProduct.name" required />
    </div>

    <div class="field">
      <label>الوصف</label>
      <input v-model="localProduct.description" />
    </div>

    <div class="field">
      <label>السعرات الحرارية</label>
      <input v-model.number="localProduct.calories" type="number" min="0" />
    </div>

    <div class="field">
      <label>مسببات الحساسية</label>
      <AllergensPicker v-model="localProduct.allergens" />
    </div>

    <div class="field">
      <label>رفع صورة</label>
      <input type="file" accept="image/*" @change="handleUpload" />
      <div v-if="localProduct.imageBlob">
        <ProductImagePreview
          :imageUrl="previewUrl"
          :altText="localProduct.name"
        />
      </div>
    </div>

    <div class="action-buttons">
      <button @click="saveProduct">💾 حفظ</button>
      <button @click="emit('cancel')">❌ إلغاء</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Product } from '@/types/contexts/Products'
import ProductImagePreview from './ProductImagePreview.vue'
import AllergensPicker from './AllergensPicker.vue'

const props = defineProps<{ edit: Product }>()
const emit = defineEmits(['save', 'cancel'])

// 🔹 دالة لتطبيع allergens إلى string[] عادية
function normalizeAllergens(value: unknown): string[] {
  if (Array.isArray(value)) return [...value].map(String)
  if (typeof value === 'string' && value.trim() !== '') return [value]
  return []
}

// ✅ تهيئة المنتج المحلي مع ضمان allergens كمصفوفة نصوص عادية
const localProduct = ref<Product>({
  ...props.edit,
  allergens: normalizeAllergens(props.edit.allergens)
})

const previewUrl = computed(() => {
  return localProduct.value.imageBlob
    ? URL.createObjectURL(localProduct.value.imageBlob)
    : ''
})

// ✅ تحديث المنتج المحلي عند تغيير الـ props
watch(
  () => props.edit,
  (newVal) => {
    localProduct.value = {
      ...newVal,
      allergens: normalizeAllergens(newVal.allergens)
    }
  }
)

// 📌 رفع صورة
function handleUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  localProduct.value.imageBlob = file
}

// 📌 حفظ المنتج مع ضمان id و order
function saveProduct() {
  if (!localProduct.value.id) {
    localProduct.value.id = crypto.randomUUID()
  }
  if (localProduct.value.order === undefined) {
    localProduct.value.order = 0
  }
  // 🔹 تطبيع قبل الإرسال
  emit('save', {
    ...localProduct.value,
    allergens: normalizeAllergens(localProduct.value.allergens)
  })
}
</script>

<style scoped>
.product-editor-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
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

.field input,
.field select {
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

button {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

button:first-of-type {
  background-color: #007acc;
  color: white;
}

button:last-of-type {
  background-color: #f5f5f5;
  color: #333;
}
</style>
