export interface Offer {
  id: string
  user_id: string
  title: string
  type: 'percentage' | 'unifiedPrice'
  description?: string | null        // ✅ أضف هذا
  discount_percent?: number          // ✅ أضف هذا
  start_date?: string | null
  end_date?: string | null
  start_time?: string | null
  end_time?: string | null
  is_active: boolean
  created_at?: string | null         // ✅ أضف هذا
  discount: number 
  
}
