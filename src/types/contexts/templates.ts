// ===============================
// أنواع ثابتة (Reusable Types)
// ===============================

// من themes.ts
export type ExpiredStyle =
  | 'strike'              // شطب السعر
  | 'dimmed'              // تظليل المنتج بلون رمادي
  | 'hide'                // إخفاء المنتج بالكامل
  | 'badge'

export type OfferStyle =
  | 'oldNewStacked'
  | 'badgeWithNewPrice'
  | 'inlineStrikeThrough' 
  | 'strike' 
  | 'badge' 
  | 'priceOnly'

export type CardShape = 'rounded' | 'flat' | 'shadowed'
export type FontSize = 'small' | 'medium' | 'large'

// من templates.ts
export type ImageShape = 'circle' | 'square' | 'rectangle' | 'none'
export type AllergenIconStyle = 'colored' | 'outline' | 'flat'| 'hidden' | 'monochrome'

// ===============================
// إعدادات القالب (Template Settings)
// ===============================
export interface TemplateSettings {
  colors: Record<string, string>
  fontFamily: string
  offerStyle: OfferStyle
  expiredStyle: ExpiredStyle
  currencySymbol?: string
  imageShape?: ImageShape
  allergens?: string[]
  allergenIconStyle?: AllergenIconStyle
  allergenIconColor?: string
}

// ===============================
// تعريف القالب (Template Config)
// ===============================
export interface TemplateConfig {
  id: string
  name: string
  layout: string
  css: string
  previewImage?: string
  defaultSettings: TemplateSettings
  allowedCustomizations: {
    backgroundColors?: string[]
    textColors?: string[]
    font?: boolean
    offerStyles?: OfferStyle[]
    expiredStyles?: ExpiredStyle[]
    imageShapes?: ImageShape[]
    allergens?: string[]
    allergenIconStyles?: AllergenIconStyle[]
    allergenIconColor?: string
  }
  createdAt?: string
  updatedAt?: string
}

// ===============================
// نسخة مخصصة من القالب (Template Instance)
// ===============================
export interface TemplateInstance {
  id: string
  settings: TemplateSettings
  createdAt?: string
  updatedAt?: string
}

// ===============================
// إعدادات التصميم (Design Config)
// ===============================
export type DesignConfig = {
  id: 'default'
  themeId: string
  expiredStyle: ExpiredStyle
  offerStyle: OfferStyle
  cardShape?: CardShape
  fontSize?: FontSize
}

// ===============================
// الثيم (Theme Preset)
// ===============================
export type ThemePreset = {
  id: string
  name: string
  primaryColor: string
  secondaryColor: string
  fontFamily: string
  mode: 'light' | 'dark'
  status?: 'active' | 'hidden' | 'disabled'
  createdBy?: 'admin' | 'system' | 'user'
  isDefault?: boolean
  allowedFor?: string[]
}

// ===============================
// عنصر (Item)
// ===============================
export type Item = {
  name: string
  price: number
  status: 'available' | 'expired' | 'discounted'
  discount?: number
}

// ===============================
// هيكل قاعدة بيانات Templix (محدث)
// ===============================
export interface TemplixDBSchema {
  // 📦 كتالوج القوالب الجاهزة
  templates_catalog: TemplateConfig[]

  // 🎯 حالة المخصصين (سجل واحد لكل مخصص)
  customizer_states: {
    id: 'custom1' | 'custom2'
    templateId: string
    settings: TemplateSettings
  }[]

  // 🚀 حالة الإنتاج (سجل واحد فقط)
  production_state: {
    id: 'current'
    templateId: string
    settings: TemplateSettings
  }[]

  // 📝 سجل التعديلات (اختياري)
  template_edits: {
    id?: number
    templateId: string
    changedAt: string
    diff: Record<string, unknown>
  }[]

  // ⚙️ بيانات وصفية للتخصيصات المسموح بها
  customizations_meta: {
    type: string
    data: Record<string, unknown>
    updatedAt?: string
  }[]
}
