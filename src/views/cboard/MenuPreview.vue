<template>
  <div v-if="sections.length && products.length" class="menu-preview-frame">
    <component
      :is="layoutComponent"
      v-bind="layoutProps"
    />
  </div>
  <p v-else>جاري تحميل المنيو...</p>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'
import { useCurrencyStore } from '@/stores/cboard/templates/currencyStore'
import { useLayoutEditorStore } from '@/stores/cboard/MenuDesign/LayoutEditor'
import { useImageShapeStore } from '@/stores/cboard/templates/imageShapeStore'

// ✅ استيراد مكونات العرض
import VerticalLayout from '@/components/cboard/MenuDesign/shapesmenu/VerticalLayout.vue'
import GridLayout from '@/components/cboard/MenuDesign/shapesmenu/GridLayout.vue'
import CardsLayout from '@/components/cboard/MenuDesign/shapesmenu/CardsLayout.vue'
import SectionedLayout from '@/components/cboard/MenuDesign/shapesmenu/SectionedLayout.vue'
import SidebarView from '@/components/cboard/MenuDesign/shapesmenu/SidebarView.vue'
import GridView from '@/components/cboard/MenuDesign/shapesmenu/GridView.vue'
import PagedView from '@/components/cboard/MenuDesign/shapesmenu/PagedView.vue'

const sections = ref<any[]>([])
const products = ref<any[]>([])

const layoutStore = useLayoutEditorStore()
const layout = computed(() => layoutStore.layout || 'grid')

const currencyStore = useCurrencyStore()
const currencyKey = computed(() => currencyStore.currencySymbol)
const currencySymbol = computed(() => currencyStore.displayedSymbol)

const imageShapeStore = useImageShapeStore()
const imageShape = computed(() => {
  const shape = imageShapeStore.imageShape
  return ['circle', 'rectangle', 'roundedSquare', 'none'].includes(shape)
    ? shape
    : 'rectangle'
})

function applyFinalSettings(settings: any, colors: Record<string, string>) {
  const root = document.documentElement
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}-bg`, value)
    root.style.setProperty(`--${key}-color`, value)
  })
  if (settings.fontFamily) {
    root.style.setProperty('--font-family', settings.fontFamily)
  }
}

async function loadFinalData() {
  const customization = await indexedDBService.getCustomization('template') || {}
  const colors = await indexedDBService.getColors(customization.colors_ref ?? 'default') || {}
  applyFinalSettings(customization, colors)

  const offers = await indexedDBService.getAll('offers')
  sections.value = await indexedDBService.getAll('sections')
  const allProducts = await indexedDBService.getAll('products')

  products.value = allProducts.map((p: any) => {
    p.imageBase64 = typeof p.imageBase64 === 'string' ? p.imageBase64 : ''
    const offer = offers.find((o: any) => o.id === p.selectedOfferId && o.isActive)
    if (offer) {
      if (offer.type === 'percentage') {
        p.finalPrice = Math.round((p.basePrice ?? 0) * (1 - offer.discount / 100))
        p.offerLabel = `خصم ${offer.discount}%`
      } else if (offer.type === 'unifiedPrice') {
        p.finalPrice = offer.discount
        p.offerLabel = `سعر موحد`
      }
    } else {
      p.finalPrice = p.basePrice ?? 0
      p.offerLabel = null
    }
    p.hasAllergens = Array.isArray(p.allergens) && p.allergens.length > 0
    return p
  })
}

// ✅ تجهيز الأقسام مع المنتجات
const sectionsWithProducts = computed(() =>
  sections.value.map(section => ({
    ...section,
    products: products.value.filter(p => p.sectionId === section.id && p.status === 'visible')
  }))
)

// ✅ اختيار المكون المناسب حسب النموذج
const layoutComponent = computed(() => {
  const map: Record<string, any> = {
    vertical: VerticalLayout,
    grid: GridLayout,
    cards: CardsLayout,
    sectioned: SectionedLayout,
    sidebarCategories: SidebarView,
    gridCategories: GridView,
    pagedCategories: PagedView
  }
  return map[layout.value] || GridLayout
})

const layoutProps = computed(() => {
  const base = {
    products: products.value,
    currencySymbol: currencySymbol.value,
    currencyKey: currencyKey.value,
    imageShape: imageShape.value
  }

  const layoutsUsingCategories = ['gridCategories', 'pagedCategories', 'sidebarCategories']
  if (layoutsUsingCategories.includes(layout.value)) {
    return {
      ...base,
      categories: sectionsWithProducts.value
    }
  } else {
    return {
      ...base,
      sections: sectionsWithProducts.value
    }
  }
})

onMounted(async () => {
  await currencyStore.initCurrencyOptions()
  await layoutStore.loadLayout()
  await loadFinalData()
})
</script>

<style scoped>
.menu-preview-frame {
  margin-top: 1rem;
}

.menu-section {
  margin-bottom: 1rem;
}

.section-title {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--sectionTitle-color, #000);
  font-family: var(--font-family, 'Cairo');
}

/* ✅ تخطيطات متعددة */
.products.layout-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.5rem;
}

.products.layout-vertical {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.products.layout-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-between;
}

.products.layout-sectioned {
  display: block;
}

.products.layout-sidebar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}

.products.layout-paged {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
}

/* ✅ المنتج */
.product-item {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  align-items: flex-start;
  text-align: start;
  background-color: var(--cardBackground-bg, #f9f9f9);
  color: var(--titleText-color, #000);
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-family: var(--font-family, 'Cairo');
}

.product-image {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  background-color: #eee;
}

.product-info {
  width: 100%;
}

.product-name {
  display: block;
  margin-bottom: 0.2rem;
}

.allergen-icon {
  color: red;
  font-size: 0.9rem;
  margin-inline-start: 0.3rem;
}

.product-price {
  font-weight: bold;
  font-size: 0.8rem;
  color: var(--priceText-color, #333);
}

.old-price {
  text-decoration: line-through;
  color: red;
  margin-inline-end: 0.3rem;
}

.final-price {
  font-weight: bold;
}

.offer-label {
  display: block;
  font-size: 0.75rem;
  color: #007bff;
  margin-top: 0.2rem;
}

:global(.riyal-icon) {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  margin-inline-start: 0.2em;
}
</style>
