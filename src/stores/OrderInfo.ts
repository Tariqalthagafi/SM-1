import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'
import type { OperatingHours, DeliveryMethod, PaymentMethod } from '@/types/contexts/OrderInfo'

export const useOrderInfoStore = defineStore('orderInfo', () => {
  const operatingHours = ref<OperatingHours>({
    الأحد: [],
    الاثنين: [],
    الثلاثاء: [],
    الأربعاء: [],
    الخميس: [],
    الجمعة: [],
    السبت: []
  })

  const deliveryMethods = ref<DeliveryMethod[]>([
    { name: 'طلب محلي', icon: '🍽️', enabled: false },
    { name: 'استلام الفرع', icon: '🏃‍♂️', enabled: false },
    { name: 'توصيل جاهز', icon: '🚗', enabled: false },
    { name: 'توصيل هنقرستيشن', icon: '📦', enabled: false },
    { name: 'توصيل كيتا', icon: '🛵', enabled: false }
  ])

  const paymentMethods = ref<PaymentMethod[]>([
    { name: 'نقدًا', icon: '💵', enabled: false },
    { name: 'مدى', icon: '💳', enabled: false },
    { name: 'فيزا', icon: '🧾', enabled: false }
  ])

  function removePeriod(day: string, index: number) {
    operatingHours.value[day].splice(index, 1)
  }

  async function load() {
    const hours = await indexedDBService.getOperatingHours('default')
    const delivery = await indexedDBService.getOrderMethods('default')
    const payment = await indexedDBService.getPaymentMethods('default')

    if (hours) operatingHours.value = hours
    if (delivery) deliveryMethods.value = delivery.methods
    if (payment) paymentMethods.value = payment.methods
  }

  async function save() {
    await indexedDBService.saveOperatingHours(toRaw(operatingHours.value), 'default')
    await indexedDBService.saveOrderMethods(toRaw(deliveryMethods.value), 'default')
    await indexedDBService.savePaymentMethods(toRaw(paymentMethods.value), 'default')
  }

  return {
    operatingHours,
    deliveryMethods,
    paymentMethods,
    removePeriod,
    load,
    save
  }
})
