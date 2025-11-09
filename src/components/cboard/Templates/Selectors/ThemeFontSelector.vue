<template>
  <div class="font-selector">
    <label for="font-select">{{ t('cboard.templates.selectors.font.label') }}</label>
    <div class="row">
      <select
        id="font-select"
        v-model="localFont"
        @change="emitFont"
        class="font-dropdown"
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

      <!-- معاينة مصغرة -->
      <div class="font-preview" :style="{ fontFamily: localFont }"> {{ t('cboard.templates.selectors.font.preview') }} </div>
    </div>
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

// إرسال التحديث للخارج
function emitFont() {
  emit('update:selectedFont', localFont.value)
}
</script>

<style scoped>
.font-selector {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: var(--font-family);
}

label {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
  color: #FF7A00;
  font-family: var(--font-family);
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.font-dropdown {
  flex: 0 0 200px;
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  border-radius: 6px;
  border: 1px solid #E0E0E0;
  background-color: #FFFFFF;
  color: #1C1C1C;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.font-dropdown:focus {
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
  outline: none;
}

.font-preview {
  flex: 1;
  padding: 0.6rem;
  background-color: #FFFFFF;
  border-radius: 6px;
  border: 1px dashed #E0E0E0;
  text-align: center;
  font-size: 1.2rem;
  color: #1C1C1C;
}
</style>
