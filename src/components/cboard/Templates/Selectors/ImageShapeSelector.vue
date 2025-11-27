<template>
  <div class="customizer-section">
    <label for="image-shape-select" class="customizer-label">
      {{ t('cboard.templates.selectors.imageShape.label') }}
    </label>
    <select
      id="image-shape-select"
      v-model="localShape"
      @change="emitShape"
      class="dropdown-field"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label || option.value }}
      </option>
    </select>

    <!-- معاينة مصغرة (اختياري) -->
    <!--
    <div class="image-preview">
      <div :class="['preview-image', localShape]"></div>
      <small>{{ t('cboard.templates.selectors.imageShape.preview') }}</small>
    </div>
    -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch, withDefaults } from 'vue'
import type { ImageShape } from '@/types/contexts/templates1.ts'
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
