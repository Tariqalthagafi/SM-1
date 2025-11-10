import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Offer } from '@/types/contexts/offers1.ts'
import { indexedDBService } from '@/services/indexedDBService'
import { supabase } from '@/supabase'


export const useOffersStore = defineStore('offersStore', () => {
  const offers = ref<Offer[]>([])
  const STORE_NAME = 'offers'

  async function syncFromSupabase() {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) throw userError || new Error('لا يوجد مستخدم مسجل')

  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .eq('created_by', user.id)

  if (error) throw error

  for (const offer of data) {
    await indexedDBService.put(STORE_NAME, offer)
  }

  // ✅ بدل استدعاء load()، نفذ الكود مباشرة
  offers.value = await indexedDBService.getAll(STORE_NAME)
}
  // إنشاء عرض فارغ
  function createEmptyOffer(): Offer {
    return {
      id: '',
      title: '',
      type: 'percentage', // أو unifiedPrice
      discount: 0,
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: '',
      is_active: true
    }
  }

  // تحميل العروض من IndexedDB
  async function load() {
    offers.value = await indexedDBService.getAll(STORE_NAME)
  }

  // إضافة عرض جديد
async function addOffer(offer: Offer) {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) throw userError || new Error('لا يوجد مستخدم مسجل')

  const fullOffer = {
    ...offer,
    id: offer.id || crypto.randomUUID(),
    created_by: user.id
  }

  const { error } = await supabase.from('offers').insert([fullOffer])
  if (error) throw error

  await indexedDBService.put(STORE_NAME, fullOffer)
  await load()
}


  // تحديث عرض
async function updateOffer(id: string, updated: Offer) {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) throw userError || new Error('لا يوجد مستخدم مسجل')

  const { error } = await supabase
    .from('offers')
    .update(updated)
    .eq('id', id)
    .eq('created_by', user.id)

  if (error) throw error

  await indexedDBService.put(STORE_NAME, { ...updated, id })
  await load()
}


  // حذف عرض
async function deleteOffer(id: string) {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) throw userError || new Error('لا يوجد مستخدم مسجل')

  const { error } = await supabase
    .from('offers')
    .delete()
    .eq('id', id)
    .eq('created_by', user.id)

  if (error) throw error

  await indexedDBService.delete(STORE_NAME, id)
  offers.value = offers.value.filter(o => o.id !== id)
}

  // تبديل حالة العرض (نشط / غير نشط)
  async function toggleOfferActive(id: string) {
    const index = offers.value.findIndex(o => o.id === id)
    if (index === -1) return

    offers.value[index].is_active = !offers.value[index].is_active

    const plainOffer = JSON.parse(JSON.stringify(offers.value[index]))
    await indexedDBService.put(STORE_NAME, plainOffer)
  }

  // 🆕 دالة حساب السعر النهائي
  function calculatePrice(originalPrice: number, offer: Offer) {
    // إذا العرض غير نشط → رجع السعر الأصلي
    if (!offer.is_active) return originalPrice

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
    calculatePrice,
    syncFromSupabase
  }
})
