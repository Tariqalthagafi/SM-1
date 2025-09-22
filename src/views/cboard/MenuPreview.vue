<template>
  <div v-if="sections.length && products.length">
    <div class="menu-preview-frame">
      <div
        v-for="section in sections"
        :key="section.id"
        class="menu-section"
      >
        <h5 class="section-title">{{ section.name }}</h5>

        <div class="products" :class="layoutClass">
          <div
            v-for="product in products.filter(p => p.sectionId === section.id && p.status === 'visible')"
            :key="product.id"
            class="product-item"
          >
            <img
              v-if="product.imageBase64"
              :src="product.imageBase64"
              alt="صورة المنتج"
              class="product-image"
            />
            <div class="product-info">
              <span class="product-name">
                {{ product.name }}
                <span v-if="product.hasAllergens" class="allergen-icon">⚠️</span>
              </span>

              <span class="product-price">
                <span
                  v-if="product.finalPrice !== product.basePrice"
                  class="old-price"
                >
                  {{ product.basePrice }} {{ currencySymbol }}
                </span>
                <span class="final-price">
                  {{ product.finalPrice }} {{ currencySymbol }}
                </span>
              </span>

              <span v-if="product.offerLabel" class="offer-label">
                {{ product.offerLabel }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <p v-else>جاري تحميل المنيو...</p>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'

const sections = ref<any[]>([])
const products = ref<any[]>([])
const layout = ref<string>('grid')
const currencySymbol = ref('ر.س')

function applyFinalSettings(settings: any, colors: Record<string, string>) {
  const root = document.documentElement

  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}-bg`, value)
    root.style.setProperty(`--${key}-color`, value)
  })

  if (settings.fontFamily) {
    root.style.setProperty('--font-family', settings.fontFamily)
  }

  currencySymbol.value =
    settings.currencySymbol === 'svg-riyal'
      ? '﷼'
      : settings.currencySymbol || 'ر.س'

  layout.value = settings.layout_id || 'grid'
}

const layoutClass = computed(() => {
  switch (layout.value) {
    case 'grid':
      return 'layout-grid'
    case 'vertical':
      return 'layout-vertical'
    case 'cards':
      return 'layout-cards'
    case 'sectioned':
      return 'layout-sectioned'
    default:
      return 'layout-default'
  }
})

async function loadFinalData() {
  const customization =
    (await indexedDBService.getCustomization('template')) || {}
  const colors =
    (await indexedDBService.getColors(customization.colors_ref ?? 'default')) ||
    {}

  applyFinalSettings(customization, colors)

  const offers = await indexedDBService.getAll('offers')
  sections.value = await indexedDBService.getAll('sections')
  const allProducts = await indexedDBService.getAll('products')

  products.value = allProducts.map((p: any) => {
    p.imageBase64 = typeof p.imageBase64 === 'string' ? p.imageBase64 : ''

    const offer = offers.find(
      (o: any) => o.id === p.selectedOfferId && o.isActive
    )

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

onMounted(loadFinalData)
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
</style>
