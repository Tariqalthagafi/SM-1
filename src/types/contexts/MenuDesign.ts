// 📁 src/types/contexts/menuDesign.ts

// 🧩 أنواع التخطيط
export type MenuLayout =
  | 'grid'
  | 'list'
  | 'sections'
  | 'vertical'
  | 'cards'
  | 'sectioned'

export interface LayoutSettings {
  layout: MenuLayout
}

// 🎨 أنواع الألوان
export interface ColorSettings {
  headerBackground: string
  sectionBackground: string
  cardBackground: string
  titleText: string
  priceText: string
  descriptionText: string
  allergenIcon: string
}

// 🧠 إعدادات التصميم الكاملة (تجميع)
export interface MenuDesignSettings extends LayoutSettings {
  colors: ColorSettings
}
