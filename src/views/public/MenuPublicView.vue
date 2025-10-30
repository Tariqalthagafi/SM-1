<template>
  <div class="public-menu">
    <template v-if="isActive">
      <component :is="layoutComponent" v-bind="layoutProps" />
    </template>

    <template v-else>
      <div class="inactive-message">
        <h2>سنعود إلى العمل قريبًا</h2>
        <p>نقوم حاليًا بتحديث المنيو الخاص بنا. شكرًا لصبركم!</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed, onMounted, watchEffect, defineAsyncComponent } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'

// ✅ المتاجر الموحدة
import { useLayoutEditorStore } from '@/stores/cboard/MenuDesign/LayoutEditor'
import { useFontStore } from '@/stores/cboard/templates/fontStore'
import { useCurrencyStore } from '@/stores/cboard/templates/currencyStore'
import { useImageShapeStore } from '@/stores/cboard/templates/imageShapeStore'
import { useOfferStyleStore } from '@/stores/cboard/templates/offerStyleStore'
import { useAllergenStyleStore } from '@/stores/cboard/templates/allergenStyleStore'
import { useColorEditorStore } from '@/stores/cboard/MenuDesign/ColorEditorStore'

// ✅ استخراج رقم المنيو من الرابط
const route = useRoute()
const menuId = route.params.id

// ✅ تحميل التخطيط
const layoutStore = useLayoutEditorStore()
const layout = computed(() => layoutStore.layout || 'grid')

// ✅ تخطيطات العرض العام فقط
const layoutComponent = computed(() => {
  const publicLayouts: Record<string, any> = {
    vertical: defineAsyncComponent(() => import('@/components/cboard/MenuDesign/shapesmenu/VerticalLayout.vue')),
    grid: defineAsyncComponent(() => import('@/components/cboard/MenuDesign/shapesmenu/GridLayout.vue')),
    cards: defineAsyncComponent(() => import('@/components/cboard/MenuDesign/shapesmenu/CardsLayout.vue')),
    sectioned: defineAsyncComponent(() => import('@/components/cboard/MenuDesign/shapesmenu/SectionedLayout.vue'))
  }
  return publicLayouts[layout.value] || publicLayouts.grid
})

// ✅ حالة التفعيل والخصائص
const isActive = ref(false)
const layoutProps = ref({})

// ✅ تحميل المتاجر
const fontStore = useFontStore()
const currencyStore = useCurrencyStore()
const imageShapeStore = useImageShapeStore()
const offerStyleStore = useOfferStyleStore()
const allergenStore = useAllergenStyleStore()
const colorStore = useColorEditorStore()

// ✅ تطبيق الألوان على CSS Variables
function applySettingsToCSS(colors: Record<string, string>) {
  const root = document.documentElement
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}-bg`, value)
    root.style.setProperty(`--${key}-color`, value)
  })
  root.style.setProperty('--font-family', fontStore.fontFamily)
}

// ✅ تحميل البيانات عند الدخول
onMounted(async () => {
  await layoutStore.loadLayout()

  await Promise.all([
    fontStore.initFontOptions(),
    currencyStore.initCurrencyOptions(),
    imageShapeStore.initImageShapeOptions(),
    offerStyleStore.loadOfferStyle(),
    allergenStore.initAllergenStyleOptions()
  ])

  applySettingsToCSS(colorStore.colors)
  watchEffect(() => applySettingsToCSS(colorStore.colors))

  const domainSettings = await indexedDBService.get('domain', 'default')
  isActive.value = domainSettings?.isActive ?? false

  if (isActive.value) {
    const products = await indexedDBService.getAll('products')
    const sections = await indexedDBService.getAll('sections')

    layoutProps.value = {
      products,
      sections,
      currencySymbol: currencyStore.displayedSymbol,
      currencyKey: currencyStore.currencySymbol,
      imageShape: imageShapeStore.imageShape,
      offerStyle: offerStyleStore.offerStyle,
      allergenIconStyle: allergenStore.allergenIconStyle
    }
  }
})
</script>

<style scoped>
.public-menu {
  padding: 2rem;
  font-family: var(--font-family, 'Tajawal');
  background-color: var(--bodyBackground-bg, #f9f9f9);
}

.inactive-message {
  text-align: center;
  padding: 3rem 1rem;
  background-color: #fff6ec;
  border: 1px solid #ffd9b3;
  border-radius: 10px;
  color: #ff9318;
}
</style>
