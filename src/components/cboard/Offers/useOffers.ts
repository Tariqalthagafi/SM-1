// src/components/cboard/Offers/useOffers.ts
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
import type { Offer } from '@/types/contexts/offers1.ts'

const offers = ref<Offer[]>([])
const userId = ref<string>('')

async function loadOffers() {
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError) {
    console.error('❌ خطأ في جلب المستخدم:', userError.message)
    return
  }

  userId.value = userData?.user?.id ?? ''

  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .eq('user_id', userId.value)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('❌ خطأ في تحميل العروض:', error.message)
  } else {
    offers.value = (data ?? []) as Offer[]
  }
}

async function addOffer(offer: Partial<Offer>) {
  const newOffer: Offer = {
    id: crypto.randomUUID(),
    user_id: userId.value,
    title: offer.title ?? '',
    type: offer.type ?? 'percentage',
    discount: offer.discount ?? 0,
    start_date: offer.start_date ?? null,
    end_date: offer.end_date ?? null,
    start_time: offer.start_time ?? null,
    end_time: offer.end_time ?? null,
    is_active: offer.is_active ?? false,
    created_at: new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('offers')
    .insert(newOffer)
    .select()

  if (error) {
    console.error('❌ خطأ في إضافة العرض:', error.message)
  } else if (data) {
    offers.value.push(...(data as Offer[]))
  }
}

async function updateOffer(id: string, updates: Partial<Offer>) {
  const { data, error } = await supabase
    .from('offers')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userId.value)
    .select()

  if (error) {
    console.error('❌ خطأ في تحديث العرض:', error.message)
  } else if (data) {
    const idx = offers.value.findIndex((o: Offer) => o.id === id)
    if (idx !== -1) offers.value[idx] = data[0] as Offer
  }
}

async function deleteOffer(id: string) {
  const { error } = await supabase
    .from('offers')
    .delete()
    .eq('id', id)
    .eq('user_id', userId.value)

  if (error) {
    console.error('❌ خطأ في حذف العرض:', error.message)
  } else {
    offers.value = offers.value.filter((o: Offer) => o.id !== id)
  }
}

async function toggleOfferActive(id: string) {
  const offer = offers.value.find(o => o.id === id)
  if (!offer) return

  const newStatus = !offer.is_active

  const { error } = await supabase
    .from('offers')
    .update({ is_active: newStatus })
    .eq('id', id)
    .eq('user_id', userId.value)

  if (error) {
    console.error('❌ خطأ في تبديل حالة العرض:', error.message)
  } else {
    offer.is_active = newStatus
  }
}

export function useOffers() {
  onMounted(loadOffers)
  return { offers, loadOffers, addOffer, updateOffer, deleteOffer, toggleOfferActive }
}
