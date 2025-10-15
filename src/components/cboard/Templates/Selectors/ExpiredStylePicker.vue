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
  font-family: 'Tajawal', sans-serif;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.expired-style-dropdown {
  flex: 0 0 180px;
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  border-radius: 6px;
  border: 1px solid #E0E0E0;
  background-color: #FFFFFF;
  color: #1C1C1C;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.expired-style-dropdown:focus {
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
  outline: none;
}

.expired-preview {
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
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  background-color: #fff;
  color: #1C1C1C;
}

/* ✅ نمط الإخفاء الكامل */
.preview-box.hide {
  visibility: hidden;
  height: 0;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

/* ✅ نمط الشارة الصغيرة */
.preview-box.badge .product-name::after {
  content: 'منتهي';
  background: #FF7A00;
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  margin-left: 0.5rem;
}

/* ✅ نمط الشطب */
.preview-box.strike .product-name,
.preview-box.strike .product-price {
  text-decoration: line-through;
  color: #999;
}
</style>
