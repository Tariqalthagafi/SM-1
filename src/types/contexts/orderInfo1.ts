export interface TimePeriod {
  type: 'first' | 'second' | 'full'
  from: string
  to: string
  enabled: boolean
}


export type OperatingHours = Record<string, TimePeriod[]>

export interface DeliveryMethod {
  name: string
  enabled: boolean
  icon: string
}

export interface PaymentMethod {
  name: string
  enabled: boolean
  icon: string
  
}

export interface OrderInfoSettings {
  operatingHours: OperatingHours
  deliveryMethods: DeliveryMethod[]
  paymentMethods: PaymentMethod[]
}
