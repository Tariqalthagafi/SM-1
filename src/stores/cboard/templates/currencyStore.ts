// 📁 المسار: src/stores/cboard/templates/currencyStore.ts

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'

export const useCurrencyStore = defineStore('currencyStore', () => {
  // ✅ المفتاح المختار للعملة (وليس الرمز نفسه)
  const currencySymbol = ref<string>('svg-riyal')

  // ✅ الخيارات المتاحة
  const currencyOptions = ref<{ value: string; label?: string; image?: string }[]>([])

  // ✅ خريطة تحويل المفتاح إلى الرمز المعروض
  const currencyMap: Record<string, string> = {
    'text-riyal': 'ر.س',
    'riyal-text': 'ريال',
    'sar-text': 'SAR',
    'svg-riyal': '<img src="/images/SRS1.svg" class="riyal-icon" />'
  }

  // ✅ الرمز المعروض فعليًا (نص أو صورة)
  const displayedSymbol = computed(() => currencyMap[currencySymbol.value] || 'ر.س')

  // ✅ تعيين العملة يدويًا
  function setCurrency(symbol: string) {
    currencySymbol.value = symbol
  }

  // ✅ تحميل العملة من التخزين
  async function loadCurrency() {
    const saved = await indexedDBService.getSetting('currencySymbol')
    if (typeof saved === 'string' && currencyOptions.value.find(o => o.value === saved)) {
      currencySymbol.value = saved
    }
  }

  // ✅ حفظ العملة في التخزين
  async function saveCurrency() {
    await indexedDBService.saveSetting('currencySymbol', currencySymbol.value)
  }

  // ✅ إنشاء الخيارات إذا لم تكن موجودة
  async function seedCurrencyOptions() {
    const existing = await indexedDBService.getOptions('currencySymbol')
    if (existing.length > 0) return

    const seedOptions = [
      {
        id: 'currency-symbol-text',
        key: 'currencySymbol',
        value: 'text-riyal',
        label: 'ر.س',
        type: 'string',
        context: 'template',
        group: 'currencySymbol',
        is_active: true
      },
      {
        id: 'currency-symbol-riyal-text',
        key: 'currencySymbol',
        value: 'riyal-text',
        label: 'ريال',
        type: 'string',
        context: 'template',
        group: 'currencySymbol',
        is_active: true
      },
      {
        id: 'currency-symbol-sar-text',
        key: 'currencySymbol',
        value: 'sar-text',
        label: 'SAR',
        type: 'string',
        context: 'template',
        group: 'currencySymbol',
        is_active: true
      },
      {
        id: 'currency-symbol-image',
        key: 'currencySymbol',
        value: 'svg-riyal',
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

  // ✅ تحميل الخيارات وتعيين العملة
  async function initCurrencyOptions() {
    await seedCurrencyOptions()
    currencyOptions.value = await indexedDBService.getOptions('currencySymbol')
    await loadCurrency()

    // fallback هندسي في حال عدم تطابق المفتاح
    if (!currencyOptions.value.find(o => o.value === currencySymbol.value)) {
      currencySymbol.value = currencyOptions.value[0]?.value || 'svg-riyal'
    }
  }

  // ✅ إعادة تعيين العملة
  function resetCurrency() {
    currencySymbol.value = 'svg-riyal'
  }

  return {
    currencySymbol,       // المفتاح المختار
    currencyOptions,      // الخيارات المتاحة
    displayedSymbol,      // الرمز المعروض (نص أو صورة)
    setCurrency,
    loadCurrency,
    saveCurrency,
    initCurrencyOptions,
    resetCurrency
  }
})
