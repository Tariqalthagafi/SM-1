<template>
  <section class="identity-form">
    <div class="identity-row">
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
  </section>
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
  padding: 0;
  background-color: transparent;
  box-shadow: none;
  border-radius: 0;
  font-family: 'Tajawal', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* توزيع الحقول في صف واحد */
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

/* استجابة للشاشات الصغيرة */
@media (max-width: 768px) {
  .identity-row {
    flex-direction: column;
  }
}
</style>
