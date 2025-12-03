<template>
  <div class="preset-selector">
    <label for="preset-select">
      {{ t('cboard.menuDesign.colorEditor.presetLabel') }}
    </label>
    <div class="preset-row">
      <select
        id="preset-select"
        v-model="selectedPreset"
        @change="applyPreset(selectedPreset)"
      >
        <option disabled value="">
          {{ t('cboard.menuDesign.colorEditor.presetPlaceholder') }}
        </option>

        <option
          v-if="defaultPreset && colorPresets[defaultPreset]"
          :value="defaultPreset"
        >
          {{ t('cboard.menuDesign.colorEditor.defaultPresetPrefix') }}{{ defaultPreset }}
        </option>

        <template v-for="[name] in Object.entries(colorPresets)">
          <option
            v-if="name !== defaultPreset"
            :key="name"
            :value="name"
          >
            {{ t(`cboard.menuDesign.colorEditor.presets.${name}`, name) }}
          </option>
        </template>
      </select>

      <!-- أزرار التحكم -->
      <button @click="showResetConfirm = true" class="reset-button">⟳</button>
      <button @click="showConfirm = true" class="default-button">⭐</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { indexedDBService } from '@/services/indexedDBService'
import { colorPresets } from '@/types/contexts/colorPresets1.ts'
import type { ColorPresetName } from '@/types/contexts/colorPresets1.ts'
import { useColorEditorStore } from '@/stores/cboard/MenuDesign/ColorEditorStore.ts'

const defaultPreset = ref<ColorPresetName | null>(null)
const showConfirm = ref(false)
const showResetConfirm = ref(false)
const selectedPreset = ref<ColorPresetName>('مخصص 1')
const colorStore = useColorEditorStore()

async function applyPreset(name: ColorPresetName) {
  const preset = colorPresets[name]
  if (!preset) return
  colorStore.setColors({
    headerBackground: preset.background,
    sectionBackground: preset.background,
    cardBackground: preset.background,
    titleText: preset.text,
    priceText: preset.text,
    descriptionText: preset.text,
    sectionTitleText: preset.text,
    currencyIcon: preset.primary,
    expiredProductIcon: preset.secondary,
    bodyBackground: preset.background,
    productBackground: preset.background,
    priceBackground: preset.secondary,
    currencyBackground: preset.primary,
    allergenIcon: preset.secondary,
    offerLabel: preset.primary
  })
  await colorStore.saveColors(name)
}

async function resetPreset() {
  await colorStore.resetPreset(selectedPreset.value)
}

async function setAsDefault() {
  await indexedDBService.saveSetting('activeColorPreset', selectedPreset.value)
  defaultPreset.value = selectedPreset.value
}

onMounted(async () => {
  const saved = await indexedDBService.getSetting('activeColorPreset')
  if (saved) defaultPreset.value = saved
})
</script>
<style scoped>
.preset-selector {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-family: 'Tajawal', sans-serif;
}

/* العنوان */
.preset-selector label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
}

/* صف الاختيار + الأزرار */
.preset-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* القائمة المنسدلة */
.preset-selector select {
  flex: 1;
  padding: 0.55rem 0.7rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
  background: #fff;
  color: #1C1C1C;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.preset-selector select:focus {
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255,122,0,0.2);
  outline: none;
}

/* أزرار التحكم */
.reset-button,
.default-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #888;
  padding: 0.3rem 0.4rem;
  transition: color 0.2s ease, transform 0.2s ease;
}

.reset-button:hover {
  color: #FF7A00;   /* برتقالي عند المرور */
  transform: scale(1.1);
}

.default-button:hover {
  color: #007bff;   /* أزرق عند المرور */
  transform: scale(1.1);
}
</style>
