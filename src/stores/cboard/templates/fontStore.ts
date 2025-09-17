// 📁 المسار: src/stores/cboard/templates/fontStore.ts

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'

export const useFontStore = defineStore('fontStore', () => {
  const fontFamily = ref('Cairo') // القيمة الافتراضية
  const fontOptions = ref<{ value: string; label?: string }[]>([])

  function setFont(font: string) {
    fontFamily.value = font
  }

  async function loadFont() {
    const saved = await indexedDBService.getSetting('fontFamily')
    if (saved && fontOptions.value.find(f => f.value === saved)) {
      fontFamily.value = saved
    }
  }

  async function saveFont() {
    await indexedDBService.saveSetting('fontFamily', fontFamily.value)
  }

  async function seedFontOptions() {
    const existing = await indexedDBService.getOptions('fontFamily')
    if (existing.length > 0) return // لا حاجة للإدخال

    const seedFonts = [
      {
        id: 'fontFamily-Cairo',
        key: 'fontFamily',
        value: 'Cairo',
        label: 'خط Cairo',
        type: 'string',
        context: 'template',
        group: 'fonts',
        is_active: true
      },
      {
        id: 'fontFamily-Tajawal',
        key: 'fontFamily',
        value: 'Tajawal',
        label: 'خط Tajawal',
        type: 'string',
        context: 'template',
        group: 'fonts',
        is_active: true
      },
      {
        id: 'fontFamily-NotoSansArabic',
        key: 'fontFamily',
        value: 'Noto Sans Arabic',
        label: 'خط Noto Sans Arabic',
        type: 'string',
        context: 'template',
        group: 'fonts',
        is_active: true
      },
      {
        id: 'fontFamily-Almarai',
        key: 'fontFamily',
        value: 'Almarai',
        label: 'خط Almarai',
        type: 'string',
        context: 'template',
        group: 'fonts',
        is_active: true
      },
      {
        id: 'fontFamily-Roboto',
        key: 'fontFamily',
        value: 'Roboto',
        label: 'خط Roboto (لاتيني)',
        type: 'string',
        context: 'template',
        group: 'fonts',
        is_active: true
      }
    ]

    for (const font of seedFonts) {
      await indexedDBService.saveOption(font)
    }
  }

  async function initFontOptions() {
    await seedFontOptions()
    fontOptions.value = await indexedDBService.getOptions('fontFamily')
    await loadFont()
    if (!fontOptions.value.find(f => f.value === fontFamily.value)) {
      fontFamily.value = fontOptions.value[0]?.value || 'Cairo'
    }
  }

  function resetFont() {
    fontFamily.value = 'Cairo'
  }

  return {
    fontFamily,
    fontOptions,
    setFont,
    loadFont,
    saveFont,
    initFontOptions,
    resetFont
  }
})
