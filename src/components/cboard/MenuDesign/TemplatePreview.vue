<template>
  <div v-if="sections.length && products.length">
    <h4>معاينة القالب</h4>

    <div class="preview-frame">
      <div v-for="section in sections" :key="section.id" class="menu-section">
        <h5 class="section-title">{{ section.name }}</h5>

        <div class="products" :class="layoutClass">
          <div
            v-for="product in products.filter(p => p.sectionId === section.id && p.status === 'visible')"
            :key="product.id"
            class="product-item"
          >
            <span class="product-name">{{ product.name }}</span>
            <span class="product-price">
              <span v-if="product.finalPrice !== product.basePrice" class="old-price">
                {{ product.basePrice }} {{ currencySymbol }}
              </span>
              <span class="final-price">
                {{ product.finalPrice }} {{ currencySymbol }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <p v-else>جاري تحميل المعاينة...</p>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'
import { useColorEditorStore } from '@/stores/cboard/MenuDesign/ColorEditorStore'
import { useLayoutEditorStore } from '@/stores/cboard/MenuDesign/LayoutEditor'

const sections = ref<any[]>([])
const products = ref<any[]>([])

const colorStore = useColorEditorStore()
const layoutStore = useLayoutEditorStore()

const layoutClass = computed(() => {
  switch (layoutStore.layout) {
    case 'grid': return 'layout-grid'
    case 'vertical': return 'layout-vertical'
    case 'cards': return 'layout-cards'
    case 'sectioned': return 'layout-sectioned'
    default: return 'layout-default'
  }
})

const currencySymbol = ref('ر.س')

function applySettingsToCSS(colors: Record<string, string>) {
  const root = document.documentElement

  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}-bg`, value)
    root.style.setProperty(`--${key}-color`, value)
  })

  root.style.setProperty('--font-family', 'Cairo') // ثابت مؤقتًا أو من ستور لاحقًا
}

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

onMounted(() => {
  loadStaticData()
  applySettingsToCSS(colorStore.colors)
})

watchEffect(() => {
  applySettingsToCSS(colorStore.colors)
})
</script>


<style scoped>
.preview-frame {
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
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
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
  background: var(--cardBackground-bg, #f9f9f9);
  color: var(--titleText-color, #000);
  padding: 0.6rem;
  border-radius: 6px;
  text-align: center;
  font-size: 0.85rem;
  font-family: var(--font-family, 'Cairo');
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
  margin-right: 0.3rem;
}

.final-price {
  font-weight: bold;
}
</style>
