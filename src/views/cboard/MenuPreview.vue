<!-- 📁 المسار: src/views/cboard/MenuPreview.vue -->
<template>
  <div class="contact-buttons-row">
    <SocialContactButton position="none" />
    <PaymentContactButton position="none" />
    <DeliveryContactButton position="none" />
  </div>
  <div class="menu-separator"></div>
  <div v-if="!isLoading" class="menu-preview-frame">
    <component :is="layoutComponent" v-bind="layoutProps" />
  </div>
  <p v-else>جاري تحميل المنيو...</p>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useFontStore } from '@/stores/cboard/templates/fontStore'
import { useCurrencyStore } from '@/stores/cboard/templates/currencyStore'
import { useLayoutEditorStore } from '@/stores/cboard/MenuDesign/LayoutEditor'
import { useImageShapeStore } from '@/stores/cboard/templates/imageShapeStore'
import { useOfferStyleStore } from '@/stores/cboard/templates/offerStyleStore'
import { useAllergenStyleStore } from '@/stores/cboard/templates/allergenStyleStore'
import { indexedDBService } from '@/services/indexedDBService'
import { useSocialStore } from '@/stores/cboard/Social'

// ✅ مكونات التخطيط
import VerticalLayout from '@/components/cboard/MenuDesign/shapesmenu/VerticalLayout.vue'
import GridLayout from '@/components/cboard/MenuDesign/shapesmenu/GridLayout.vue'
import CardsLayout from '@/components/cboard/MenuDesign/shapesmenu/CardsLayout.vue'
import SectionedLayout from '@/components/cboard/MenuDesign/shapesmenu/SectionedLayout.vue'
import SidebarView from '@/components/cboard/MenuDesign/shapesmenu/SidebarView.vue'
import GridView from '@/components/cboard/MenuDesign/shapesmenu/GridView.vue'
import PagedView from '@/components/cboard/MenuDesign/shapesmenu/PagedView.vue'

// ✅ مكونات التواصل
import SocialContactButton from '@/components/cboard/Social/SocialContactButton.vue'
import DeliveryContactButton from '@/components/cboard/OrderInfo/DeliveryContactButton.vue'
import PaymentContactButton from '@/components/cboard/OrderInfo/PaymentContactButton.vue'

const isLoading = ref(true)

const fontStore = useFontStore()
const offerStyleStore = useOfferStyleStore()
const layoutStore = useLayoutEditorStore()
const currencyStore = useCurrencyStore()
const imageShapeStore = useImageShapeStore()
const allergenStyleStore = useAllergenStyleStore()
const socialStore = useSocialStore()

const sections = ref<any[]>([])
const products = ref<any[]>([])

const layout = computed(() => layoutStore.layout || 'grid')
const currencyKey = computed(() => currencyStore.currencySymbol)
const currencySymbol = computed(() => currencyStore.displayedSymbol)
const offerStyle = computed(() => offerStyleStore.offerStyle)

const imageShape = computed(() => {
  const shape = imageShapeStore.imageShape
  return ['circle', 'rectangle', 'roundedSquare', 'none'].includes(shape)
    ? shape
    : 'rectangle'
})

const allergenIconStyle = computed(() => allergenStyleStore.allergenIconStyle)
const getAllergenIconSymbol = computed(() => allergenStyleStore.getIconSymbol)
const getAllergenIconStyle = computed(() => allergenStyleStore.getIconStyle)

function applyFinalColors(colors: Record<string, string>) {
  const root = document.documentElement
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}-bg`, value)
    root.style.setProperty(`--${key}-color`, value)
  })
}

async function loadFinalData() {
  const customization = await indexedDBService.getCustomization('template') || {}
  const loadedColors = await indexedDBService.getColors(customization.colors_ref ?? 'default') || {}
  applyFinalColors(loadedColors)

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

const sectionsWithProducts = computed(() =>
  sections.value.map(section => ({
    ...section,
    products: products.value.filter(p => p.sectionId === section.id && p.status === 'visible')
  }))
)

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
    imageShape: imageShape.value,
    offerStyle: offerStyle.value,
    allergenIconStyle: allergenIconStyle.value,
    getAllergenIconSymbol: getAllergenIconSymbol.value,
    getAllergenIconStyle: getAllergenIconStyle.value
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
  try {
    await Promise.all([
      fontStore.initFontOptions(),
      currencyStore.initCurrencyOptions(),
      layoutStore.loadLayout(),
      offerStyleStore.loadOfferStyle(),
      allergenStyleStore.initAllergenStyleOptions(),
      socialStore.load(),
      loadFinalData()
    ])
  } catch (error) {
    console.error("Failed to initialize menu preview:", error)
  } finally {
    isLoading.value = false
  }
})
</script>
<style scoped>
.menu-preview-frame {
  position: relative;
  padding: 1rem;
  background-color: var(--cardBackground-bg, #f9f9f9);
}

.menu-section {
  margin-bottom: 1rem;
}

.section-title {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--sectionTitleText-color, #000);
  font-family: var(--font-family);
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
  font-family: var(--font-family);
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
  color: var(--offerLabel-color, #007bff);
  margin-top: 0.2rem;
}

:global(.riyal-icon) {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  margin-inline-start: 0.2em;
}

.floating-buttons {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  z-index: 1000;
}

.contact-buttons-row {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 1000;
}

.top-contact-bar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  border-bottom: 1px solid #eee;
}

.menu-separator {
  height: 1rem;
  background-color: var(--cardBackground-bg, #f9f9f9);
}
</style>
