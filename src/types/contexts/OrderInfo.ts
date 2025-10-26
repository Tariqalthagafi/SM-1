export interface TimePeriod {
  from: string
  to: string
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

