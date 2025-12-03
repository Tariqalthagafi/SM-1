// 📁 src/types/contexts/menuDesign.ts

// 🧩 أنواع التخطيط
export type MenuLayout =
  | 'grid'
  | 'list'
  | 'sections'
  | 'vertical'
  | 'cards'
  | 'sectioned'
  | 'sidebarCategories'
  | 'gridCategories'
  | 'pagedCategories'

export interface LayoutSettings {
  layout: MenuLayout
}

// 🎨 أنواع الألوان
export interface ColorSettings {
  headerBackground: string
  
  titleText: string
  priceText: string
  descriptionText: string
  sectionTitleText: string
  allergenIcon: string
  offerLabel: string
  currencyIcon: string         // ✅ جديد
  expiredProductIcon: string   // ✅ جديد
  
  menuPageBackground: string
  topIconsBackground: string
  sectionBackground: string,
  cardBackground: string
  bodyBackground: string
  productBackground: string
  priceBackground: string
  currencyBackground: string    // ✅ جديد
}

// 🧠 إعدادات التصميم الكاملة (تجميع)
export interface MenuDesignSettings extends LayoutSettings {
  colors: ColorSettings
}
