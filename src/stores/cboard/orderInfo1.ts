import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import { supabase } from '@/supabase'
import { indexedDBService } from '@/services/indexedDBService'
import type {
  OperatingHours,
  DeliveryMethod,
  PaymentMethod,
  TimePeriod,
  OrderInfoSettings
} from '@/types/contexts/OrderInfo'

const allDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']

function inferType(index: number): 'first' | 'second' | 'full' {
  return index === 0 ? 'first' : index === 1 ? 'second' : 'full'
}

function normalizePeriod(p: Partial<TimePeriod>, index: number): TimePeriod {
  return {
    type: p.type ?? inferType(index),
    from: p.from ?? '',
    to: p.to ?? '',
    enabled: p.enabled ?? true
  }
}

function initializeHours(data?: OperatingHours): OperatingHours {
  const result: OperatingHours = {}
  for (const day of allDays) {
    const raw = data?.[day] ?? [
      { type: 'first', from: '08:00', to: '12:00', enabled: false },
      { type: 'second', from: '16:00', to: '22:00', enabled: false },
      { type: 'full', from: '00:00', to: '23:59', enabled: false }
    ]
    result[day] = raw.map((p, i) => normalizePeriod(p, i))
  }
  return result
}

const defaultDeliveryMethods: DeliveryMethod[] = [
  { name: 'local', icon: 'dinin-icon.svg', enabled: false },
  { name: 'pickup', icon: 'takeaway-icon.png', enabled: false },
  { name: 'restaurant', icon: 'delivery-icon.svg', enabled: false },
  { name: 'jahez', icon: 'Jahez-icon.svg', enabled: false },
  { name: 'hungerstation', icon: 'hunger-icon.svg', enabled: false },
  { name: 'marsool', icon: 'marsool-icon.svg', enabled: false },
  { name: 'keeta', icon: 'keeta-icon.webp', enabled: false }
]

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

export const useOrderInfoStore = defineStore('orderInfo', () => {
  const operatingHours = ref<OperatingHours>(initializeHours())
  const deliveryMethods = ref<DeliveryMethod[]>([...defaultDeliveryMethods])
  const paymentMethods = ref<PaymentMethod[]>([...defaultPaymentMethods])

  function removePeriod(day: string, index: number) {
    operatingHours.value[day].splice(index, 1)
  }

  function cleanHours(hours: OperatingHours): OperatingHours {
    const result: OperatingHours = {}
    for (const day of allDays) {
      const validPeriods = hours[day].filter(p => p.from && p.to)
      if (validPeriods.length > 0) result[day] = validPeriods
    }
    return result
  }

  async function syncOperatingHoursFromSupabase() {
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user?.id) return

    const userId = userData.user.id

    const { data, error } = await supabase
      .from('operating_hours')
      .select('*')
      .eq('created_by', userId)

    if (error || !data) return

    const result = allDays.reduce((acc, day) => {
      const periods = data
        .filter(p => p.day === day)
        .map((p, i) => normalizePeriod(p, i))
      acc[day] = periods
      return acc
    }, {} as OperatingHours)

    operatingHours.value = initializeHours(result)
  }

  async function syncOperatingHoursToSupabase() {
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user?.id) return

    const userId = userData.user.id
    const raw = toRaw(operatingHours.value)

    const rows = allDays.flatMap(day =>
      raw[day].map(p => ({
        day,
        type: p.type,
        from: p.from,
        to: p.to,
        enabled: p.enabled,
        created_by: userId
      }))
    )

    const { error } = await supabase
      .from('operating_hours')
      .upsert(rows, { onConflict: 'day,type,created_by' })

    if (error) {
      console.error('خطأ في حفظ ساعات العمل إلى Supabase:', error.message)
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

    if (error) {
      console.error('خطأ في حفظ طرق التوصيل إلى Supabase:', error.message)
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

    if (error) {
      console.error('خطأ في حفظ طرق الدفع إلى Supabase:', error.message)
    }
  }

  async function load() {
    await syncOperatingHoursFromSupabase()
    const data: OrderInfoSettings = await indexedDBService.getCustomization('orderInfo') || {}
    deliveryMethods.value = data.deliveryMethods ?? [...defaultDeliveryMethods]
    paymentMethods.value = data.paymentMethods ?? [...defaultPaymentMethods]
  }

  async function save() {
    const payload: OrderInfoSettings = {
      operatingHours: cleanHours(toRaw(operatingHours.value)),
      deliveryMethods: toRaw(deliveryMethods.value),
      paymentMethods: toRaw(paymentMethods.value)
    }
    await indexedDBService.saveCustomization(payload, 'orderInfo')
    await Promise.all([
      syncOperatingHoursToSupabase(),
      syncDeliveryMethodsToSupabase(),
      syncPaymentMethodsToSupabase()
    ])
  }

  return {
    operatingHours,
    deliveryMethods,
    paymentMethods,
    removePeriod,
    load,
    save,
    syncOperatingHoursFromSupabase,
    syncOperatingHoursToSupabase,
    syncDeliveryMethodsToSupabase,
    syncPaymentMethodsToSupabase
  }
})
