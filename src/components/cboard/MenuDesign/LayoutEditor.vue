<template>
  <div class="layout-editor">
    <label class="layout-label">
      {{ t('cboard.menuDesign.layoutEditor.title') }}
    </label>
    <select v-model="selectedLayout" class="dropdown-unified">
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
import '@/components/cboard/MenuDesign/common.css'

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

<style scoped>
.layout-editor {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.layout-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
}

/* ✅ نفس ستايل قائمة الألوان */
.dropdown-field {
  width: 100%;
  padding: 0.6rem 0.8rem; /* نفس القيم */
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  font-weight: 600;
  background: #f9f9f9;
  color: #1C1C1C;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease;
}

.dropdown-field:hover {
  background: #f0f0f0;
}

.dropdown-field:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.2);
  outline: none;
}

</style>
