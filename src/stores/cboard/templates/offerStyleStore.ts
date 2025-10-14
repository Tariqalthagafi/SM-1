// 📁 المسار: src/stores/cboard/templates/offerStyleStore.ts

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'
import type { OfferStyle } from '@/types/contexts/templates'

export const useOfferStyleStore = defineStore('offerStyleStore', () => {
  const offerStyle = ref<OfferStyle>('badgeWithNewPrice') // القيمة الافتراضية
  const offerStyleOptions = ref<{ value: OfferStyle; label?: string }[]>([])

  function setOfferStyle(style: OfferStyle) {
    offerStyle.value = style
  }

  async function loadOfferStyle() {
    const saved = await indexedDBService.getSetting('offerStyle')
    if (typeof saved === 'string' && offerStyleOptions.value.find(o => o.value === saved)) {
      offerStyle.value = saved as OfferStyle
    }
  }

  async function saveOfferStyle() {
    await indexedDBService.saveSetting('offerStyle', offerStyle.value)
  }

  async function seedOfferStyleOptions() {
    const existing = await indexedDBService.getOptions('offerStyle')
    if (existing.length > 0) return

    const seedOptions = [
      {
        id: 'offerStyle-badgeWithNewPrice',
        key: 'offerStyle',
        value: 'badgeWithNewPrice',
        label: '🔖 شارة خصم + سعر جديد',
        type: 'string',
        context: 'template',
        group: 'offerStyle',
        is_active: true
      },
      {
        id: 'offerStyle-stackedPrice',
        key: 'offerStyle',
        value: 'stackedPrice',
        label: 'السعر فوق بعض',
        type: 'string',
        context: 'template',
        group: 'offerStyle',
        is_active: true
      },
      {
        id: 'offerStyle-badgeDiscount',
        key: 'offerStyle',
        value: 'badgeDiscount',
        label: 'شارة قبل السعر',
        type: 'string',
        context: 'template',
        group: 'offerStyle',
        is_active: true
      },
      {
        id: 'offerStyle-strikeInline',
        key: 'offerStyle',
        value: 'strikeInline',
        label: 'سعر مشطوب بجانب الجديد',
        type: 'string',
        context: 'template',
        group: 'offerStyle',
        is_active: true
      }
    ]

    for (const option of seedOptions) {
      await indexedDBService.saveOption(option)
    }
  }

  async function initOfferStyleOptions() {
    await seedOfferStyleOptions()
    offerStyleOptions.value = await indexedDBService.getOptions('offerStyle')
    await loadOfferStyle()
    if (!offerStyleOptions.value.find(o => o.value === offerStyle.value)) {
      offerStyle.value = offerStyleOptions.value[0]?.value || 'badgeWithNewPrice'
    }
  }

  function resetOfferStyle() {
    offerStyle.value = 'badgeWithNewPrice'
  }

  return {
    offerStyle,
    offerStyleOptions,
    setOfferStyle,
    loadOfferStyle,
    saveOfferStyle,
    initOfferStyleOptions,
    resetOfferStyle
  }
})
