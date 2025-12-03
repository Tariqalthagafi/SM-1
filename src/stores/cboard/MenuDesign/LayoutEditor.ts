// 📁 src/stores/cboard/MenuDesign/LayoutEditorStore.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { MenuLayout } from '@/types/contexts/menuDesign1.ts'
import { indexedDBService } from '@/services/indexedDBService'
import { supabase } from '@/supabase'

export const useLayoutEditorStore = defineStore('layoutEditorStore', () => {
  const layout = ref<MenuLayout>('grid')

  function setLayout(newLayout: MenuLayout) {
    layout.value = newLayout
  }

  // ✅ تحميل التخطيط من Supabase أولاً ثم IndexedDB كـ fallback
  async function loadLayout(menuId?: string) {
    if (menuId) {
      const { data, error } = await supabase
        .from('template_settings')
        .select('layout_id')
        .eq('menu_id', menuId)
        .single()

      if (!error && data?.layout_id) {
        layout.value = data.layout_id as MenuLayout
        return
      }
    }

    // fallback إلى IndexedDB
    const customization = await indexedDBService.getCustomization('template')
    if (customization?.layout_id && typeof customization.layout_id === 'string') {
      layout.value = customization.layout_id as MenuLayout
    }
  }

  // ✅ حفظ التخطيط في Supabase + IndexedDB
  async function saveLayout(menuId?: string) {
    if (menuId) {
      await supabase
        .from('template_settings')
        .update({ layout_id: layout.value })
        .eq('menu_id', menuId)
    }

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

      // حفظ في Supabase أيضًا إذا عندنا menuId
      // ملاحظة: هنا ممكن تمرر menuId من خارج الـ store عند الاستدعاء
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
