// 📁 المسار: src/stores/cboard/templates/expiredStyleStore.ts

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'
import type { ExpiredStyle } from '@/types/contexts/templates'

export const useExpiredStyleStore = defineStore('expiredStyleStore', () => {
  const expiredStyle = ref<ExpiredStyle>('strike') // القيمة الافتراضية
  const expiredStyleOptions = ref<{ value: ExpiredStyle; label?: string }[]>([])

  function setExpiredStyle(style: ExpiredStyle) {
    expiredStyle.value = style
  }

  async function loadExpiredStyle() {
    const saved = await indexedDBService.getSetting('expiredStyle')
    if (typeof saved === 'string' && expiredStyleOptions.value.find(o => o.value === saved)) {
      expiredStyle.value = saved as ExpiredStyle
    }
  }

  async function saveExpiredStyle() {
    await indexedDBService.saveSetting('expiredStyle', expiredStyle.value)
  }

  async function seedExpiredStyleOptions() {
    const existing = await indexedDBService.getOptions('expiredStyle')
    if (existing.length > 0) return

    const seedOptions = [
      {
        id: 'expiredStyle-strike',
        key: 'expiredStyle',
        value: 'strike',
        label: 'شطب السعر',
        type: 'string',
        context: 'template',
        group: 'expiredStyle',
        is_active: true
      },
      {
        id: 'expiredStyle-dimmed',
        key: 'expiredStyle',
        value: 'dimmed',
        label: 'تظليل المنتج',
        type: 'string',
        context: 'template',
        group: 'expiredStyle',
        is_active: true
      },
      {
        id: 'expiredStyle-hide',
        key: 'expiredStyle',
        value: 'hide',
        label: 'إخفاء المنتج',
        type: 'string',
        context: 'template',
        group: 'expiredStyle',
        is_active: true
      }
    ]

    for (const option of seedOptions) {
      await indexedDBService.saveOption(option)
    }
  }

  async function initExpiredStyleOptions() {
    await seedExpiredStyleOptions()
    expiredStyleOptions.value = await indexedDBService.getOptions('expiredStyle')
    await loadExpiredStyle()
    if (!expiredStyleOptions.value.find(o => o.value === expiredStyle.value)) {
      expiredStyle.value = expiredStyleOptions.value[0]?.value || 'strike'
    }
  }

  function resetExpiredStyle() {
    expiredStyle.value = 'strike'
  }

  return {
    expiredStyle,
    expiredStyleOptions,
    setExpiredStyle,
    loadExpiredStyle,
    saveExpiredStyle,
    initExpiredStyleOptions,
    resetExpiredStyle
  }
})
