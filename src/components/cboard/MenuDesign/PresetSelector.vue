<template>
  <!-- ✅ القسم الأول: النماذج الجاهزة (دائمًا فعال) -->
  <div class="section-block">
    <ReadyPresets class="preset-row" />
  </div>

  <!-- فاصل بين القسمين -->
  <div class="section-divider"></div>

  <!-- ✅ القسم الثاني: التخطيط + اختيار الألوان -->
  <div class="section-block">
    <!-- زر تعطيل/تفعيل القسم الثاني -->
    <button @click="toggleColors" class="button-unified button-toggle">
      {{ colorsEnabled ? 'تعطيل القسم' : 'تفعيل القسم' }}
    </button>

    <!-- التخطيط -->
    <LayoutEditor class="preset-row" :class="{ disabled: !colorsEnabled }" />

    <!-- اختيار نمط الألوان -->
    <label for="preset-select" class="preset-label">اختيار نمط الألوان</label>
    <div class="preset-row" :class="{ disabled: !colorsEnabled }">
      <select
        id="preset-select"
        v-model="selectedPreset"
        @change="applyPreset(selectedPreset)"
        class="dropdown-unified"
        :disabled="!colorsEnabled"
      >
        <option disabled value="">اختر نمط الألوان</option>

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
      <button @click="resetPreset" class="button-unified button-reset" :disabled="!colorsEnabled">
        إعادة ضبط الألوان
      </button>
      <button @click="setAsDefault" class="button-unified button-default" :disabled="!colorsEnabled">
        تعيين كافتراضي
      </button>
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
import LayoutEditor from '@/components/cboard/MenuDesign/LayoutEditor.vue'
import ReadyPresets from '@/components/cboard/MenuDesign/ReadyPresets.vue'
import '@/components/cboard/MenuDesign/common.css'

const defaultPreset = ref<ColorPresetName | null>(null)
const selectedPreset = ref<ColorPresetName>('مخصص 1')
const colorStore = useColorEditorStore()

// ✅ يبدأ معطل تلقائيًا للقسم الثاني فقط
const colorsEnabled = ref(false)

async function applyPreset(name: ColorPresetName) {
  if (!colorsEnabled.value) return
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
  if (!colorsEnabled.value) return
  await colorStore.resetPreset(selectedPreset.value)
}

async function setAsDefault() {
  if (!colorsEnabled.value) return
  await indexedDBService.saveSetting('activeColorPreset', selectedPreset.value)
  defaultPreset.value = selectedPreset.value
}

function toggleColors() {
  colorsEnabled.value = !colorsEnabled.value
}

onMounted(async () => {
  const saved = await indexedDBService.getSetting('activeColorPreset')
  if (saved) defaultPreset.value = saved
})
</script>

<style scoped>
.section-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-divider {
  border-top: 1px solid #ccc;
  margin: 1rem 0;
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
}

/* زر التعطيل/التفعيل */
.button-toggle {
  background: #f0f0f0;
  color: #333;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  transition: background 0.2s ease, transform 0.2s ease;
}

.button-toggle:hover {
  background: #e0e0e0;
  transform: scale(1.02);
}
</style>
