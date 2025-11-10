<template>
  <div class="layout-editor">
    <h5>{{ t('cboard.menuDesign.layoutEditor.title') }}</h5>
    <select v-model="selectedLayout">
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
import type { MenuLayout } from '@/types/contexts/menuDesign.ts'
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
  { value: 'vertical'},
  { value: 'grid'},
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
  gap: 0.75rem;
}

select {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
}
</style>
