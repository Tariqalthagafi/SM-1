import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Offer } from '@/types/contexts/Offers'
import { indexedDBService } from '@/services/indexedDBService'

const STORE_NAME = 'offers'

export const useOffersStore = defineStore('offersStore', () => {
  const offers = ref<Offer[]>([])

  // إنشاء عرض فارغ
  function createEmptyOffer(): Offer {
    return {
      id: '',
      title: '',
      type: 'percentage', // أو unifiedPrice
      discount: 0,
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      isActive: true
    }
  }

  // تحميل العروض من IndexedDB
  async function load() {
    offers.value = await indexedDBService.getAll(STORE_NAME)
  }

  // إضافة عرض جديد
  async function addOffer(offer: Offer) {
    await indexedDBService.put(STORE_NAME, offer)
    await load()
  }

  // تحديث عرض
  async function updateOffer(id: string, updated: Offer) {
    await indexedDBService.put(STORE_NAME, { ...updated, id })
    await load()
  }

  // حذف عرض
  async function deleteOffer(id: string) {
    await indexedDBService.delete(STORE_NAME, id)
    offers.value = offers.value.filter(o => o.id !== id)
  }

  // تبديل حالة العرض (نشط / غير نشط)
  async function toggleOfferActive(id: string) {
    const index = offers.value.findIndex(o => o.id === id)
    if (index === -1) return

    offers.value[index].isActive = !offers.value[index].isActive

    const plainOffer = JSON.parse(JSON.stringify(offers.value[index]))
    await indexedDBService.put(STORE_NAME, plainOffer)
  }

  // 🆕 دالة حساب السعر النهائي
  function calculatePrice(originalPrice: number, offer: Offer) {
    // إذا العرض غير نشط → رجع السعر الأصلي
    if (!offer.isActive) return originalPrice

    if (offer.type === 'percentage') {
      // إذا discount = 20 يعني 20%
      return Math.round(originalPrice * (1 - offer.discount / 100))
    }

    if (offer.type === 'unifiedPrice') {
      // السعر الموحد مباشرة
      return offer.discount
    }

    return originalPrice
  }

  return {
    offers,
    createEmptyOffer,
    load,
    addOffer,
    updateOffer,
    deleteOffer,
    toggleOfferActive,
    calculatePrice
  }
})
