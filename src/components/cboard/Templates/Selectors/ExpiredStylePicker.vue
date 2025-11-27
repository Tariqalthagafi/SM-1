<template>
  <div class="customizer-section">
    <label for="expired-style-select" class="customizer-label">
      {{ t('cboard.templates.selectors.expiredStyle.label') }}
    </label>
    <select
      id="expired-style-select"
      v-model="localSelected"
      @change="emitSelection"
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
    <div class="expired-preview">
      <div class="preview-box" :class="localSelected">
        <span
          class="product-name"
          :data-badge="t('cboard.templates.selectors.expiredStyle.sample.badge')"
        >
          {{ t('cboard.templates.selectors.expiredStyle.sample.name') }}
        </span>
        <span class="product-price">
          {{ t('cboard.templates.selectors.expiredStyle.sample.price') }}
        </span>
      </div>
      <small>{{ t('cboard.templates.selectors.expiredStyle.preview') }}</small>
    </div>
    -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch, withDefaults } from 'vue'
import type { ExpiredStyle } from '@/types/contexts/templates1.ts'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

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
