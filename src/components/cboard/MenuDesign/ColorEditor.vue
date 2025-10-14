<template>
  <div class="color-editor">
    <h5>{{ t('colorsSection') }}</h5>

    <!-- اختيار نمط جاهز -->
    <div class="preset-selector">
      <label for="preset-select">اختر نمط الألوان:</label>
      <div class="preset-row">
        <select
          id="preset-select"
          v-model="selectedPreset"
          @change="applyPreset(selectedPreset)"
        >
          <option disabled value="">-- اختر نمطاً --</option>
          <option
            v-for="(preset, name) in colorPresets"
            :key="name"
            :value="name"
          >
            {{ name }}
          </option>
        </select>

        <!-- زر إعادة ضبط -->
        <button @click="resetPreset" class="reset-button" title="إعادة ضبط">
          ⟳
        </button>
        <button @click="setAsDefault" class="default-button" title="تعيين كافتراضي">
  ⭐
</button>

      </div>
    </div>

    <!-- اختيار نوع التخصيص -->
    <div class="group-selector">
      <button
        :class="{ active: selectedGroup === 'text' }"
        @click="selectedGroup = 'text'"
      >
        🎨 النصوص
      </button>
      <button
        :class="{ active: selectedGroup === 'icons' }"
        @click="selectedGroup = 'icons'"
      >
        🧩 الرموز
      </button>
      <button
        :class="{ active: selectedGroup === 'backgrounds' }"
        @click="selectedGroup = 'backgrounds'"
      >
        🖼️ الخلفيات
      </button>
    </div>

    <!-- عرض المكون المناسب حسب الاختيار -->
    <TextColors v-if="selectedGroup === 'text'" />
    <IconColors v-if="selectedGroup === 'icons'" />
    <BackgroundColors v-if="selectedGroup === 'backgrounds'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { t } from '@/translations'
import { indexedDBService } from '@/services/indexedDBService'

import TextColors from './TextColors.vue'
import IconColors from './IconColors.vue'
import BackgroundColors from './BackgroundColors.vue'

import { colorPresets } from '@/types/contexts/colorPresets'
import type { ColorPresetName } from '@/types/contexts/colorPresets'
import { useColorEditorStore } from '@/stores/cboard/MenuDesign/ColorEditorStore'

const selectedGroup = ref<'text' | 'icons' | 'backgrounds'>('text')
const selectedPreset = ref<ColorPresetName>('مخصص 1')
const colorStore = useColorEditorStore()

function applyPreset(name: ColorPresetName) {
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

  colorStore.saveColors()
}

function resetPreset() {
  applyPreset(selectedPreset.value)
}
async function setAsDefault() {
  await indexedDBService.saveSetting('activeColorPreset', selectedPreset.value)
}

</script>

<style scoped>
.color-editor {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ✅ تنسيق القائمة المنسدلة */
.preset-selector {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.preset-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.preset-selector select {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

/* ✅ زر إعادة ضبط */
.reset-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #888;
  padding: 0.2rem 0.4rem;
}

.reset-button:hover {
  color: #FF7A00;
}

/* ✅ أزرار التخصيص */
.group-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.group-selector button {
  padding: 0.4rem 0.8rem;
  border: 1px solid #ccc;
  background: #f9f9f9;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
}

.group-selector button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}
.default-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #888;
  padding: 0.2rem 0.4rem;
}

.default-button:hover {
  color: #007bff;
}

</style>
