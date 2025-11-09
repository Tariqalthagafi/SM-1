export interface Offer {
  id: string
  title: string
  type: 'percentage' | 'unifiedPrice'
  discount: number
  start_date?: string
  end_date?: string
  start_time?: string
  end_time?: string
  is_active: boolean
  created_by?: string
}
