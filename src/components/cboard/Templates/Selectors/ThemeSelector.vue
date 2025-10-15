<template>
  <div class="theme-selector-dropdown">
    <select id="templateSelect" v-model="selected" @change="onTemplateChange">
      <!-- الخيار الافتراضي -->
      <option value="">اختر القالب</option>

      <!-- باقي القوالب -->
      <option
        v-for="template in templatesList"
        :key="template.id"
        :value="template.id"
      >
        {{ template.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { menuTemplates } from '@/stores/cboard/theme/templates/templatesConfig'
import { usePreviewManager } from '@/stores/cboard/theme/templates/previewManager'
import type { TemplateConfig } from '@/types/contexts/templates'

const props = defineProps<{ preset: 'custom1' | 'custom2' }>()
const previewManager = usePreviewManager()

// قائمة القوالب
const templatesList = computed<TemplateConfig[]>(() => {
  return Object.values(menuTemplates) || []
})

// القيمة المختارة
const selected = ref('')

// القالب الحالي للمخصص
const currentTemplate = computed(() => {
  return previewManager.presets?.[props.preset]?.template || null
})

// تزامن القيمة المختارة مع القالب الحالي فورًا
watch(
  currentTemplate,
  (newTemplate) => {
    selected.value = newTemplate?.id || ''
  },
  { immediate: true }
)

// إعادة تعيين القالب
function resetPresetTemplate() {
  const presetData = previewManager.presets?.[props.preset]
  if (presetData) {
    presetData.template = null
    presetData.defaultSettings = null
    previewManager.saveToStorage()
  }
}

// عند تغيير القالب
function onTemplateChange() {
  if (selected.value) {
    previewManager.loadTemplateForPreset(props.preset, selected.value)
  } else {
    resetPresetTemplate()
  }
}
</script>

<style scoped>
.theme-selector-dropdown {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: 'Tajawal', sans-serif;
  width: 100%;
}

label {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
  color: #FF7A00;
  font-family: 'Tajawal', sans-serif;
}

select {
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  border: 1px solid #E0E0E0;
  font-size: 0.85rem;
  background-color: #FFFFFF;
  color: #1C1C1C;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
}

select:focus {
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
  outline: none;
}

</style>
