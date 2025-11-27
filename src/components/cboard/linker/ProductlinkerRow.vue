<template>
  <div class="product-card">
    <!-- اسم المنتج -->
    <div class="field">
      <label>{{ t('cboard.linker.row.fields.productName') }}</label>
      <strong>{{ product.name }}</strong>
    </div>

    <!-- اختيار القسم -->
    <div class="field">
      <label>{{ t('cboard.linker.row.fields.section') }}</label>
      <SectionSelector
        :selectedId="product.section_id ?? ''"
        @select="handleSectionChange"
      />
    </div>

    <!-- السعر الأساسي -->
    <div class="field">
      <label>{{ t('cboard.linker.row.fields.basePrice') }}</label>
      <input
        type="number"
        v-model.number="localBasePrice"
        min="0"
        @blur="save"
      />
    </div>

    <!-- العرض المطبق -->
    <div class="field">
      <label>{{ t('cboard.linker.row.fields.offer') }}</label>
      <OfferSelector
        v-model="localSelectedOfferId"
        @change="save"
      />
    </div>

    <!-- السعر بعد العرض -->
    <div class="field">
      <label>{{ t('cboard.linker.row.fields.finalPrice') }}</label>
      <PricePreview
        :basePrice="localBasePrice || 0"
        :offerId="localSelectedOfferId ?? ''"
      />
    </div>

    <!-- الحالة -->
    <div class="field">
      <label>{{ t('cboard.linker.row.fields.status') }}</label>
      <select v-model="localStatus" @change="save">
        <option value="visible">{{ t('cboard.linker.row.status.visible') }}</option>
        <option value="hidden">{{ t('cboard.linker.row.status.hidden') }}</option>
        <option value="expired">{{ t('cboard.linker.row.status.expired') }}</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '@/types/contexts/products1.ts'
import SectionSelector from './SectionSelector.vue'
import OfferSelector from './OfferSelector.vue'
import PricePreview from './PricePreview.vue'
import { useI18n } from 'vue-i18n'
import { supabase } from '@/supabase'

const { t } = useI18n()

const props = defineProps<{ product: Product }>()

const localBasePrice = ref(props.product.base_price ?? 0)
const localSelectedOfferId = ref(props.product.selected_offer_id ?? '')
const localStatus = ref(props.product.status ?? 'visible')

async function handleSectionChange(newSectionId: string) {
  const { error } = await supabase
    .from('products')
    .update({ section_id: newSectionId })
    .eq('id', props.product.id)

  if (error) console.error(error)
}

async function save() {
  const { error } = await supabase
    .from('products')
    .update({
      base_price: localBasePrice.value,
      selected_offer_id: localSelectedOfferId.value || null,
      status: localStatus.value
    })
    .eq('id', props.product.id)

  if (error) console.error(error)
}
</script>


<style scoped>
.product-card {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  background-color: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
  font-family: 'Tajawal', sans-serif;
  margin-bottom: 0.75rem; /* ✅ المسافة بين البطاقات */
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
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

/* دعم الجوال */
@media (max-width: 768px) {
  .product-card {
    padding: 0.75rem;
  }
  .field {
    width: 100%;
  }
}
</style>
