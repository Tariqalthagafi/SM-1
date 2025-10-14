<template>
  <div class="template-customizer">
    <div class="card">
      <ThemeFontSelector
        :fonts="fontStore.fontOptions"
        :selectedFont="fontStore.fontFamily"
        @update:selectedFont="val => {
          fontStore.setFont(val)
          fontStore.saveFont()
        }"
      />
    </div>

    <div class="card">
   <OfferStylePicker
    :options="offerStyleStore.offerStyleOptions"
    :selected="offerStyleStore.offerStyle"
    @update:selected="val => {
    offerStyleStore.setOfferStyle(val)
    offerStyleStore.saveOfferStyle()
    }"
    />

    </div>

    <div class="card">
     <ExpiredStylePicker
     :options="expiredStyleStore.expiredStyleOptions"
     :selected="expiredStyleStore.expiredStyle"
     @update:selected="val => {
      expiredStyleStore.setExpiredStyle(val)
      expiredStyleStore.saveExpiredStyle()
     }"
    />

    </div>

    <div class="card">
<ImageShapeSelector
  :options="imageShapeStore.imageShapeOptions"
  :selected="imageShapeStore.imageShape"
  @update:selected="val => {
    imageShapeStore.setImageShape(val)
    imageShapeStore.saveImageShape()
  }"
/>


    </div>

    <div class="card">
<CurrencySelector
  :options="currencyStore.currencyOptions"
  :selected="currencyStore.currencySymbol"
  @update:selected="(val: string) => {
    currencyStore.setCurrency(val)
    currencyStore.saveCurrency()
  }"
/>


    </div>

    <div class="card">
<AllergenStyle
  :selected="'boxedA'"
  :options="[
    { value: 'boxedA', label: '🅰 مربع' },
    { value: 'boldA', label: 'A تقيل' },
    { value: 'warningTriangle', label: '⚠ مثلث تحذير' },
    { value: 'colored', label: '🅰 ملون' },
    { value: 'outlined', label: '🅰 بإطار' },
    { value: 'monochrome', label: 'A رمادي' },
    { value: 'hidden', label: 'بدون رمز' }
  ]"
/>


    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'

import CurrencySelector from '@/components/cboard/Templates/Selectors/CurrencySelector.vue'
import ThemeFontSelector from '@/components/cboard/Templates/Selectors/ThemeFontSelector.vue'
import OfferStylePicker from '@/components/cboard/Templates/Selectors/OfferStylePicker.vue'
import ExpiredStylePicker from '@/components/cboard/Templates/Selectors/ExpiredStylePicker.vue'
import ImageShapeSelector from '@/components/cboard/Templates/Selectors/ImageShapeSelector.vue'
import AllergenStyle from '@/components/cboard/Templates/Selectors/AllergenStyle.vue'

import { useFontStore } from '@/stores/cboard/templates/fontStore'
import { useOfferStyleStore } from '@/stores/cboard/templates/offerStyleStore'
import { useExpiredStyleStore } from '@/stores/cboard/templates/expiredStyleStore'
import { useImageShapeStore } from '@/stores/cboard/templates/imageShapeStore'
import { useCurrencyStore } from '@/stores/cboard/templates/currencyStore'
import { useAllergenStyleStore } from '@/stores/cboard/templates/allergenStyleStore'

const fontStore = useFontStore()
const offerStyleStore = useOfferStyleStore()
const expiredStyleStore = useExpiredStyleStore()
const imageShapeStore = useImageShapeStore()
const currencyStore = useCurrencyStore()
const allergenStyleStore = useAllergenStyleStore()

onMounted(async () => {
  await fontStore.initFontOptions()
  await offerStyleStore.initOfferStyleOptions()
  await expiredStyleStore.initExpiredStyleOptions()
  await imageShapeStore.initImageShapeOptions()
  await currencyStore.initCurrencyOptions()
  await allergenStyleStore.initAllergenStyleOptions()
})

</script>

<style scoped>
.template-customizer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem 2rem;
  padding: 1rem 0;
  background-color: #fff;
  font-family: 'Tajawal', sans-serif;
}

/* إزالة البطاقة، كل مكون مسؤول عن تنسيقه */
.card {
  padding: 0;
  border: none;
  background: transparent;
  box-shadow: none;
  border-radius: 0;
}

</style>
