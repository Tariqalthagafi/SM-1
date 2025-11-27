// src/stores/cboard/deliveryMethodsStore.ts
import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import { supabase } from '@/supabase'
import type { DeliveryMethod } from '@/types/contexts/orderInfo1.ts'

const defaultDeliveryMethods: DeliveryMethod[] = [
  { name: 'local', icon: 'dinin-icon.svg', enabled: false },
  { name: 'pickup', icon: 'takeaway-icon.png', enabled: false },
  { name: 'restaurant', icon: 'delivery-icon.svg', enabled: false },
  { name: 'jahez', icon: 'Jahez-icon.svg', enabled: false },
  { name: 'hungerstation', icon: 'hunger-icon.svg', enabled: false },
  { name: 'marsool', icon: 'marsool-icon.svg', enabled: false },
  { name: 'keeta', icon: 'keeta-icon.webp', enabled: false }
]

export const useDeliveryMethodsStore = defineStore('deliveryMethods', () => {
  const deliveryMethods = ref<DeliveryMethod[]>([...defaultDeliveryMethods])

  async function syncDeliveryMethodsFromSupabase() {
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user?.id) return
    const userId = userData.user.id

    const { data, error } = await supabase
      .from('orders_methods')
      .select('*')
      .eq('created_by', userId)

    if (!error && data) {
      deliveryMethods.value = defaultDeliveryMethods.map(m => {
        const found = data.find(d => d.name === m.name)
        return { ...m, enabled: found?.enabled ?? false }
      })
    }
  }

  async function syncDeliveryMethodsToSupabase() {
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user?.id) return
    const userId = userData.user.id

    const rows = toRaw(deliveryMethods.value).map(m => ({
      name: m.name,
      enabled: m.enabled,
      created_by: userId
    }))

    const { error } = await supabase
      .from('orders_methods')
      .upsert(rows, { onConflict: 'name,created_by' })

    if (error) console.error('خطأ في حفظ طرق التوصيل:', error.message)
  }

  return {
    deliveryMethods,
    syncDeliveryMethodsFromSupabase,
    syncDeliveryMethodsToSupabase
  }
})
