export interface Product {
  user_id: string
  id: string
  name: string
  description?: string
  calories?: number
  allergens?: string[]
  image_blob?: Blob
  status?: 'visible' | 'hidden' | 'expired'
  sequ: number
  section_name?: string | null
  section_id?: string | null
  selected_offer_id?: string | null
  selected_offer_title?: string | null
  base_price?: number
  final_price?: number
  image_url?: string
  image_base64?: string
  has_allergens?: boolean
  
  is_active?: boolean
}
