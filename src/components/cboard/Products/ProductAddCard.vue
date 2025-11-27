<template>
  <section class="product-add-card card-box">
    <!-- رأس البطاقة -->
    <div class="card-header clickable" @click="emit('toggle')">
      <h2 class="card-title">
        إضافة منتج جديد
        <span class="count">({{ props.productCount }} منتج)</span>
      </h2>
    </div>

    <!-- النموذج -->
    <form v-show="props.expanded" @submit.prevent="handleAdd" class="form-fields">
      <!-- الاسم -->
      <div class="field">
        <label>اسم المنتج</label>
        <input v-model="form.name" required />
      </div>

      <!-- الوصف -->
      <div class="field">
        <label>الوصف</label>
        <input v-model="form.description" />
      </div>

      <!-- السعرات -->
      <div class="field">
        <label>السعرات الحرارية</label>
        <input v-model.number="form.calories" type="number" min="0" />
      </div>

      <!-- مسببات الحساسية -->
      <div class="field">
        <label>مسببات الحساسية</label>
        <AllergensPicker v-model="form.allergens" />
      </div>

      <!-- رفع صورة -->
      <div class="field image-upload">
        <label>صورة المنتج</label>

        <!-- Dropzone عند عدم وجود صورة -->
        <div
          v-if="!form.image_url"
          class="dropzone"
          @dragover.prevent
          @drop.prevent="handleDrop"
          @click="triggerUpload"
        >
          <span class="drop-icon">📷</span>
          <span class="drop-text">رفع صورة المنتج</span>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden-input"
            @change="handleUpload"
          />
        </div>

        <!-- معاينة مصغرة وأزرار -->
        <div v-else class="logo-preview-container">
          <img :src="form.image_url" :alt="form.name" class="logo-preview" />
          <div class="logo-actions">
            <button type="button" @click="triggerUpload">تغيير الصورة</button>
            <button type="button" class="remove-btn" @click="removeImage">إزالة الصورة</button>
          </div>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden-input"
            @change="handleUpload"
          />
        </div>
      </div>

      <!-- أزرار الإجراء -->
      <div class="form-actions">
        <button type="submit" class="add-btn">اضافة</button>
        <button type="button" class="cancel-btn" @click="emit('collapse')">إخفاء النموذج</button>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Product } from '@/types/contexts/products1.ts'
import AllergensPicker from './AllergensPicker.vue'
import { useProducts } from './useProducts'

const props = defineProps<{
  expanded: boolean
  productCount: number
}>()

const emit = defineEmits(['toggle', 'added', 'collapse'])

const { addProduct, uploadProductImage } = useProducts()
const fileInput = ref<HTMLInputElement | null>(null)

const form = reactive<Partial<Product>>({
  name: '',
  description: '',
  calories: 0,
  allergens: [],
  image_base64: '',
  image_url: '',
  base_price: 0,
  final_price: 0
})

function triggerUpload() {
  fileInput.value?.click()
}

async function handleUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onloadend = async () => {
    const base64 = reader.result as string
    form.image_base64 = base64

    const imageUrl = await uploadProductImage(file, crypto.randomUUID())
    if (imageUrl) form.image_url = imageUrl
  }
  reader.readAsDataURL(file)
}

function handleDrop(event: DragEvent) {
  const file = event.dataTransfer?.files?.[0]
  if (!file || !file.type.startsWith('image/')) return

  const reader = new FileReader()
  reader.onloadend = async () => {
    const base64 = reader.result as string
    form.image_base64 = base64

    const imageUrl = await uploadProductImage(file, crypto.randomUUID())
    if (imageUrl) form.image_url = imageUrl
  }
  reader.readAsDataURL(file)
}

function removeImage() {
  form.image_url = ''
  form.image_base64 = ''
}

async function handleAdd() {
  if (!form.name?.trim()) return

  await addProduct({
    name: form.name!.trim(),
    description: form.description || '',
    calories: form.calories || 0,
    allergens: form.allergens || [],
    has_allergens: (form.allergens?.length || 0) > 0,
    image_url: form.image_url || '',
    image_base64: form.image_base64 || '',
    base_price: form.base_price ?? 0,
    final_price: form.final_price ?? form.base_price ?? 0
  })

  emit('added')

  // إعادة تعيين النموذج
  form.name = ''
  form.description = ''
  form.calories = 0
  form.allergens = []
  form.image_url = ''
  form.image_base64 = ''
  form.base_price = 0
  form.final_price = 0
}
</script>

<style scoped>
.product-add-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  width: 100%;
  font-family: 'Tajawal', sans-serif;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header.clickable {
  cursor: pointer;
  user-select: none;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1C1C1C;
  margin: 0;
}

.card-title .count {
  font-size: 0.95rem;
  font-weight: normal;
  color: #666;
  margin-inline-start: 0.5rem;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
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

.field input:focus {
  outline: none;
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.3);
}

/* ✅ Dropzone */
.image-upload {
  grid-column: 1 / -1;
}

.dropzone {
  width: 100px;
  height: 50px;
  border: 2px dashed #FF7A00;
  border-radius: 12px;
  padding: 0.3rem;
  background-color: #FFF8F0;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
}

.dropzone:hover {
  background-color: #fff0e0;
}

.drop-icon {
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
  color: #FF7A00;
  line-height: 1;
}

.drop-text {
  font-size: 0.65rem;
  color: #1C1C1C;
  text-align: center;
  line-height: 1.1;
  max-width: 80px;
}

/* ✅ معاينة الصورة وأزرار التحكم */
.logo-preview-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.logo-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.logo-actions button {
  background-color: #FFFFFF;
  border: 1px solid #FF7A00;
  color: #1C1C1C;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logo-actions button:hover {
  background-color: #FFF3E0;
  border-color: #FF7A00;
  color: #FF7A00;
}

.logo-actions .remove-btn {
  background-color: #F8D7DA;
  border-color: #F5C2C7;
  color: #842029;
}

.hidden-input {
  display: none;
}

/* ✅ أزرار الإجراء */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.add-btn {
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  background-color: #FF7A00;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-btn:hover {
  background-color: #e96c00;
}

.cancel-btn {
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  background-color: #fff;
  color: #1C1C1C;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.cancel-btn:hover {
  background-color: #f5f5f5;
}

.logo-preview {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #E0E0E0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

</style>
