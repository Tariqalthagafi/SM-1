<template>
  <div class="color-editor">
    

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
         <!-- عرض النمط الافتراضي أولاً -->
<option
  v-if="defaultPreset && colorPresets[defaultPreset]"
  :value="defaultPreset"
>
  ⭐ : {{ defaultPreset }}
</option>

<!-- عرض باقي الأنماط بدون تكرار الافتراضي -->
<template v-for="[name, preset] in Object.entries(colorPresets)">
  <option
    v-if="name !== defaultPreset"
    :key="name"
    :value="name"
  >
    {{ name }}
  </option>
</template>

        </select>
        <!-- زر إعادة ضبط -->
        <button @click="showResetConfirm = true" class="reset-button" title="إعادة ضبط"> ⟳ </button>
        <button @click="showConfirm = true" class="default-button" title="تعيين كافتراضي"> ⭐ </button>

<!-- نافذة تأكيد التعيين كافتراضي -->
<div v-if="showConfirm" class="confirm-overlay">
  <div class="confirm-box">
    <h4>تأكيد التعيين</h4>
    <p>هل تريد تعيين هذا النمط كافتراضي؟</p>
    <div class="confirm-actions">
      <button class="yes-btn" @click="confirmDefault">نعم</button>
      <button class="no-btn" @click="showConfirm = false">لا</button>
    </div>
  </div>
</div>

<!-- نافذة تأكيد إعادة الضبط -->
<div v-if="showResetConfirm" class="confirm-overlay">
  <div class="confirm-box">
    <h4>تأكيد إعادة الضبط</h4>
    <p>هل تريد إعادة الألوان إلى الحالة الأصلية لهذا النمط؟</p>
    <div class="confirm-actions">
      <button class="yes-btn" @click="confirmReset">نعم</button>
      <button class="no-btn" @click="showResetConfirm = false">لا</button>
    </div>
  </div>
</div>


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

import { onMounted } from 'vue'

const defaultPreset = ref<ColorPresetName | null>(null)
const showConfirm = ref(false)
const showResetConfirm = ref(false)

const selectedGroup = ref<'text' | 'icons' | 'backgrounds'>('text')
const selectedPreset = ref<ColorPresetName>('مخصص 1')
const colorStore = useColorEditorStore()

async function applyPreset(name: ColorPresetName) {
  const preset = colorPresets[name]
  if (!preset) return

  const presetColors = {
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
  }

  colorStore.setColors(presetColors)
  await colorStore.saveColors(name)

  // ✅ حفظ النسخة الأصلية مرة واحدة فقط
  const alreadySaved = await indexedDBService.getSetting(`preset-default-${name}`)
  if (!alreadySaved) {
    await colorStore.saveDefaultPreset(name)
  }
}

async function resetPreset() {
  await colorStore.resetPreset(selectedPreset.value)
}

async function setAsDefault() {
  await indexedDBService.saveSetting('activeColorPreset', selectedPreset.value)
  defaultPreset.value = selectedPreset.value
}


async function confirmDefault() {
  await setAsDefault()
  showConfirm.value = false
}

async function confirmReset() {
  await resetPreset()
  showResetConfirm.value = false
}

onMounted(async () => {
  const saved = await indexedDBService.getSetting('activeColorPreset')
  if (saved) {
    defaultPreset.value = saved
  }
})

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

.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.confirm-box {
  background: white;
  color: black;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  text-align: center;
  width: 300px;
}

.confirm-box h4 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.confirm-box p {
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.confirm-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.yes-btn {
  background-color: #FF7A00;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.no-btn {
  background-color: #ccc;
  color: black;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

</style>
