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
        :disabled="!isEditing"
      />
    </div>

    <!-- السعر الأساسي -->
    <div class="field">
      <label>السعر الأساسي:</label>
      <input
        type="number"
        v-model.number="localBasePrice"
        :disabled="!isEditing"
        min="0"
      />
    </div>

    <!-- العرض المطبق -->
    <div class="field">
      <label>العرض المطبق:</label>
      <OfferSelector
        v-model="localSelectedOfferId"
        :disabled="!isEditing"
      />
    </div>

    <!-- السعر بعد العرض -->
    <div class="field">
      <label>السعر بعد العرض:</label>
      <PricePreview
        :basePrice="localBasePrice || 0"
        :offerId="localSelectedOfferId ?? ''"
      />
    </div>

    <!-- الحالة -->
    <div class="field">
      <label>الحالة:</label>
      <select v-model="localStatus" :disabled="!isEditing">
        <option value="visible">ظاهر</option>
        <option value="hidden">مخفي</option>
        <option value="expired">منتهي</option>
      </select>
    </div>

    <!-- أزرار -->
    <div class="actions">
      <button @click="toggleEdit">
        {{ isEditing ? '💾 حفظ' : '✏️ تعديل' }}
      </button>
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

const isEditing = ref(false)
const productsStore = useProductsStore()
const sectionsStore = useSectionStore()
const offersStore = useOffersStore()

// نسخ محلية للتحرير قبل الحفظ
const localBasePrice = ref(props.product.basePrice ?? 0)
const localSelectedOfferId = ref(props.product.selectedOfferId ?? '')
const localStatus = ref(props.product.status ?? 'visible')

// تغيير القسم
function handleSectionChange(newSectionId: string) {
  const section = sectionsStore.sections.find((s: Section) => s.id === newSectionId)
  productsStore.updateProduct(props.product.id, {
    sectionId: newSectionId,
    sectionName: section?.name ?? ''
  })
}

// حفظ أو تفعيل التحرير
function toggleEdit() {
  if (isEditing.value) {
    const offer = offersStore.offers.find(o => o.id === localSelectedOfferId.value)

    productsStore.updateProduct(props.product.id, {
      basePrice: localBasePrice.value,
      selectedOfferId: localSelectedOfferId.value || undefined,
      selectedOfferTitle: offer?.title || '',
      status: localStatus.value
    })
  }
  isEditing.value = !isEditing.value
}
</script>

<style scoped>
.product-section-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  transition: box-shadow 0.3s ease;
  overflow-x: auto;
}

.product-section-row:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.field {
  display: flex;
  flex-direction: column;
  min-width: 160px;
  max-width: 200px;
  flex-shrink: 0;
}

.field label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #555;
  margin-bottom: 0.25rem;
}

.field input,
.field select {
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fdfdfd;
  transition: border-color 0.2s ease;
  width: 100%;
}

.field input[type="number"] {
  max-width: 120px;
}

.field input:focus,
.field select:focus {
  border-color: #007bff;
  outline: none;
}

.field strong {
  font-size: 0.95rem;
  font-weight: 600;
  color: #222;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: auto;
  flex-shrink: 0;
}

.actions button {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  transition: background-color 0.2s ease;
  white-space: nowrap;
}

.actions button:hover {
  background-color: #0056b3;
}
</style>
