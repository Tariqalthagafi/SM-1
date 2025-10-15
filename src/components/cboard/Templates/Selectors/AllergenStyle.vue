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
          {{ getIconSymbol(localStyle) }}
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
  selected: 'boxedA',
  options: () => []
})

const emit = defineEmits<{
  (e: 'update:selected', value: AllergenIconStyle): void
}>()

const localStyle = ref<AllergenIconStyle>(
  props.options.some(opt => opt.value === props.selected)
    ? props.selected
    : props.options[0]?.value || 'boxedA'
)

watch(() => props.selected, (newVal) => {
  if (props.options.some(opt => opt.value === newVal)) {
    localStyle.value = newVal
  }
})

function emitStyle() {
  emit('update:selected', localStyle.value)
}

function getIconSymbol(style: AllergenIconStyle): string {
  switch (style) {
    case 'boxedA':
    case 'colored':
    case 'outlined':
      return '🅰'
    case 'boldA':
      return 'A'
    case 'warningTriangle':
      return '⚠'
    case 'monochrome':
      return 'A'
    case 'hidden':
      return ''
    default:
      return '?'
  }
}

function getIconStyle(style: AllergenIconStyle) {
  switch (style) {
    case 'boxedA':
    case 'colored':
      return { color: '#ff0000' }
    case 'boldA':
      return { fontWeight: 'bold', color: '#666' }
    case 'warningTriangle':
      return { color: '#FF7A00' }
    case 'outlined':
      return {
        border: '1px solid #ff0000',
        padding: '0.2rem',
        borderRadius: '4px',
        color: '#ff0000'
      }
    case 'monochrome':
      return { color: '#666' }
    case 'hidden':
      return { display: 'none' }
    default:
      return { color: '#999' }
  }
}
</script>

<style scoped>
.allergen-style-selector {
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

.allergen-style-dropdown {
  flex: 0 0 180px;
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  border-radius: 6px;
  border: 1px solid #E0E0E0;
  background-color: #FFFFFF;
  color: #1C1C1C;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.allergen-style-dropdown:focus {
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
  outline: none;
}

.allergen-preview {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
}

.allergen-icon {
  font-size: 1.5rem;
  display: inline-block;
  margin-bottom: 0.3rem;
}
</style>
