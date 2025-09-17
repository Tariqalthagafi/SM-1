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
          <span class="product-price">25 ر.س</span>
        </div>
        <small>معاينة النمط</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, withDefaults } from 'vue'
import type { OfferStyle } from '@/types/contexts/templates'

const props = withDefaults(defineProps<{
  selected: OfferStyle
  options: { value: OfferStyle; label?: string }[]
}>(), {
  selected: 'oldNewStacked',
  options: () => []
})

const emit = defineEmits<{
  (e: 'update:selected', value: OfferStyle): void
}>()

const localSelected = ref<OfferStyle>(
  props.options.some(opt => opt.value === props.selected)
    ? props.selected
    : props.options[0]?.value || 'oldNewStacked'
)

watch(() => props.selected, (newVal) => {
  if (props.options.some(opt => opt.value === newVal)) {
    localSelected.value = newVal
  }
})

function emitSelection() {
  emit('update:selected', localSelected.value)
}
</script>

<style scoped>
.offer-style-selector {
  padding: 1rem 0;
}

.row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.offer-style-dropdown {
  flex: 0 0 160px;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
}

.offer-preview {
  flex: 1;
  text-align: center;
}

.preview-box {
  padding: 0.6rem;
  border-radius: 6px;
  text-align: center;
  font-size: 0.9rem;
  border: 1px dashed #ccc;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

/* أنماط المعاينة */
.preview-box.oldNewStacked .product-name {
  font-weight: bold;
}

.preview-box.oldNewStacked .product-price {
  font-weight: bold;
  color: #2e7d32;
}

.preview-box.badgeWithNewPrice {
  background-color: #fff3cd;
  border: 1px solid #ffc107;
}

.preview-box.badgeWithNewPrice .product-price::before {
  content: "🔖 -25% ";
  color: #d32f2f;
  font-weight: bold;
}

.preview-box.inlineStrikeThrough {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
}

.preview-box.inlineStrikeThrough .product-name {
  display: none;
}

.preview-box.inlineStrikeThrough .product-price::before {
  content: " ~60 ر.س~ → ";
  text-decoration: line-through;
  color: #999;
}
</style>
