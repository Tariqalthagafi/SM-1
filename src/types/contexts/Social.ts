// نوع الرابط الفردي
export interface SocialLink {
  value: string
  isPublic: boolean
}

// المفاتيح المدعومة
export type SocialKey =
  | 'email'
  | 'phone'
  | 'website'
  | 'instagram'
  | 'twitter'
  | 'facebook'
  | 'snapchat'
  | 'tiktok'
  | 'youtube'
  | 'whatsapp'

// الكائن الكامل الذي يُخزن في IndexedDB
export interface SocialLinks {
  id: string // مفتاح التخزين داخل IndexedDB، مثل 'site-social'
  email: SocialLink
  phone: SocialLink
  website: SocialLink
  instagram: SocialLink
  twitter: SocialLink
  facebook: SocialLink
  snapchat: SocialLink
  tiktok: SocialLink
  youtube: SocialLink
  whatsapp: SocialLink
}
