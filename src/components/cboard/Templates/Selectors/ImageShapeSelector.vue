<template>
  <div class="image-shape-selector">
    <label for="image-shape-select"> {{ t('cboard.templates.selectors.imageShape.label') }} </label>
    <div class="row">
      <select
        id="image-shape-select"
        v-model="localShape"
        @change="emitShape"
        class="image-shape-dropdown"
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
      <div class="image-preview">
        <div :class="['preview-image', localShape]"></div>
        <small> {{ t('cboard.templates.selectors.imageShape.preview') }} </small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, withDefaults } from 'vue'
import type { ImageShape } from '@/types/contexts/templates'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = withDefaults(defineProps<{
  selected: ImageShape
  options: { value: ImageShape; label?: string }[]
}>(), {
  selected: 'circle',
  options: () => []
})

const emit = defineEmits<{
  (e: 'update:selected', value: ImageShape): void
}>()

const localShape = ref<ImageShape>(
  props.options.some(opt => opt.value === props.selected)
    ? props.selected
    : props.options[0]?.value || 'circle'
)

watch(() => props.selected, (newVal) => {
  if (props.options.some(opt => opt.value === newVal)) {
    localShape.value = newVal
  }
})

function emitShape() {
  emit('update:selected', localShape.value)
}
</script>

<style scoped>
.image-shape-selector {
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

.image-shape-dropdown {
  flex: 0 0 180px;
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  border-radius: 6px;
  border: 1px solid #E0E0E0;
  background-color: #FFFFFF;
  color: #1C1C1C;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.image-shape-dropdown:focus {
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
  outline: none;
}

.image-preview {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
}

.preview-image {
  width: 80px;
  height: 80px;
  background-color: #E0E0E0;
  margin-bottom: 0.5rem;
}

/* الأشكال */
.preview-image.circle {
  border-radius: 50%;
}

.preview-image.roundedSquare {
  border-radius: 12px;
}

.preview-image.rectangle {
  width: 120px;
  height: 80px;
  border-radius: 6px;
}

.preview-image.none {
  display: none;
}

</style>
