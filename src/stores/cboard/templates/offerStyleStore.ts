// 📁 المسار: src/stores/cboard/templates/offerStyleStore.ts

import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'
import type { OfferStyle } from '@/types/contexts/templates.ts'

export const useOfferStyleStore = defineStore('offerStyleStore', () => {
  // ✅ النمط المختار حاليًا
  const offerStyle = ref<OfferStyle>('strikeOnly') // القيمة الافتراضية

  // ✅ قائمة الخيارات (في الذاكرة فقط، لا تُزرع)
  const offerStyleOptions = ref<{ value: OfferStyle; label: string }[]>([
    { value: 'strikeOnly', label: 'سعر مشطوب فقط' },
    { value: 'strikeWithSaving', label: '🔥 وفر 5 ر.س' },
    { value: 'strikeWithBadge', label: '🔖 نسبة خصم' }
  ])

  // ✅ تعيين النمط المختار
  function setOfferStyle(style: OfferStyle) {
    offerStyle.value = style
  }

  // ✅ تحميل النمط المختار من IndexedDB
async function loadOfferStyle() {
  const saved = await indexedDBService.getSetting('offerStyle')

  if (typeof saved === 'string' && offerStyleOptions.value.find(o => o.value === saved)) {
    offerStyle.value = saved as OfferStyle
  } else {
    // ✅ زرع تلقائي للنمط الافتراضي عند أول تشغيل
    offerStyle.value = 'strikeOnly'
    await indexedDBService.saveSetting('offerStyle', offerStyle.value)
  }
}


  // ✅ حفظ يدوي (اختياري)
  async function saveOfferStyle() {
    await indexedDBService.saveSetting('offerStyle', offerStyle.value)
  }

  // ✅ إعادة تعيين للنمط الافتراضي
  function resetOfferStyle() {
    offerStyle.value = 'strikeOnly'
  }

  // ✅ حفظ تلقائي عند التغيير
  watch(offerStyle, async (newStyle) => {
    await indexedDBService.saveSetting('offerStyle', newStyle)
  })

  return {
    offerStyle,
    offerStyleOptions,
    setOfferStyle,
    loadOfferStyle,
    saveOfferStyle,
    resetOfferStyle
  }
})
