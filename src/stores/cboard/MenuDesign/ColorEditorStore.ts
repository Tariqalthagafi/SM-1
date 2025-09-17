// 📁 src/stores/cboard/MenuDesign/ColorEditorStore.ts

import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { ColorSettings } from '@/types/contexts/MenuDesign'
import { indexedDBService } from '@/services/indexedDBService'

export const useColorEditorStore = defineStore('colorEditorStore', () => {
  const colors = ref<ColorSettings>({
    headerBackground: '#ffffff',
    sectionBackground: '#f5f5f5',
    cardBackground: '#ffffff',
    titleText: '#000000',
    priceText: '#333333',
    descriptionText: '#666666',
    allergenIcon: '#ff0000'
  })

  function setColor(key: keyof ColorSettings, value: string) {
    colors.value[key] = value
  }

  function setColors(newColors: ColorSettings) {
    colors.value = { ...newColors }
  }

  async function loadColors() {
    const saved = await indexedDBService.getColors('default')
    if (saved && typeof saved === 'object') {
      colors.value = saved as ColorSettings
    }
  }

  async function saveColors() {
    await indexedDBService.saveColors(colors.value, 'default')
  }

  function resetColors() {
    colors.value = {
      headerBackground: '#ffffff',
      sectionBackground: '#f5f5f5',
      cardBackground: '#ffffff',
      titleText: '#000000',
      priceText: '#333333',
      descriptionText: '#666666',
      allergenIcon: '#ff0000'
    }
  }

  // ✅ الحفظ التلقائي عند أي تغيير في الألوان
  watch(
    colors,
    async (newColors) => {
      await indexedDBService.saveColors(newColors, 'default')
    },
    { deep: true }
  )

  return {
    colors,
    setColor,
    setColors,
    loadColors,
    saveColors,
    resetColors
  }
})
