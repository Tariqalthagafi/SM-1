// 📁 المسار: src/stores/cboard/templates/currencyStore.ts

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'

export const useCurrencyStore = defineStore('currencyStore', () => {
  const currencySymbol = ref<string>('ر.س') // القيمة الافتراضية
  const currencyOptions = ref<{ value: string; label?: string; image?: string }[]>([])

  function setCurrency(symbol: string) {
    currencySymbol.value = symbol
  }

  async function loadCurrency() {
    const saved = await indexedDBService.getSetting('currencySymbol')
    if (typeof saved === 'string' && currencyOptions.value.find(o => o.value === saved)) {
      currencySymbol.value = saved
    }
  }

  async function saveCurrency() {
    await indexedDBService.saveSetting('currencySymbol', currencySymbol.value)
  }

  async function seedCurrencyOptions() {
    const existing = await indexedDBService.getOptions('currencySymbol')
    if (existing.length > 0) return

    const seedOptions = [
      {
        id: 'currency-symbol-text',
        key: 'currencySymbol',
        value: 'ر.س',
        label: 'ر.س',
        type: 'string',
        context: 'template',
        group: 'currencySymbol',
        is_active: true
      },
      {
        id: 'currency-symbol-image',
        key: 'currencySymbol',
        value: 'SAR_IMAGE',
        label: 'صورة',
        image: '/images/SRS1.svg',
        type: 'string',
        context: 'template',
        group: 'currencySymbol',
        is_active: true
      }
    ]

    for (const option of seedOptions) {
      await indexedDBService.saveOption(option)
    }
  }

  async function initCurrencyOptions() {
    await seedCurrencyOptions()
    currencyOptions.value = await indexedDBService.getOptions('currencySymbol')
    await loadCurrency()
    if (!currencyOptions.value.find(o => o.value === currencySymbol.value)) {
      currencySymbol.value = currencyOptions.value[0]?.value || 'ر.س'
    }
  }

  function resetCurrency() {
    currencySymbol.value = 'ر.س'
  }

  return {
    currencySymbol,
    currencyOptions,
    setCurrency,
    loadCurrency,
    saveCurrency,
    initCurrencyOptions,
    resetCurrency
  }
})
