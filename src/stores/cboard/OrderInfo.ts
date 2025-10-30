import { ref } from 'vue'
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

export function useOrderInfoStore() {
  const operatingHours = ref<OperatingHours>({})
  const deliveryMethods = ref<DeliveryMethod[]>([])
  const paymentMethods = ref<PaymentMethod[]>([])

  async function load() {
    const data: OrderInfoSettings = await indexedDBService.getCustomization('orderInfo') || {}
    operatingHours.value = initializeHours(data.operatingHours)
    deliveryMethods.value = data.deliveryMethods || []
    paymentMethods.value = data.paymentMethods || []
  }

  function addPeriod(day: string) {
    const existing = operatingHours.value[day]
    const nextType = inferType(existing.length)
    existing.push({ type: nextType, from: '', to: '', enabled: true })
  }

  function removePeriod(day: string, index: number) {
    operatingHours.value[day].splice(index, 1)
    // لا تضف فترة فارغة تلقائيًا لتجنب كسر النوع
  }

  function cleanHours(hours: OperatingHours): OperatingHours {
    const result: OperatingHours = {}
    for (const day of allDays) {
      const validPeriods = hours[day].filter(p => p.from && p.to)
      if (validPeriods.length > 0) result[day] = validPeriods
    }
    return result
  }

  async function save() {
    const updated: OrderInfoSettings = {
      operatingHours: cleanHours(operatingHours.value),
      deliveryMethods: deliveryMethods.value,
      paymentMethods: paymentMethods.value
    }
    await indexedDBService.saveCustomization(updated, 'orderInfo')
  }

  return {
    operatingHours,
    deliveryMethods,
    paymentMethods,
    load,
    save,
    addPeriod,
    removePeriod
  }
}
