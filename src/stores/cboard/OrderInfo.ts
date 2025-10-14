import { ref } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'
import type {
  OperatingHours,
  DeliveryMethod,
  PaymentMethod,
  OrderInfoSettings
} from '@/types/contexts/OrderInfoView'

const allDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']

function initializeHours(data?: OperatingHours): OperatingHours {
  const result: OperatingHours = {}
  for (const day of allDays) {
    result[day] = data?.[day] ?? [{ from: '', to: '' }]
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
    operatingHours.value[day].push({ from: '', to: '' })
  }

  function removePeriod(day: string, index: number) {
    operatingHours.value[day].splice(index, 1)
    if (operatingHours.value[day].length === 0) {
      operatingHours.value[day].push({ from: '', to: '' })
    }
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
