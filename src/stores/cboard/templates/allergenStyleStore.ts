// 📁 المسار: src/stores/cboard/templates/allergenStyleStore.ts

import { defineStore } from 'pinia'
import { ref , type StyleValue} from 'vue'
import { indexedDBService } from '@/services/indexedDBService'
import type { AllergenIconStyle } from '@/types/contexts/templates'

// ==================================================================
// 1. مصدر الحقيقة الواحد (Single Source of Truth)
// ==================================================================
const ALLERGEN_STYLES_CONFIG: Record<AllergenIconStyle, { label: string; symbol: string; style: StyleValue  }> = {
  boxedA:           { label: '🅰 مربع',       symbol: '🅰', style: { color: '#ff0000' } },
  boldA:            { label: 'A تقيل',        symbol: 'A', style: { fontWeight: 'bold', color: '#666' } },
  warningTriangle:  { label: '⚠ مثلث تحذير',  symbol: '⚠', style: { color: '#FF7A00' } },
  colored:          { label: '🅰 ملون',        symbol: '🅰', style: { color: '#ff0000' } },
  outlined:         { label: '🅰 بإطار',       symbol: '🅰', style: { border: '1px solid #ff0000', padding: '0.2rem', borderRadius: '4px', color: '#ff0000' } },
  monochrome:       { label: 'A رمادي',       symbol: 'A', style: { color: '#666' } },
  hidden:           { label: 'بدون رمز',      symbol: '',  style: { display: 'none' } }
};
// ==================================================================

export const useAllergenStyleStore = defineStore('allergenStyleStore', () => {
  const allergenIconStyle = ref<AllergenIconStyle>('colored')
  const allergenStyleOptions = ref<{ value: AllergenIconStyle; label?: string }[]>([])

  // ... (setAllergenStyle, loadAllergenStyle, saveAllergenStyle, resetAllergenStyle) ...
  function setAllergenStyle(style: AllergenIconStyle) { allergenIconStyle.value = style }
  
  async function loadAllergenStyle() {
    try {
      const saved = await indexedDBService.getSetting('allergenIconStyle')
      // تحقق من أن القيمة المحفوظة صالحة وموجودة في الخيارات المتاحة
      if (typeof saved === 'string' && Object.keys(ALLERGEN_STYLES_CONFIG).includes(saved)) {
        allergenIconStyle.value = saved as AllergenIconStyle
      }
    } catch (error) {
      console.error("Failed to load allergen style:", error);
    }
  } 
   async function saveAllergenStyle() {
    try {
      await indexedDBService.saveSetting('allergenIconStyle', allergenIconStyle.value)
    } catch (error) {
      console.error("Failed to save allergen style:", error);
    }
  } 
   function resetAllergenStyle() { allergenIconStyle.value = 'colored' }


  async function seedAllergenStyleOptions() {
    const existing = await indexedDBService.getOptions('allergenIconStyle')
    if (existing.length >= 7) return

    // 2. بيانات البذر الآن تقرأ من مصدر الحقيقة
    const seedOptions = Object.entries(ALLERGEN_STYLES_CONFIG).map(([value, config]) => ({
      id: `allergenStyle-${value}`,
      key: 'allergenIconStyle',
      value: value as AllergenIconStyle,
      label: config.label,
      type: 'string',
      context: 'template',
      group: 'allergenIconStyle',
      is_active: true
    }));

    for (const option of seedOptions) {
      await indexedDBService.saveOption(option)
    }
  }

  async function initAllergenStyleOptions() {
    await seedAllergenStyleOptions()
    allergenStyleOptions.value = await indexedDBService.getOptions('allergenIconStyle')
    await loadAllergenStyle()
    if (!allergenStyleOptions.value.find(o => o.value === allergenIconStyle.value)) {
      allergenIconStyle.value = allergenStyleOptions.value[0]?.value || 'colored'
    }
  }

  // 3. الدوال المساعدة الآن تقرأ من مصدر الحقيقة
  function getIconSymbol(style: AllergenIconStyle): string {
    return ALLERGEN_STYLES_CONFIG[style]?.symbol ?? '?'
  }

  function getIconStyle(style: AllergenIconStyle): StyleValue  {
    return ALLERGEN_STYLES_CONFIG[style]?.style ?? { color: '#999' }
  }
  
  return {
    allergenIconStyle,
    allergenStyleOptions,
    setAllergenStyle,
    loadAllergenStyle,
    saveAllergenStyle,
    initAllergenStyleOptions,
    resetAllergenStyle,
    getIconSymbol,
    getIconStyle
  }
})
