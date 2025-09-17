// 📁 المسار: src/stores/cboard/templates/offerStyleStore.ts

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'
import type { OfferStyle } from '@/types/contexts/templates'

export const useOfferStyleStore = defineStore('offerStyleStore', () => {
  const offerStyle = ref<OfferStyle>('oldNewStacked') // القيمة الافتراضية
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
        id: 'offerStyle-oldNewStacked',
        key: 'offerStyle',
        value: 'oldNewStacked',
        label: 'سعر قديم فوق جديد',
        type: 'string',
        context: 'template',
        group: 'offerStyle',
        is_active: true
      },
      {
        id: 'offerStyle-badgeWithNewPrice',
        key: 'offerStyle',
        value: 'badgeWithNewPrice',
        label: 'شارة خصم + سعر جديد',
        type: 'string',
        context: 'template',
        group: 'offerStyle',
        is_active: true
      },
      {
        id: 'offerStyle-inlineStrikeThrough',
        key: 'offerStyle',
        value: 'inlineStrikeThrough',
        label: 'سطر واحد مشطوب',
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
      offerStyle.value = offerStyleOptions.value[0]?.value || 'oldNewStacked'
    }
  }

  function resetOfferStyle() {
    offerStyle.value = 'oldNewStacked'
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
