export interface Offer {
  id: string
  title: string
  type: 'percentage' | 'unifiedPrice'
  discount: number
  startDate?: string
  endDate?: string
  startTime?: string
  endTime?: string
  isActive: boolean
  order?: number
}
