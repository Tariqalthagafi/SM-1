<template>
  <div class="template-customizer-2">
    <h4>Menu Design</h4>

<!-- التابات + زر النشر -->
<div class="tabs-row">
  <div class="tabs">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      :class="{ active: activeTab === tab.key }"
      @click="activeTab = tab.key"
    >
      {{ tab.label }}
    </button>
  </div>

  <!-- زر النشر (شكلي فقط) -->
  <button class="publish-btn">
    نشر
  </button>
</div>


    <!-- المحتوى -->
    <div class="tab-content">
      <div v-if="activeTab === 'layout'" class="layout-tab">
        <!-- التخطيط -->
        <section class="customizer-section">
          
          <LayoutEditor />
        </section>

        <!-- الخط -->
        <section class="customizer-section">
          
          <ThemeFontSelector
  :selectedFont="fontStore.fontFamily"
  :fonts="fontStore.fontOptions"
  @update:selectedFont="fontStore.setFont"
/>

        </section>
        <!-- العملة -->
<section class="customizer-section">
  <CurrencySelector />
</section>
<!-- شكل الصورة -->
<section class="customizer-section">
  <ImageShapeSelector
    :selected="imageShapeStore.imageShape"
    :options="imageShapeStore.imageShapeOptions"
    @update:selected="(val) => {
      imageShapeStore.setImageShape(val)
      imageShapeStore.saveImageShape()
    }"
  />
</section>
<!-- نمط رمز الحساسية -->
<section class="customizer-section">
  <AllergenStyleSelector
    :selected="allergenStyleStore.allergenIconStyle"
    :options="allergenStyleStore.allergenStyleOptions"
    @update:selected="(val) => {
      allergenStyleStore.setAllergenStyle(val)
      allergenStyleStore.saveAllergenStyle()
    }"
  />
</section>
<!-- نمط عرض السعر -->
<section class="customizer-section">
  <OfferStylePicker
    :selected="offerStyleStore.offerStyle"
    :options="offerStyleStore.offerStyleOptions"
    :originalPrice="60"
    :newPrice="25"
    @update:selected="offerStyleStore.setOfferStyle"
  />
</section>
<!-- نمط عرض المنتجات المنتهية -->
<section class="customizer-section">
  <ExpiredStylePicker
    :selected="expiredStyleStore.expiredStyle"
    :options="expiredStyleStore.expiredStyleOptions"
    @update:selected="(val) => {
      expiredStyleStore.setExpiredStyle(val)
      expiredStyleStore.saveExpiredStyle()
    }"
  />
</section>

      </div>

      <div v-else-if="activeTab === 'color'">
        <ColorEditor />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LayoutEditor from './LayoutEditor.vue'
import ColorEditor from './ColorEditor.vue'
import ThemeFontSelector from '@/components/cboard/Templates/Selectors/ThemeFontSelector.vue'
import { useFontStore } from '@/stores/cboard/templates/fontStore.ts'
import CurrencySelector from '@/components/cboard/Templates/Selectors/CurrencySelector.vue'
import ImageShapeSelector from '@/components/cboard/Templates/Selectors/ImageShapeSelector.vue'
import { useImageShapeStore } from '@/stores/cboard/templates/imageShapeStore'
import AllergenStyleSelector from '@/components/cboard/Templates/Selectors/AllergenStyle.vue'
import { useAllergenStyleStore } from '@/stores/cboard/templates/allergenStyleStore'
import OfferStylePicker from '@/components/cboard/Templates/Selectors/OfferStylePicker.vue'
import { useOfferStyleStore } from '@/stores/cboard/templates/offerStyleStore'
import ExpiredStylePicker from '@/components/cboard/Templates/Selectors/ExpiredStylePicker.vue'
import { useExpiredStyleStore } from '@/stores/cboard/templates/expiredStyleStore'

import { onMounted } from 'vue'

const tabs = [
  { key: 'layout', label: 'الانماط' },
  { key: 'color', label: 'الالوان' }
]

const activeTab = ref('layout')
const fontStore = useFontStore()
const imageShapeStore = useImageShapeStore()
const allergenStyleStore = useAllergenStyleStore()
const offerStyleStore = useOfferStyleStore()
const expiredStyleStore = useExpiredStyleStore()

</script>

<style scoped>
.template-customizer-2 {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-family: 'Tajawal', sans-serif;
}

/* التابات */
.tabs {
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid #eee;
}

.tabs button {
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  font-weight: 600;
  cursor: pointer;
  color: #666;
  transition: all 0.2s ease;
}

.tabs button.active {
  color: #FF7A00;
  border-bottom: 2px solid #FF7A00;
  background-color: #fffaf3;
}

.tabs button:hover {
  color: #FF7A00;
}

/* محتوى التاب */
.tab-content {
  padding-top: 0.5rem;
}

/* الأقسام داخل التاب */
.customizer-section {
  display: flex;
  align-items: center;       /* ✅ label و input في نفس الصف */
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px dashed #eee;
}

.customizer-section:last-child {
  border-bottom: none;
}

.customizer-section h5,
.customizer-section label {
  flex: 0 0 160px;           /* ✅ عرض ثابت للـ label */
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.customizer-section select,
.customizer-section input {
  flex: 1;                   /* ✅ ياخذ باقي المساحة */
  padding: 0.45rem 0.6rem;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  font-size: 0.85rem;
  background-color: #FFFFFF;
  color: #1C1C1C;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.customizer-section select:focus,
.customizer-section input:focus {
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
  outline: none;
}

/* صف التابات + زر النشر */
.tabs-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 0.5rem;
}

/* زر النشر */
.publish-btn {
  padding: 0.4rem 0.8rem;
  background-color: #FF7A00;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.publish-btn:hover {
  background-color: #e56d00;
}

</style>
