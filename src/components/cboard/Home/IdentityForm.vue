<template>
  <section class="identity-form">
    <div class="identity-row">
      <!-- اسم المنشأة -->
      <div class="field">
        <label for="restaurantName">{{ t('cboard.home.identity.restaurantNameLabel') }}</label>
        <input
  id="restaurantName"
  :value="restaurantName"
  @input="onRestaurantNameInput"
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
        <select id="businessType" v-model="businessType">
          <option disabled value="">{{ t('cboard.home.identity.businessTypePlaceholder') }}</option>
          <option value="مطعم">{{ t('cboard.home.identity.businessTypeOptions.restaurant') }}</option>
          <option value="لاونج">{{ t('cboard.home.identity.businessTypeOptions.lounge') }}</option>
          <option value="مقهى">{{ t('cboard.home.identity.businessTypeOptions.cafe') }}</option>
        </select>
      </div>

      <!-- الشعار -->
      <div class="field logo-field">
        <label>{{ t('cboard.home.identity.logoLabel') }}</label>

        <input
          v-if="!logoUrl"
          type="file"
          accept="image/*"
          @change="handleLogoUpload"
        />

        <div v-else class="logo-preview-container">
          <img :src="logoUrl" alt="شعار المطعم" class="logo-preview" />

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
import { ref, onMounted, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const identity = useIdentityStore()
const fileInput = ref<HTMLInputElement | null>(null)

const restaurantName = ref('')
const isEditingName = ref(false)

onMounted(async () => {
  await identity.loadFromIndexedDB()
  restaurantName.value = identity.restaurantName
})

function startEditingName() {
  isEditingName.value = true
}

function confirmEditingName() {
  isEditingName.value = false
  identity.setRestaurantName(restaurantName.value)
}

const businessType = ref(identity.businessType)

watch(businessType, async (val: string) => {
  if (!val || val === '') return
  await identity.setBusinessType(val)
})

const logoUrl = computed(() => identity.logoUrl)

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

function onRestaurantNameInput(event: Event) {
  const input = event.currentTarget as HTMLInputElement
  restaurantName.value = input.value
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
  border: 1px solid #CCC;
  color: #1C1C1C;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logo-actions button:hover {
  background-color: #F0F0F0;
}

.logo-actions .remove-btn {
  background-color: #F8D7DA;
  border-color: #F5C2C7;
  color: #842029;
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
