import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'

export const useFontStore = defineStore('fontStore', () => {
  const fontFamily = ref('Cairo') // القيمة الافتراضية
  const fontOptions = ref<{ value: string; label?: string }[]>([])

  // ✅ تطبيق الخط مباشرة على مستوى الصفحة
  watchEffect(() => {
    document.documentElement.style.setProperty('--font-family', fontFamily.value)
  })

  function setFont(font: string) {
    fontFamily.value = font
  }

  async function saveFont() {
    await indexedDBService.saveSetting('fontFamily', fontFamily.value)
  }

  async function loadFont() {
    const saved = await indexedDBService.getSetting('fontFamily')
    if (saved?.value && fontOptions.value.find(f => f.value === saved.value)) {
      fontFamily.value = saved.value
    }
  }

  async function seedFontOptions() {
    const existing = await indexedDBService.getOptions('fontFamily')
    if (existing.length > 0) return

    const seedFonts = [
      { id: 'fontFamily-Tajawal', value: 'Tajawal', label: 'خط Tajawal', key: 'fontFamily', type: 'string', context: 'template', group: 'fonts', is_active: true },
      { id: 'fontFamily-Amiri', value: 'Amiri', label: 'خط Amiri', key: 'fontFamily', type: 'string', context: 'template', group: 'fonts', is_active: true },
      { id: 'fontFamily-Cairo', value: 'Cairo', label: 'خط Cairo', key: 'fontFamily', type: 'string', context: 'template', group: 'fonts', is_active: true },
      { id: 'fontFamily-NotoKufiArabic', value: 'Noto Kufi Arabic', label: 'خط Noto Kufi Arabic', key: 'fontFamily', type: 'string', context: 'template', group: 'fonts', is_active: true },
      { id: 'fontFamily-Almarai', value: 'Almarai', label: 'خط Almarai', key: 'fontFamily', type: 'string', context: 'template', group: 'fonts', is_active: true }
    ]

    for (const font of seedFonts) {
      await indexedDBService.saveOption(font)
    }
  }

  async function initFontOptions() {
    await seedFontOptions()
    fontOptions.value = await indexedDBService.getOptions('fontFamily')
    
    // 1. استرجاع القيمة مباشرة (savedFontValue = 'Tajawal')
    const savedFontValue = await indexedDBService.getSetting('fontFamily') 
    
    let fontToApply = 'Cairo'; 

    // 2. التحقق من القيمة مباشرة
    if (savedFontValue && fontOptions.value.find(f => f.value === savedFontValue)) {
      fontToApply = savedFontValue;
    } 
    
    fontFamily.value = fontToApply;
  }


  function resetFont() {
    fontFamily.value = 'Cairo'
  }

  return {
    fontFamily,
    fontOptions,
    setFont,
    saveFont,
    loadFont,
    initFontOptions,
    resetFont
  }
})
