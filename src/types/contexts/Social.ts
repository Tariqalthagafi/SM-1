// المفاتيح الموحدة لكل نوع من الحقول الاجتماعية
export type social_key =
  | 'email'
  | 'phone'
  | 'whatsapp'
  | 'website'
  | 'instagram'
  | 'twitter'
  | 'facebook'
  | 'snapchat'
  | 'tiktok'
  | 'youtube'
  | 'location'

// نوع السوشيال ميديا (للتصنيف أو الفلترة)
export type SocialType = social_key

// النموذج الموحد لكل حقل اجتماعي
export interface SocialField {
  id: string                     // معرف فريد للكائن (يمكن أن يساوي key أو يكون UUID)
  key: social_key               // المفتاح الموحد داخل النظام
  social_type: SocialType       // نوع السوشيال ميديا (للتصنيف أو العرض)
  label: string                 // التسمية الظاهرة في الواجهة
  placeholder: string           // النص التوضيحي داخل الحقل
  input_type: 'text' | 'email' | 'tel' | 'url'  // نوع الإدخال المناسب
  icon: string                  // اسم ملف الأيقونة (مثلاً: 'email-icon.svg')
  value: string                 // القيمة المدخلة من المستخدم
  is_public: boolean            // هل الحقل ظاهر للزوار أو العملاء
  created_by?: string           // اختياري: معرف من أنشأ الحقل
  updated_at?: string           // اختياري: تاريخ آخر تعديل
}

