// 📁 src/stores/cboard/MenuDesign/LayoutEditorStore.ts

import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { MenuLayout } from '@/types/contexts/MenuDesign'
import { indexedDBService } from '@/services/indexedDBService'

export const useLayoutEditorStore = defineStore('layoutEditorStore', () => {
  const layout = ref<MenuLayout>('grid')

  function setLayout(newLayout: MenuLayout) {
    layout.value = newLayout
  }

  async function loadLayout() {
    const customization = await indexedDBService.getCustomization('template')
    if (customization?.layout_id && typeof customization.layout_id === 'string') {
      layout.value = customization.layout_id as MenuLayout
    }
  }

  async function saveLayout() {
    const customization = await indexedDBService.getCustomization('template') || { id: 'template' }
    customization.layout_id = layout.value
    await indexedDBService.saveCustomization(customization, 'template')
  }

  function resetLayout() {
    layout.value = 'grid'
  }

  // ✅ الحفظ التلقائي عند تغيير التخطيط
  watch(
    layout,
    async (newLayout) => {
      const customization = await indexedDBService.getCustomization('template') || { id: 'template' }
      customization.layout_id = newLayout
      await indexedDBService.saveCustomization(customization, 'template')
    }
  )

  return {
    layout,
    setLayout,
    loadLayout,
    saveLayout,
    resetLayout
  }
})
