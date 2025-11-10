// src/types/contexts/OrderInfoView.ts

export type OperatingPeriod = {
  from: string // وقت بداية الفترة بصيغة HH:mm
  to: string   // وقت نهاية الفترة بصيغة HH:mm
}

export interface OperatingHours {
  [day: string]: OperatingPeriod[] // يمكن أن يحتوي اليوم على أكثر من فترة
}

export interface DeliveryMethod {
  name: string       // اسم طريقة الاستلام (مثل "توصيل مباشر")
  enabled: boolean   // هل الطريقة مفعّلة أم لا
}

export interface PaymentMethod {
  name: string       // اسم طريقة الدفع (مثل "مدى")
  enabled: boolean   // هل الطريقة مفعّلة أم لا
}

export interface OrderInfoSettings {
  operatingHours: OperatingHours       // جدول مواعيد العمل
  deliveryMethods: DeliveryMethod[]    // طرق استلام الطلب
  paymentMethods: PaymentMethod[]      // طرق الدفع
}
