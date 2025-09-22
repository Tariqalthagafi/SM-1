// 📁 src/stores/cboard/MenuDesign/ColorEditorStore.ts

import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
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

  // ✅ تطبيق مجموعة ألوان كاملة (مثل نمط جاهز)
  function setColors(newColors: Partial<ColorSettings>) {
    colors.value = { ...colors.value, ...newColors }
  }

  // ✅ تحميل الألوان من التخزين
  async function loadColors() {
    const saved = await indexedDBService.getColors('default')
    if (saved && typeof saved === 'object') {
      colors.value = { ...colors.value, ...(saved as ColorSettings) }
    }
  }

  // ✅ حفظ الألوان يدويًا
  async function saveColors() {
    await indexedDBService.saveColors(colors.value, 'default')
  }

  // ✅ إعادة تعيين الألوان إلى الوضع الافتراضي
  function resetColors() {
    colors.value = {
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
    }
  }

  // ✅ الحفظ التلقائي عند أي تغيير
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
