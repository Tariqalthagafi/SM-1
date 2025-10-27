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
  { name: 'طلب محلي', icon: 'dinin-icon.svg', enabled: false },
  { name: 'استلام الفرع', icon: 'takeaway-icon.png', enabled: false },
  { name: 'توصيل المطعم المباشر', icon: 'delivery-icon.svg', enabled: false },
  { name: 'توصيل جاهز', icon: 'Jahez-icon.svg', enabled: false },
  { name: 'توصيل هنقرستيشن', icon: 'hunger-icon.svg', enabled: false },
  { name: 'توصيل مرسول', icon: 'marsool-icon.svg', enabled: false },
  { name: 'توصيل كيتا', icon: 'keeta-icon.webp', enabled: false },
  ])

  const paymentMethods = ref<PaymentMethod[]>([
   { name: 'مدى', icon: 'mada-icon.svg', enabled: false },
  { name: 'Visa', icon: 'visa-icon.svg', enabled: false },
  { name: 'MasterCard', icon: 'mastercard-icon.svg', enabled: false },
  { name: 'American Express', icon: 'amex-icon.svg', enabled: false },
  { name: 'STC Pay', icon: 'stcpay-icon.svg', enabled: false },
  { name: 'Apple Pay', icon: 'applepay-icon.svg', enabled: false },
  { name: 'Google Pay', icon: 'googlepay-icon.svg', enabled: false },
  { name: 'PayPal', icon: 'paypal-icon.svg', enabled: false },
  { name: 'تحويل بنكي', icon: 'bank-icon.svg', enabled: false },
  { name: 'تابي (Tabby)', icon: 'tabby-icon.svg', enabled: false },
  { name: 'تمارا (Tamara)', icon: 'tamara-icon.svg', enabled: false }
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
