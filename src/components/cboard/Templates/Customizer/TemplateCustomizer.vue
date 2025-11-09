<template>
  <!-- عرض مؤشر التحميل أولاً -->
  <div v-if="isLoading" class="loading-indicator">
    <p>{{ t('cboard.templates.loading') }}</p>
    <!-- يمكنك إضافة أيقونة تحميل هنا إذا أردت -->
  </div>

  <!-- بعد انتهاء التحميل، يتم عرض المحتوى الفعلي -->
  <div v-else class="template-customizer">
    <!-- بطاقة اختيار الخط -->
    <div class="card">
      <ThemeFontSelector
        :fonts="fontStore.fontOptions"
        :selectedFont="fontStore.fontFamily"
        @update:selectedFont="val => {
          fontStore.setFont(val)
          fontStore.saveFont()
          templateSettingsStore.saveToSupabase()
        }"
      />
    </div>

    <!-- بطاقة اختيار نمط العرض -->
    <div class="card">
<OfferStylePicker
  :selected="offerStyleStore.offerStyle"
  :options="offerStyleStore.offerStyleOptions"
  :original-price="product.originalPrice"
  :new-price="product.discountedPrice"
  @update:selected="val => {
    offerStyleStore.setOfferStyle(val)
    offerStyleStore.saveOfferStyle()
    templateSettingsStore.saveToSupabase()
  }"
/>

    </div>

    <!-- بطاقة اختيار نمط انتهاء الصلاحية -->
<div class="card">
  <ExpiredStylePicker
    :options="expiredStyleStore.expiredStyleOptions"
    :selected="expiredStyleStore.expiredStyle"
    @update:selected="val => {
      expiredStyleStore.setExpiredStyle(val)
      expiredStyleStore.saveExpiredStyle()
      templateSettingsStore.saveToSupabase()
    }"
  />
</div>


    <!-- بطاقة اختيار شكل الصورة -->
<div class="card">
  <ImageShapeSelector
    :options="imageShapeStore.imageShapeOptions"
    :selected="imageShapeStore.imageShape"
    @update:selected="val => {
      imageShapeStore.setImageShape(val)
      imageShapeStore.saveImageShape()
      templateSettingsStore.saveToSupabase()
    }"
  />
</div>


    <!-- بطاقة اختيار العملة -->
<div class="card">
  <CurrencySelector
    :options="currencyStore.currencyOptions"
    :selected="currencyStore.currencySymbol"
    @update:selected="(val: string) => {
      currencyStore.setCurrency(val)
      currencyStore.saveCurrency()
      templateSettingsStore.saveToSupabase()
    }"
  />
</div>


    <!-- بطاقة اختيار نمط مسببات الحساسية -->
<div class="card">
  <AllergenStyle
    :options="allergenStyleStore.allergenStyleOptions"
    :selected="allergenStyleStore.allergenIconStyle"
    @update:selected="val => {
      allergenStyleStore.setAllergenStyle(val)
      allergenStyleStore.saveAllergenStyle()
      templateSettingsStore.saveToSupabase()
    }"
  />
</div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

// المكونات
import CurrencySelector from '@/components/cboard/Templates/Selectors/CurrencySelector.vue'
import ThemeFontSelector from '@/components/cboard/Templates/Selectors/ThemeFontSelector.vue'
import OfferStylePicker from '@/components/cboard/Templates/Selectors/OfferStylePicker.vue'
import ExpiredStylePicker from '@/components/cboard/Templates/Selectors/ExpiredStylePicker.vue'
import ImageShapeSelector from '@/components/cboard/Templates/Selectors/ImageShapeSelector.vue'
import AllergenStyle from '@/components/cboard/Templates/Selectors/AllergenStyle.vue'

// مخازن الحالة (Pinia Stores)
import { useFontStore } from '@/stores/cboard/templates/fontStore'
import { useOfferStyleStore } from '@/stores/cboard/templates/offerStyleStore'
import { useExpiredStyleStore } from '@/stores/cboard/templates/expiredStyleStore'
import { useImageShapeStore } from '@/stores/cboard/templates/imageShapeStore'
import { useCurrencyStore } from '@/stores/cboard/templates/currencyStore'
import { useAllergenStyleStore } from '@/stores/cboard/templates/allergenStyleStore'
import { useTemplateSettingsStore } from '@/stores/cboard/templates/templateSettingsStore'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const templateSettingsStore = useTemplateSettingsStore()

// 1. تعريف متغير حالة التحميل
const isLoading = ref(true)

// تهيئة جميع المخازن
const fontStore = useFontStore()
const offerStyleStore = useOfferStyleStore()
const expiredStyleStore = useExpiredStyleStore()
const imageShapeStore = useImageShapeStore()
const currencyStore = useCurrencyStore()
const allergenStyleStore = useAllergenStyleStore()

// بيانات وهمية للمعاينة
const product = ref({
  originalPrice: 60,
  discountedPrice: 25
})

// عند تحميل المكون، قم بتهيئة جميع المخازن
onMounted(() => {
  initCustomizer()
})

// دالة لتهيئة وتحميل البيانات الأولية من قاعدة البيانات
async function initCustomizer() {
  try {
    // استخدام Promise.all لتشغيل جميع عمليات التهيئة بشكل متوازٍ
    await Promise.all([
      fontStore.initFontOptions(),
      offerStyleStore.loadOfferStyle(),
      expiredStyleStore.initExpiredStyleOptions(),
      imageShapeStore.initImageShapeOptions(),
      currencyStore.initCurrencyOptions(),
      allergenStyleStore.initAllergenStyleOptions()
    ])
  } catch (error) {
    console.error("Failed to initialize customizer settings:", error);
    // يمكنك هنا عرض رسالة خطأ للمستخدم إذا فشل التحميل
  } finally {
    // 2. بعد انتهاء التحميل (سواء نجح أو فشل)، قم بتغيير حالة التحميل لعرض المحتوى
    isLoading.value = false
  }
}
</script>

<style scoped>
.template-customizer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem 2rem;
  padding: 1rem 0;
  background-color: #fff;
  font-family: var(--font-family);
}

.card {
  padding: 1rem;
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border: 1px solid #F0F0F0;
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

/* 3. إضافة أنماط لمؤشر التحميل */
.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  width: 100%;
  font-size: 1.2rem;
  color: #888;
  background-color: #fff;
}
</style>
