<template>
  <div class="customizer-section">
    <label for="allergen-style-select" class="customizer-label">
      {{ t('cboard.templates.selectors.allergenStyle.label') }}
    </label>
    <select
      id="allergen-style-select"
      v-model="localStyle"
      @change="emitStyle"
      class="dropdown-field"
    >
      <option
        v-for="option in props.options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label || option.value }}
      </option>
    </select>

    <!-- معاينة مصغرة (اختياري) -->
    <!--
    <div class="allergen-preview">
      <span
        class="allergen-icon"
        :class="localStyle"
        :style="allergenStyleStore.getIconStyle(localStyle)" 
      >
        {{ allergenStyleStore.getIconSymbol(localStyle) }}
      </span>
      <small>{{ t('cboard.templates.selectors.allergenStyle.preview') }}</small>
    </div>
    -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch, withDefaults } from 'vue'
import type { AllergenIconStyle } from '@/types/contexts/templates1.ts'
import { useAllergenStyleStore } from '@/stores/cboard/templates/allergenStyleStore.ts'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const allergenStyleStore = useAllergenStyleStore()

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

const localStyle = ref<AllergenIconStyle>(props.selected)

watch(() => props.selected, (newVal) => {
  localStyle.value = newVal
})

function emitStyle() {
  emit('update:selected', localStyle.value)
}
</script>
