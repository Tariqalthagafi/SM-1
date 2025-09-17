// 📁 المسار: src/stores/cboard/templates/allergenStyleStore.ts

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'
import type { AllergenIconStyle } from '@/types/contexts/templates'

export const useAllergenStyleStore = defineStore('allergenStyleStore', () => {
  const allergenIconStyle = ref<AllergenIconStyle>('colored') // القيمة الافتراضية
  const allergenStyleOptions = ref<{ value: AllergenIconStyle; label?: string }[]>([])

  function setAllergenStyle(style: AllergenIconStyle) {
    allergenIconStyle.value = style
  }

  async function loadAllergenStyle() {
    const saved = await indexedDBService.getSetting('allergenIconStyle')
    if (typeof saved === 'string' && allergenStyleOptions.value.find(o => o.value === saved)) {
      allergenIconStyle.value = saved as AllergenIconStyle
    }
  }

  async function saveAllergenStyle() {
    await indexedDBService.saveSetting('allergenIconStyle', allergenIconStyle.value)
  }

  async function seedAllergenStyleOptions() {
    const existing = await indexedDBService.getOptions('allergenIconStyle')
    if (existing.length > 0) return

    const seedOptions = [
      {
        id: 'allergenStyle-colored',
        key: 'allergenIconStyle',
        value: 'colored',
        label: 'ملون',
        type: 'string',
        context: 'template',
        group: 'allergenIconStyle',
        is_active: true
      },
      {
        id: 'allergenStyle-outlined',
        key: 'allergenIconStyle',
        value: 'outlined',
        label: 'مخطط',
        type: 'string',
        context: 'template',
        group: 'allergenIconStyle',
        is_active: true
      },
      {
        id: 'allergenStyle-monochrome',
        key: 'allergenIconStyle',
        value: 'monochrome',
        label: 'أحادي اللون',
        type: 'string',
        context: 'template',
        group: 'allergenIconStyle',
        is_active: true
      }
    ]

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

  function resetAllergenStyle() {
    allergenIconStyle.value = 'colored'
  }

  return {
    allergenIconStyle,
    allergenStyleOptions,
    setAllergenStyle,
    loadAllergenStyle,
    saveAllergenStyle,
    initAllergenStyleOptions,
    resetAllergenStyle
  }
})
