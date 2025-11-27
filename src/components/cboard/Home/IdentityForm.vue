<template>
  <section class="identity-form">
    <div class="identity-row">
      <!-- اسم المنشأة -->
      <div class="field">
        <label for="restaurantName">{{ t('cboard.home.identity.restaurantNameLabel') }}</label>
        <input
          id="restaurantName"
          v-model="localRestaurantName"
          @focus="startEditingName"
          @blur="confirmEditingName"
          :class="{ editing: isEditingName }"
          type="text"
          :placeholder="t('cboard.home.identity.restaurantNamePlaceholder')"
        />
      </div>

      <!-- النشاط التجاري -->
      <div class="field">
        <label for="businessType">{{ t('cboard.home.identity.businessTypeLabel') }}</label>
        <select id="businessType" v-model="localBusinessType" @change="confirmBusinessType">
          <option disabled value="">{{ t('cboard.home.identity.businessTypePlaceholder') }}</option>
          <option value="مطعم">{{ t('cboard.home.identity.businessTypeOptions.restaurant') }}</option>
          <option value="لاونج">{{ t('cboard.home.identity.businessTypeOptions.lounge') }}</option>
          <option value="مقهى">{{ t('cboard.home.identity.businessTypeOptions.cafe') }}</option>
        </select>
      </div>

      <!-- الشعار -->
      <div class="field logo-field">
        <label>{{ t('cboard.home.identity.logoLabel') }}</label>

        <!-- رفع الشعار أو معاينته -->
        <div v-if="!logoUrl" class="dropzone" @dragover.prevent @drop.prevent="handleDrop" @click="triggerFileInput">
          <span class="drop-icon">📷</span>
          <span class="drop-text">رفع الشعار</span>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden-input"
            @change="handleLogoUpload"
          />
        </div>

        <div v-else class="logo-preview-container">
          <img :src="logoUrl ?? ''" alt="شعار المطعم" class="logo-preview" />

          <div class="logo-actions">
            <button type="button" @click="triggerFileInput">{{ t('cboard.home.identity.changeLogo') }}</button>
            <button type="button" class="remove-btn" @click="removeLogo">{{ t('cboard.home.identity.removeLogo') }}</button>
          </div>

          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden-input"
            @change="handleLogoUpload"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useIdentityStore } from '@/stores/cboard/home/identityStore'
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const identity = useIdentityStore()
const fileInput = ref<HTMLInputElement | null>(null)

// 📝 refs محلية للتحرير
const localRestaurantName = ref('')
const localBusinessType = ref('')
const logoUrl = computed(() => identity.logoUrl)

const isEditingName = ref(false)

onMounted(async () => {
  await identity.initIdentity()
  // تحميل القيم من الـ store إلى الحقول المحلية
  localRestaurantName.value = identity.restaurantName
  localBusinessType.value = identity.businessType
})

function startEditingName() {
  isEditingName.value = true
}

async function confirmEditingName() {
  isEditingName.value = false
  await identity.setRestaurantName(localRestaurantName.value) // الحفظ عند التأمين فقط
}

async function confirmBusinessType() {
  await identity.setBusinessType(localBusinessType.value) // الحفظ عند تغيير الاختيار
}

function handleLogoUpload(event: Event) {
  const input = event.target as HTMLInputElement | null
  const file = input?.files?.[0]
  if (file && file.type.startsWith('image/')) {
    identity.uploadLogoToStorage(file)
  }
}

function triggerFileInput() {
  fileInput.value?.click()
}

function removeLogo() {
  identity.deleteLogoFromStorage()
}

function handleDrop(event: DragEvent) {
  const file = event.dataTransfer?.files?.[0]
  if (file && file.type.startsWith('image/')) {
    identity.uploadLogoToStorage(file)
  }
}
</script>

<style scoped>
.identity-form {
  padding: 0;
  background-color: transparent;
  box-shadow: none;
  border-radius: 0;
  font-family: 'Tajawal', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.identity-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: flex-start;
}

.identity-row .field {
  flex: 1;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: bold;
  color: #1C1C1C;
  font-size: 1rem;
}

input[type="text"],
select {
  padding: 0.75rem 1rem;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #FFFFFF;
  color: #1C1C1C;
}

input.editing {
  border-color: orange;
  outline: none;
}

.logo-field {
  gap: 1rem;
}

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

.hidden-input {
  display: none;
}

@media (max-width: 768px) {
  .identity-row {
    flex-direction: column;
  }
}
</style>
