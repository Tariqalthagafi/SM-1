// src/stores/cboard/orderInfo/paymentMethodsStore.ts
import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import { supabase } from '@/supabase'
import type { PaymentMethod } from '@/types/contexts/orderInfo1.ts'

const defaultPaymentMethods: PaymentMethod[] = [
  { name: 'cash', icon: 'SRS1.svg', enabled: false },
  { name: 'mada', icon: 'mada-icon.svg', enabled: false },
  { name: 'visa', icon: 'visa-icon.svg', enabled: false },
  { name: 'mastercard', icon: 'mastercard-icon.svg', enabled: false },
  { name: 'amex', icon: 'amex-icon.svg', enabled: false },
  { name: 'stcpay', icon: 'stcpay-icon.svg', enabled: false },
  { name: 'applepay', icon: 'applepay-icon.svg', enabled: false },
  { name: 'googlepay', icon: 'googlepay-icon.svg', enabled: false },
  { name: 'paypal', icon: 'paypal-icon.svg', enabled: false },
  { name: 'bank', icon: 'bank-icon.svg', enabled: false },
  { name: 'tabby', icon: 'tabby-icon.svg', enabled: false },
  { name: 'tamara', icon: 'tamara-icon.svg', enabled: false }
]

export const usePaymentMethodsStore = defineStore('paymentMethods', () => {
  const paymentMethods = ref<PaymentMethod[]>([...defaultPaymentMethods])

  async function syncPaymentMethodsFromSupabase() {
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user?.id) return
    const userId = userData.user.id

    const { data, error } = await supabase
      .from('orders_payments')
      .select('*')
      .eq('created_by', userId)

    if (!error && data) {
      paymentMethods.value = defaultPaymentMethods.map(m => {
        const found = data.find(d => d.name === m.name)
        return { ...m, enabled: found?.enabled ?? false }
      })
    }
  }

  async function syncPaymentMethodsToSupabase() {
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user?.id) return
    const userId = userData.user.id

    const rows = toRaw(paymentMethods.value).map(m => ({
      name: m.name,
      enabled: m.enabled,
      created_by: userId
    }))

    const { error } = await supabase
      .from('orders_payments')
      .upsert(rows, { onConflict: 'name,created_by' })

    if (error) console.error('خطأ في حفظ طرق الدفع:', error.message)
  }

  return {
    paymentMethods,
    syncPaymentMethodsFromSupabase,
    syncPaymentMethodsToSupabase
  }
})
