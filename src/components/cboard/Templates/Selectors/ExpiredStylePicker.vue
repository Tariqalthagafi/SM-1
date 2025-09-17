<template>
  <div class="expired-style-selector">
    <label for="expired-style-select">نمط العنصر المنتهي:</label>
    <div class="row">
      <select
        id="expired-style-select"
        v-model="localSelected"
        @change="emitSelection"
        class="expired-style-dropdown"
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
      <div class="expired-preview">
        <div class="preview-box" :class="localSelected">
          <span class="product-name">منتج منتهي</span>
          <span class="product-price">35 ر.س</span>
        </div>
        <small>معاينة النمط</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, withDefaults } from 'vue'
import type { ExpiredStyle } from '@/types/contexts/templates'

const props = withDefaults(defineProps<{
  selected: ExpiredStyle
  options: { value: ExpiredStyle; label?: string }[]
}>(), {
  selected: 'strike',
  options: () => []
})

const emit = defineEmits<{
  (e: 'update:selected', value: ExpiredStyle): void
}>()

const localSelected = ref<ExpiredStyle>(
  props.options.some(opt => opt.value === props.selected)
    ? props.selected
    : props.options[0]?.value || 'strike'
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
.expired-style-selector {
  padding: 1rem 0;
}

.row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.expired-style-dropdown {
  flex: 0 0 160px;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
}

.expired-preview {
  flex: 1;
  text-align: center;
}

.preview-box {
  padding: 0.6rem;
  border-radius: 6px;
  text-align: center;
  font-size: 0.9rem;
  border: 1px dashed #ccc;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

/* أنماط المعاينة */
.preview-box.strike .product-name {
  text-decoration: line-through;
  color: #999;
}

.preview-box.badge .product-name::after {
  content: 'منتهي';
  background: #ff5252;
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  margin-left: 0.5rem;
}

.preview-box.overlay::before {
  content: 'منتهي';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 82, 82, 0.8);
  color: white;
  font-weight: bold;
  padding: 0.2rem;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
</style>
