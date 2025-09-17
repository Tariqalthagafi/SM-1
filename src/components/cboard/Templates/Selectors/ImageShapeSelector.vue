<template>
  <div class="image-shape-selector">
    <label for="image-shape-select">شكل الصورة:</label>
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
        <small>معاينة شكل الصورة</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, withDefaults } from 'vue'
import type { ImageShape } from '@/types/contexts/templates'

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
  padding: 1rem 0;
}

.row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.image-shape-dropdown {
  flex: 0 0 160px;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
}

.image-preview {
  flex: 1;
  text-align: center;
}

.preview-image {
  width: 80px;
  height: 80px;
  background-color: #ddd;
  margin: 0 auto 0.5rem;
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
