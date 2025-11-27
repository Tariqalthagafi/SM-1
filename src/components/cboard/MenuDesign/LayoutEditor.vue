<template>
  <div class="customizer-section">
    <label class="customizer-label">{{ t('cboard.menuDesign.layoutEditor.title') }}</label>
    <select v-model="selectedLayout" class="dropdown-field">
      <option
        v-for="layout in layoutOptions"
        :key="layout.value"
        :value="layout.value"
      >
        {{ t(`cboard.menuDesign.layouts.${layout.value}`) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useLayoutEditorStore } from '@/stores/cboard/MenuDesign/LayoutEditor.ts'
import type { MenuLayout } from '@/types/contexts/menuDesign1.ts'
import { useTemplateSettingsStore } from '@/stores/cboard/templates/templateSettingsStore.ts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const templateSettingsStore = useTemplateSettingsStore()
const store = useLayoutEditorStore()

onMounted(() => {
  store.loadLayout()
})

const selectedLayout = computed({
  get: () => store.layout,
  set: (val: MenuLayout) => {
    store.setLayout(val)
    store.saveLayout()
    templateSettingsStore.saveToSupabase()
  }
})

const layoutOptions: { value: MenuLayout; label?: string }[] = [
  { value: 'vertical' },
  { value: 'grid' },
  { value: 'cards' },
  { value: 'sectioned' },
  { value: 'sidebarCategories' },
  { value: 'gridCategories' },
  { value: 'pagedCategories' }
]
</script>
