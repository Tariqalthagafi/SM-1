<template>
  <div class="product-section-row">
    <!-- اسم المنتج -->
    <div class="field">
      <label>اسم المنتج</label>
      <strong>{{ product.name }}</strong>
    </div>

    <!-- اختيار القسم -->
    <div class="field">
      <label>القسم</label>
      <SectionSelector
        :selectedId="product.sectionId ?? ''"
        @select="handleSectionChange"
      />
    </div>

    <!-- السعر الأساسي -->
    <div class="field">
      <label>السعر الأساسي</label>
      <input
        type="number"
        v-model.number="localBasePrice"
        min="0"
        @blur="save"
      />
    </div>

    <!-- العرض المطبق -->
    <div class="field">
      <label>العرض المطبق</label>
      <OfferSelector
        v-model="localSelectedOfferId"
        @change="save"
      />
    </div>

    <!-- السعر بعد العرض -->
    <div class="field">
      <label>السعر بعد العرض</label>
      <PricePreview
        :basePrice="localBasePrice || 0"
        :offerId="localSelectedOfferId ?? ''"
      />
    </div>

    <!-- الحالة -->
    <div class="field">
      <label>الحالة</label>
      <select v-model="localStatus" @change="save">
        <option value="visible">ظاهر</option>
        <option value="hidden">مخفي</option>
        <option value="expired">منتهي</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '@/types/contexts/Products'
import type { Section } from '@/types/contexts/Sections'
import { useSectionStore } from '@/stores/cboard/sections'
import { useProductsStore } from '@/stores/cboard/products'
import { useOffersStore } from '@/stores/cboard/offers'

import SectionSelector from './SectionSelector.vue'
import OfferSelector from './OfferSelector.vue'
import PricePreview from './PricePreview.vue'

const props = defineProps<{ product: Product }>()

const productsStore = useProductsStore()
const sectionsStore = useSectionStore()
const offersStore = useOffersStore()

const localBasePrice = ref(props.product.basePrice ?? 0)
const localSelectedOfferId = ref(props.product.selectedOfferId ?? '')
const localStatus = ref(props.product.status ?? 'visible')

function handleSectionChange(newSectionId: string) {
  const section = sectionsStore.sections.find((s: Section) => s.id === newSectionId)
  productsStore.updateProduct(props.product.id, {
    sectionId: newSectionId,
    sectionName: section?.name ?? ''
  })
}

function save() {
  const offer = offersStore.offers.find(o => o.id === localSelectedOfferId.value)
  productsStore.updateProduct(props.product.id, {
    basePrice: localBasePrice.value,
    selectedOfferId: localSelectedOfferId.value || undefined,
    selectedOfferTitle: offer?.title || '',
    status: localStatus.value
  })
}
</script>

<style scoped>
.product-section-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #E0E0E0;
  font-family: 'Tajawal', sans-serif;
}

.field {
  display: flex;
  flex-direction: column;
  width: 180px;
  flex-shrink: 0;
}

.field label {
  font-size: 0.85rem;
  font-weight: bold;
  color: #1C1C1C;
  margin-bottom: 0.25rem;
}

.field input,
.field select {
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  background-color: #FFFFFF;
  color: #1C1C1C;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field input:focus,
.field select:focus {
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
  outline: none;
}

.field strong {
  font-size: 0.9rem;
  font-weight: 600;
  color: #222;
  padding: 0.4rem 0.6rem;
  background-color: #f9f9f9;
  border-radius: 6px;
  border: 1px solid #E0E0E0;
}
</style>
