import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TimePeriod, OperatingHours, DeliveryMethod, PaymentMethod } from '@/types/contexts/OrderInfo'

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

  function removePeriod(day: string, index: number) {
    operatingHours.value[day].splice(index, 1)
  }

  const deliveryMethods = ref<DeliveryMethod[]>([
    { name: 'طلب محلي', icon: '🍽️', enabled: true },
    { name: 'استلام الفرع', icon: '🏃‍♂️', enabled: true },
    { name: 'توصيل جاهز', icon: '🚗', enabled: false },
    { name: 'توصيل هنقرستيشن', icon: '📦', enabled: false },
    { name: 'توصيل كيتا', icon: '🛵', enabled: false }
  ])

  const paymentMethods = ref<PaymentMethod[]>([
    { name: 'نقدًا', icon: '💵', enabled: true },
    { name: 'مدى', icon: '💳', enabled: true },
    { name: 'فيزا', icon: '🧾', enabled: false }
  ])

  function load() {}
  function save() {}

  return {
    operatingHours,
    deliveryMethods,
    paymentMethods,
    removePeriod,
    load,
    save
  }
})
