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
  @update:selected="val => {
    currencyStore.setCurrency(val)
    currencyStore.saveCurrency()
  }"
/>

    </div>

    <div class="card">
<AllergenStyle
  :options="allergenStyleStore.allergenStyleOptions"
  :selected="allergenStyleStore.allergenIconStyle"
  @update:selected="val => {
    allergenStyleStore.setAllergenStyle(val)
    allergenStyleStore.saveAllergenStyle()
  }"
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: #f5f5f5;
}

.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
</style>
