<template>
  <div v-if="sections.length && products.length">
    <h4>{{ t('cboard.menuDesign.templatePreview.title') }}</h4>
    
<ContactBar :colors="colorStore.colors" />

    
    <!-- ✅ عرض بالقسم التفاعلي -->
    <SectionedLayout
      v-if="layoutStore.layout === 'sectioned'"
      :products="products"
      :sections="sections"
      :colors="colorStore.colors"
      :currency-symbol="currencySymbol"
      :currency-key="currencyKey"
      :image-shape="imageShape"
      :offer-style="offerStyle"
      :allergen-icon-style="allergenIconStyle"
    />


    <!-- ✅ باقي النماذج -->
<component
  v-else
  :is="layoutComponent"
  :products="products"
  :sections="sections"
  :categories="categories"
  :currency-symbol="currencySymbol"
  :currency-key="currencyKey"
  :image-shape="imageShape"
  :offer-style="offerStyle"
  :allergen-icon-style="allergenIconStyle"
  :colors="colorStore.colors"
/>

  </div>

  <p v-else>{{ t('cboard.menuDesign.templatePreview.loading') }}</p>


</template>

<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'
import { useColorEditorStore } from '@/stores/cboard/MenuDesign/ColorEditorStore'
import { useLayoutEditorStore } from '@/stores/cboard/MenuDesign/LayoutEditor'
import { useCurrencyStore } from '@/stores/cboard/templates/currencyStore'
import { useImageShapeStore } from '@/stores/cboard/templates/imageShapeStore'

// ✅ استيراد مكونات العرض
import GridLayout from './GridLayout.vue'
import CardsLayout from './CardsLayout.vue'
import VerticalLayout from './VerticalLayout.vue'
import SectionedLayout from './SectionedLayout.vue'
import SidebarView from './SidebarView.vue'
import GridView from './GridView.vue'
import PagedView from './PagedView.vue'
import { useOfferStyleStore } from '@/stores/cboard/templates/offerStyleStore'
import { useFontStore } from '@/stores/cboard/templates/fontStore'
// ✅ إضافة استيراد متجر الحساسية (افتراض)
import { useAllergenStyleStore } from '@/stores/cboard/templates/allergenStyleStore'
import ContactBar from '@/components/cboard/MenuPreview/ContactBar.vue'
import { useI18n } from 'vue-i18n'
import { supabase } from '@/supabase'

const { t } = useI18n()

const fontStore = useFontStore()

const offerStyleStore = useOfferStyleStore()
const offerStyle = computed(() => offerStyleStore.offerStyle)

// ✅ تهيئة متجر الحساسية
const allergenStore = useAllergenStyleStore()
const allergenIconStyle = computed(() => allergenStore.allergenIconStyle)

const sections = ref<any[]>([])
const products = ref<any[]>([])
const categories = ref<any[]>([])

const colorStore = useColorEditorStore()
const layoutStore = useLayoutEditorStore()
const currencyStore = useCurrencyStore()
const imageShapeStore = useImageShapeStore()

const currencySymbol = computed(() => currencyStore.displayedSymbol)
const currencyKey = computed(() => currencyStore.currencySymbol)
const imageShape = computed(() => imageShapeStore.imageShape)

// ✅ تطبيق الألوان على CSS Variables
function applySettingsToCSS(colors: Record<string, string>) {
  const root = document.documentElement
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}-bg`, value)
    root.style.setProperty(`--${key}-color`, value)
  })
  root.style.setProperty('--font-family', fontStore.fontFamily) // ✅ ديناميكي
  document.body.style.backgroundColor = colors.menuPageBackground
}


// ✅ تحميل البيانات من indexedDB
async function loadHybridData() {
  const { data: productsData } = await supabase.from('products').select('*')
  const { data: sectionsData } = await supabase.from('sections').select('*')

  const offers = await indexedDBService.getAll('offers')

  const enrichedProducts = (productsData ?? []).map((p: any) => {
    const offer = offers.find((o: any) => o.id === p.selectedOfferId && o.isActive)
    p.finalPrice = offer
      ? offer.type === 'percentage'
        ? Math.round((p.basePrice ?? 0) * (1 - offer.discount / 100))
        : offer.discount
      : p.basePrice ?? 0
    p.hasAllergens = p.allergens?.length > 0
    return p
  })

  sections.value = sectionsData ?? []
  products.value = enrichedProducts

  categories.value = (sectionsData ?? []).map((section: any) => ({
    id: section.id,
    name: section.name,
    products: enrichedProducts.filter((p: any) => p.sectionId === section.id)
  }))
}


// ✅ تحميل أولي
onMounted(async () => {
  currencyStore.initCurrencyOptions()
  allergenStore.initAllergenStyleOptions()
  imageShapeStore.initImageShapeOptions()

  await loadHybridData()
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
    case 'sidebarCategories': return SidebarView
    case 'gridCategories': return GridView
    case 'pagedCategories': return PagedView
    default: return GridLayout
  }
})

// ✅ تحديد ما إذا كان التخطيط يعتمد على الأقسام كـ categories
const isCategoryLayout = computed(() =>
  ['sidebarCategories', 'gridCategories', 'pagedCategories'].includes(layoutStore.layout)
)
</script>

<style scoped>
h4 {
  margin-bottom: 1rem;
  font-family: var(--font-family);
  color: var(--titleText-color, #000);
}


</style>
