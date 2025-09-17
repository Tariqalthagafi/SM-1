export interface Product {
  id: string
  name: string
  description?: string
  calories?: number
  allergens?: string[]
  imageBlob?: Blob
  status?: 'visible' | 'hidden' | 'expired'
  order: number
  sectionName?: string   // ✅ أضفناه هنا
  sectionId?: string
  selectedOfferId?: string
  selectedOfferTitle?: string // لو حابين نخزن اسم العرض أيضًا
  basePrice?: number      // 💰 السعر الأساسي
  finalPrice?: number     // 💰 السعر بعد الخصم
}
