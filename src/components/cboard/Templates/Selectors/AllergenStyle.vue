<template>
  <div class="allergen-style-selector">
    <label for="allergen-style-select">نمط رمز الحساسية:</label>
    <div class="row">
      <select
        id="allergen-style-select"
        v-model="localStyle"
        @change="emitStyle"
        class="allergen-style-dropdown"
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
      <div class="allergen-preview">
        <span
          class="allergen-icon"
          :class="localStyle"
          :style="getIconStyle(localStyle)"
        >
          🅰
        </span>
        <small>معاينة الرمز</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, withDefaults } from 'vue'
import type { AllergenIconStyle } from '@/types/contexts/templates'

const props = withDefaults(defineProps<{
  selected: AllergenIconStyle
  options: { value: AllergenIconStyle; label?: string }[]
}>(), {
  selected: 'colored',
  options: () => []
})

const emit = defineEmits<{
  (e: 'update:selected', value: AllergenIconStyle): void
}>()

const localStyle = ref<AllergenIconStyle>(
  props.options.some(opt => opt.value === props.selected)
    ? props.selected
    : props.options[0]?.value || 'colored'
)

watch(() => props.selected, (newVal) => {
  if (props.options.some(opt => opt.value === newVal)) {
    localStyle.value = newVal
  }
})

function emitStyle() {
  emit('update:selected', localStyle.value)
}

function getIconStyle(style: AllergenIconStyle) {
  if (style === 'colored') return { color: '#ff0000' }
  if (style === 'hidden') return {}
  return { color: '#666' }
}
</script>

<style scoped>
.allergen-style-selector {
  padding: 1rem 0;
}

.row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.allergen-style-dropdown {
  flex: 0 0 160px;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
}

.allergen-preview {
  flex: 1;
  text-align: center;
}

.allergen-icon {
  font-size: 1.5rem;
  display: inline-block;
  margin-bottom: 0.3rem;
}

/* أنماط المعاينة */
.allergen-icon.colored {
  color: #ff0000;
}

.allergen-icon.outlined {
  border: 1px solid #ff0000;
  padding: 0.2rem;
  border-radius: 4px;
}

.allergen-icon.monochrome {
  color: #666;
}

.allergen-icon.hidden {
  display: none;
}
</style>
