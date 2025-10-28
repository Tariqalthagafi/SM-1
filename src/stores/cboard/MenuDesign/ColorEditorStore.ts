import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ColorSettings } from '@/types/contexts/MenuDesign'
import { indexedDBService } from '@/services/indexedDBService'

export const useColorEditorStore = defineStore('colorEditorStore', () => {
  // ✅ الحالة الأساسية للألوان
  const colors = ref<ColorSettings>({
    headerBackground: '#ffffff',
    sectionBackground: '#f5f5f5',
    cardBackground: '#ffffff',
    titleText: '#000000',
    priceText: '#333333',
    descriptionText: '#666666',
    allergenIcon: '#ff0000',
    offerLabel: '#007bff',
    sectionTitleText: '#222222',
    currencyIcon: '#009688',
    expiredProductIcon: '#9e9e9e',
    bodyBackground: '#f0f0f0',
    productBackground: '#ffffff',
    priceBackground: '#fff8e1',
    currencyBackground: '#e0f7fa'
  })

  // ✅ تعديل لون مفرد
  function setColor(key: keyof ColorSettings, value: string) {
    colors.value[key] = value
  }

  // ✅ تطبيق مجموعة ألوان كاملة
  function setColors(newColors: Partial<ColorSettings>) {
    colors.value = { ...colors.value, ...newColors }
  }

  // ✅ تحميل الألوان من نمط معين
  async function loadColors(presetName: string) {
    const saved = await indexedDBService.getColors(`preset-${presetName}`)
    if (saved && typeof saved === 'object') {
      colors.value = { ...colors.value, ...(saved as ColorSettings) }
    }
  }

  // ✅ حفظ الألوان في نمط معين
  async function saveColors(presetName: string) {
    await indexedDBService.saveColors(colors.value, `preset-${presetName}`)
  }

  // ✅ حفظ النسخة الأصلية للنمط (لأجل إعادة الضبط)
  async function saveDefaultPreset(presetName: string) {
    await indexedDBService.saveSetting(`preset-default-${presetName}`, JSON.parse(JSON.stringify(colors.value)))
  }

  // ✅ إعادة ضبط النمط إلى حالته الأصلية
  async function resetPreset(presetName: string) {
    const saved = await indexedDBService.getSetting(`preset-default-${presetName}`)
    if (saved && typeof saved === 'object') {
      colors.value = { ...saved as ColorSettings }
      await saveColors(presetName)
    }
  }

  return {
    colors,
    setColor,
    setColors,
    loadColors,
    saveColors,
    saveDefaultPreset,
    resetPreset
  }
})
