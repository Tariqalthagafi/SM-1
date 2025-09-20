<template>
  <div class="identity-form">
    <!-- اسم المنشأة -->
    <div class="field">
      <label for="restaurantName">اسم المنشأة التجاري:</label>
      <input
        id="restaurantName"
        v-model="restaurantName"
        type="text"
        placeholder="مثلاً: كوفي طارق"
      />
    </div>

    <!-- النشاط التجاري -->
    <div class="field">
      <label for="businessType">النشاط التجاري:</label>
      <select id="businessType" v-model="businessType">
        <option value="مطعم">مطعم</option>
        <option value="لاونج">لاونج</option>
        <option value="مقهى">مقهى</option>
      </select>
    </div>

    <!-- الشعار -->
    <div class="field logo-field">
      <label>الشعار:</label>

      <input
        v-if="!logoUrl"
        type="file"
        accept="image/*"
        @change="handleLogoUpload"
      />

      <div v-else class="logo-preview-container">
        <img :src="logoUrl" alt="شعار المطعم" class="logo-preview" />

        <div class="logo-actions">
          <button type="button" @click="triggerFileInput">تغيير الشعار</button>
          <button type="button" class="remove-btn" @click="removeLogo">إزالة الشعار</button>
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
</template>

<script setup lang="ts">
import { useHomeStore } from '@/stores/cboard/homeStore'
import { computed, ref } from 'vue'

const home = useHomeStore()

const restaurantName = computed<string>({
  get: () => home.restaurantName,
  set: (val: string) => home.setRestaurantName(val)
})

const businessType = computed<string>({
  get: () => home.businessType,
  set: (val: string) => home.setBusinessType(val)
})

const logoUrl = computed(() => home.logoUrl)
const fileInput = ref<HTMLInputElement | null>(null)

function handleLogoUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    home.setLogoBlob(file)
  }
}

function triggerFileInput() {
  fileInput.value?.click()
}

function removeLogo() {
  home.setLogoUrl(null)
}
</script>
<style scoped>
.identity-form {
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.field {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.4rem;
}

input[type="text"],
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
  background-color: #fff;
}

.logo-field {
  display: flex;
  flex-direction: column;
}

.logo-preview-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-preview {
  max-height: 60px;
  border-radius: 6px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}

.logo-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.logo-actions button {
  padding: 0.3rem 0.6rem;
  font-size: 0.85rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  background-color: #fff;
}

.logo-actions .remove-btn {
  background-color: #f8d7da;
  border-color: #f5c2c7;
  color: #842029;
}

.hidden-input {
  display: none;
}
</style>