<template>
  <div v-if="sections.length && products.length">
    <h4>معاينة القالب</h4>

    <!-- ✅ عرض بالقسم تفاعلي -->
    <SectionedLayout
      v-if="layoutStore.layout === 'sectioned'"
      :products="products"
      :sections="sections"
      :colors="colorStore.colors"
    />

    <!-- ✅ باقي النماذج كمكونات مستقلة -->
    <component
      v-else
      :is="layoutComponent"
      :products="products"
      :sections="sections"
      :colors="colorStore.colors"
    />
  </div>

  <p v-else>جاري تحميل المعاينة...</p>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'
import { useColorEditorStore } from '@/stores/cboard/MenuDesign/ColorEditorStore'
import { useLayoutEditorStore } from '@/stores/cboard/MenuDesign/LayoutEditor'

// ✅ استيراد مكونات العرض
import GridLayout from './GridLayout.vue'
import CardsLayout from './CardsLayout.vue'
import VerticalLayout from './VerticalLayout.vue'
import SectionedLayout from './SectionedLayout.vue'

const sections = ref<any[]>([])
const products = ref<any[]>([])

const colorStore = useColorEditorStore()
const layoutStore = useLayoutEditorStore()

const currencySymbol = ref('ر.س')

// ✅ تطبيق الألوان على CSS Variables
function applySettingsToCSS(colors: Record<string, string>) {
  const root = document.documentElement
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}-bg`, value)
    root.style.setProperty(`--${key}-color`, value)
  })
  root.style.setProperty('--font-family', 'Cairo')
}

// ✅ تحميل البيانات من indexedDB
async function loadStaticData() {
  const offers = await indexedDBService.getAll('offers')
  sections.value = await indexedDBService.getAll('sections')
  const allProducts = await indexedDBService.getAll('products')

  products.value = allProducts.map((p: any) => {
    const offer = offers.find((o: any) => o.id === p.selectedOfferId && o.isActive)
    if (offer) {
      if (offer.type === 'percentage') {
        p.finalPrice = Math.round((p.basePrice ?? 0) * (1 - offer.discount / 100))
      } else if (offer.type === 'unifiedPrice') {
        p.finalPrice = offer.discount
      }
    } else {
      p.finalPrice = p.basePrice ?? 0
    }
    return p
  })
}

// ✅ تحميل أولي
onMounted(() => {
  loadStaticData()
  applySettingsToCSS(colorStore.colors)
})

// ✅ تطبيق الألوان عند أي تغيير
watchEffect(() => {
  applySettingsToCSS(colorStore.colors)
})

// ✅ تحديد المكون المناسب حسب التخطيط
const layoutComponent = computed(() => {
  switch (layoutStore.layout) {
    case 'grid': return GridLayout
    case 'cards': return CardsLayout
    case 'vertical': return VerticalLayout
    default: return GridLayout
  }
})
</script>

<style scoped>
h4 {
  margin-bottom: 1rem;
  font-family: var(--font-family, 'Cairo');
  color: var(--titleText-color, #000);
}
</style>
