<template>
  <div class="customizer-section">
    <label for="font-select" class="customizer-label">
      {{ t('cboard.templates.selectors.font.label') }}
    </label>
    <select
      id="font-select"
      v-model="localFont"
      @change="emitFont"
      class="dropdown-field"
    >
      <option
        v-for="font in props.fonts"
        :key="font.value"
        :value="font.value"
        :style="{ fontFamily: font.value }"
      >
        {{ font.label || font.value }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps<{
  selectedFont: string,
  fonts: { value: string; label?: string }[]
}>()

const emit = defineEmits<{
  (e: 'update:selectedFont', font: string): void
}>()

const localFont = ref(props.selectedFont)

watch(() => props.selectedFont, (newFont) => {
  localFont.value = newFont
})

function emitFont() {
  emit('update:selectedFont', localFont.value)
}
</script>
