// 📁 src/stores/cboard/MenuDesign/readyPresets.ts
import type { MenuLayout } from '@/types/contexts/menuDesign1.ts'

/**
 * تعريف نوع الألوان مطابق للـ Store
 */
export interface ColorSettings {
  headerBackground: string
  sectionBackground: string
  cardBackground: string
  titleText: string
  priceText: string
  descriptionText: string
  sectionTitleText: string
  currencyIcon: string
  expiredProductIcon: string
}

/**
 * تعريف النموذج الجاهز
 */
export interface ReadyPreset {
  id: string
  name: string
  layout: MenuLayout
  colors: Partial<ColorSettings>
}

/**
 * قائمة النماذج الجاهزة (10 نماذج)
 */
export const readyPresets: ReadyPreset[] = [
  {
    id: 'model1',
    name: 'نموذج 1 - عمودي فاتح',
    layout: 'vertical',
    colors: {
      headerBackground: '#ffffff',
      sectionBackground: '#ffffff',
      cardBackground: '#ffffff',
      titleText: '#000000',
      priceText: '#000000',
      descriptionText: '#000000',
      sectionTitleText: '#000000',
      currencyIcon: '#007bff',
      expiredProductIcon: '#6c757d'
    }
  },
  {
    id: 'model2',
    name: 'نموذج 2 - شبكي داكن',
    layout: 'grid',
    colors: {
      headerBackground: '#222222',
      sectionBackground: '#222222',
      cardBackground: '#333333',
      titleText: '#f9f9f9',
      priceText: '#f9f9f9',
      descriptionText: '#f9f9f9',
      sectionTitleText: '#f9f9f9',
      currencyIcon: '#28a745',
      expiredProductIcon: '#17a2b8'
    }
  },
  {
    id: 'model3',
    name: 'نموذج 3 - بطاقات ملونة',
    layout: 'cards',
    colors: {
      headerBackground: '#fafafa',
      sectionBackground: '#fafafa',
      cardBackground: '#ffebee',
      titleText: '#333333',
      priceText: '#333333',
      descriptionText: '#333333',
      sectionTitleText: '#333333',
      currencyIcon: '#ff5722',
      expiredProductIcon: '#ffc107'
    }
  }
]
