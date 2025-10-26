<template>
  <div class="offer-style-selector">
    <label for="offer-style-select">نمط العرض:</label>
    <div class="row">
      <select
        id="offer-style-select"
        v-model="localSelected"
        @change="emitSelection"
        class="offer-style-dropdown"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label || option.value }}
        </option>
      </select>

      <!-- معاينة مصغرة -->
      <div class="offer-preview">
        <div class="preview-box" :class="localSelected">
          <span class="product-name">منتج تجريبي</span>

          <template v-if="localSelected === 'strikeOnly'">
            <span class="product-price">
              <span class="old"> ~{{ originalPrice }} ر.س~ </span>
              <span class="new">{{ newPrice }} ر.س</span>
            </span>
          </template>

          <template v-else-if="localSelected === 'strikeWithSaving'">
            <span class="product-savings">🔥 وفر {{ savingAmount }} ر.س</span>
            <span class="product-price">
              <span class="old"> ~{{ originalPrice }} ر.س~ </span>
              <span class="new">{{ newPrice }} ر.س</span>
            </span>
          </template>

          <template v-else-if="localSelected === 'strikeWithBadge'">
            <span class="discount-badge">🔖 -{{ discountPercent }}%</span>
            <span class="product-price">
              <span class="old"> ~{{ originalPrice }} ر.س~ </span>
              <span class="new">{{ newPrice }} ر.س</span>
            </span>
          </template>

        </div>
        <small>معاينة النمط</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, withDefaults, computed } from 'vue'
import type { OfferStyle } from '@/types/contexts/templates'

const props = withDefaults(defineProps<{
  selected: OfferStyle
  options: { value: OfferStyle; label?: string }[]
  originalPrice: number
  newPrice: number
}>(), {
  selected: 'strikeOnly',
  options: () => [],
  originalPrice: 60,
  newPrice: 25
})

const emit = defineEmits<{
  (e: 'update:selected', value: OfferStyle): void
}>()

const localSelected = ref<OfferStyle>(
  props.options.some(opt => opt.value === props.selected)
    ? props.selected
    : props.options[0]?.value || 'strikeOnly'
)

watch(() => props.selected, (newVal) => {
  if (props.options.some(opt => opt.value === newVal)) {
    localSelected.value = newVal
  }
})

function emitSelection() {
  emit('update:selected', localSelected.value)
}

const savingAmount = computed(() => props.originalPrice - props.newPrice)
const discountPercent = computed(() =>
  Math.round((savingAmount.value / props.originalPrice) * 100)
)
</script>

<style scoped>
.offer-style-selector {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: 'Tajawal', sans-serif;
}

label {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
  color: #FF7A00;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.offer-style-dropdown {
  flex: 0 0 180px;
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  border-radius: 6px;
  border: 1px solid #E0E0E0;
  background-color: #FFFFFF;
  color: #1C1C1C;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.offer-style-dropdown:focus {
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
  outline: none;
}

.offer-preview {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 160px;
}

.preview-box {
  padding: 0.6rem;
  border-radius: 6px;
  text-align: center;
  font-size: 0.9rem;
  border: 1px dashed #E0E0E0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  background-color: #fff;
  color: #1C1C1C;
}

.product-name {
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.preview-box.strikeOnly .product-price,
.preview-box.strikeWithSaving .product-price,
.preview-box.strikeWithBadge .product-price,
.preview-box.strikeInline .product-price {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  justify-content: center;
}

.old {
  text-decoration: line-through;
  color: #999;
}

.new {
  font-weight: bold;
  color: #2e7d32;
}

.product-savings {
  font-size: 0.8rem;
  color: #FF7A00;
  font-weight: 500;
  margin-bottom: 0.3rem;
}

.discount-badge {
  background-color: #FF7A00;
  color: white;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
  margin-bottom: 0.3rem;
  display: inline-block;
}

.preview-box.badgeWithNewPrice {
  background-color: #fff8e1;
  border: 1px solid #FF7A00;
}

.preview-box.badgeWithNewPrice .product-price::before {
  content: "🔖 ";
  color: #FF7A00;
  font-weight: bold;
}

.preview-box.stackedPrice .product-price {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.preview-box.stackedPrice .old {
  text-decoration: line-through;
  color: #999;
  font-size: 0.85rem;
}

.preview-box.stackedPrice .new {
  font-weight: bold;
  color: #2e7d32;
}

.preview-box.badgeDiscount .product-price {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.preview-box.badgeDiscount .badge {
  background-color: #FF7A00;
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-weight: bold;
}
</style>
