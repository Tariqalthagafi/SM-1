export interface Product {
  id: string
  name: string
  description?: string
  calories?: number
  allergens?: string[]
  image_blob?: Blob
  status?: 'visible' | 'hidden' | 'expired'
  sequ: number
  section_name?: string
  section_id?: string
  selected_offer_id?: string
  selected_offer_title?: string
  base_price?: number
  final_price?: number
  image_url?: string
  image_base64?: string
  has_allergens?: boolean
  created_by?: string
}
