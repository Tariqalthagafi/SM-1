<template>
  <div class="product-editor-row">
    <!-- اسم المنتج -->
    <div class="field">
      <label>{{ t('cboard.products.editor.fields.name') }}</label>
      <input
        v-model="localProduct.name"
        @blur="saveField('name')"
        @keyup.enter="saveField('name')"
        required
      />
    </div>

    <!-- الوصف -->
    <div class="field">
      <label>{{ t('cboard.products.editor.fields.description') }}</label>
      <input
        v-model="localProduct.description"
        @blur="saveField('description')"
        @keyup.enter="saveField('description')"
      />
    </div>

    <!-- السعرات -->
    <div class="field">
      <label>{{ t('cboard.products.editor.fields.calories') }}</label>
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
      <label>{{ t('cboard.products.editor.fields.allergens') }}</label>
      <AllergensPicker
        v-model="localProduct.allergens"
        @update:modelValue="saveField('allergens')"
      />
    </div>

    <!-- رفع صورة المنتج -->
    <div class="field image-upload">
      <label>{{ t('cboard.products.editor.fields.image') }}</label>

      <div v-if="!localProduct.image_url" class="dropzone" @dragover.prevent @drop.prevent="handleDrop" @click="triggerUpload">
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

      <div v-else class="logo-preview-container">
        <img :src="localProduct.image_url" :alt="localProduct.name" class="logo-preview" />
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

    <!-- أدوات التحكم -->
    <div class="action-group">
      <button class="delete-btn" @click="showConfirm = true" :title="t('cboard.products.editor.deleteTitle')">🗑️</button>
    </div>

    <!-- تأكيد الحذف -->
    <div v-if="showConfirm" class="modal-overlay">
      <div class="modal-box">
        <h2>تأكيد الحذف</h2>
        <p>هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع بعد الحذف.</p>
        <div class="modal-actions">
          <button class="confirm-btn" @click="handleDelete">نعم، احذف</button>
          <button class="cancel-btn" @click="showConfirm = false">إلغاء</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product } from '@/types/contexts/products1.ts'
import AllergensPicker from './AllergensPicker.vue'
import { useProducts } from './useProducts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { updateProduct, deleteProduct , uploadProductImage } = useProducts()

const props = defineProps<{ edit: Product }>()
const emit = defineEmits(['delete'])

const localProduct = ref<Product>({
  ...props.edit,
  allergens: Array.isArray(props.edit.allergens) ? [...props.edit.allergens] : [],
  image_base64: props.edit.image_base64 || ''
})

const fileInput = ref<HTMLInputElement | null>(null)
const showConfirm = ref(false)

onMounted(() => {
  localProduct.value = {
    ...props.edit,
    allergens: Array.isArray(props.edit.allergens) ? [...props.edit.allergens] : [],
    image_base64: props.edit.image_base64 || ''
  }
})

async function saveField(field: keyof Product) {
  const updated: Partial<Product> = {
    [field]: localProduct.value[field]
  }

  if (field === 'allergens') {
    updated.allergens = [...(localProduct.value.allergens ?? [])]
    updated.has_allergens = updated.allergens.length > 0
  }

  await updateProduct(localProduct.value.id, updated)
}

async function handleDelete() {
  await deleteProduct(localProduct.value.id)
  emit('delete')
  showConfirm.value = false
}

function triggerUpload() {
  fileInput.value?.click()
}

async function handleUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onloadend = async () => {
    const base64 = reader.result as string
    localProduct.value.image_base64 = base64
    await saveField('image_base64')

   async function handleUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onloadend = async () => {
    const base64 = reader.result as string
    localProduct.value.image_base64 = base64
    await saveField('image_base64')

    const imageUrl = await uploadProductImage(file, localProduct.value.id)
    if (imageUrl) {
      localProduct.value.image_url = imageUrl
      await saveField('image_url')
    }
  }
  reader.readAsDataURL(file)
}

  }
  reader.readAsDataURL(file)
}

function handleDrop(event: DragEvent) {
  const file = event.dataTransfer?.files?.[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64 = reader.result as string
      localProduct.value.image_base64 = base64
      await saveField('image_base64')
    }
    reader.readAsDataURL(file)
  }
}

async function removeImage() {
  localProduct.value.image_url = ''
  localProduct.value.image_base64 = ''
  await saveField('image_url')
  await saveField('image_base64')
}
</script>



<style scoped>
.product-editor-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  padding: 0.5rem 0;
  font-family: 'Tajawal', sans-serif;
}

.action-group {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 0.25rem;
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
  flex-direction: row; /* بدل column */
  align-items: center;
  gap: 0.5rem;
}

.field label {
  width: 100px; /* عرض ثابت */
  font-weight: bold;
  font-size: 0.85rem;
  color: #1C1C1C;
  margin-bottom: 0; /* إزالة المسافة */
}

.field input {
  flex: 1; /* ياخذ باقي المساحة */
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

.image-upload {
  grid-column: 1 / -1;
}

/* ✅ تنسيق Dropzone لرفع الصورة */
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
.logo-preview {
  max-height: 60px;
  border-radius: 8px;
  box-shadow: none;
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

/* ✅ تأكيد الحذف */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-box {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  width: 320px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.modal-box h2 {
  color: #FF7A00;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.modal-box p {
  color: #1C1C1C;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.confirm-btn {
  background-color: #FF7A00;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #fff;
  color: #1C1C1C;
  border: 1px solid #E0E0E0;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
</style>
