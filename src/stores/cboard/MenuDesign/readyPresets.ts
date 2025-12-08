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
  },
  {
    id: 'model4',
    name: 'نموذج 4 - أقسام زرقاء',
    layout: 'sectioned',
    colors: {
      headerBackground: '#e6f0ff',
      sectionBackground: '#e6f0ff',
      cardBackground: '#cce5ff',
      titleText: '#003366',
      priceText: '#003366',
      descriptionText: '#003366',
      sectionTitleText: '#003366',
      currencyIcon: '#0056b3',
      expiredProductIcon: '#6c8cd5'
    }
  },
  {
    id: 'model5',
    name: 'نموذج 5 - جانبي رمادي',
    layout: 'sidebarCategories',
    colors: {
      headerBackground: '#f0f0f0',
      sectionBackground: '#f0f0f0',
      cardBackground: '#e0e0e0',
      titleText: '#222222',
      priceText: '#222222',
      descriptionText: '#222222',
      sectionTitleText: '#222222',
      currencyIcon: '#6c757d',
      expiredProductIcon: '#adb5bd'
    }
  },
  {
    id: 'model6',
    name: 'نموذج 6 - شبكي ملون',
    layout: 'gridCategories',
    colors: {
      headerBackground: '#fff8e1',
      sectionBackground: '#fff8e1',
      cardBackground: '#ffe0b2',
      titleText: '#4e342e',
      priceText: '#4e342e',
      descriptionText: '#4e342e',
      sectionTitleText: '#4e342e',
      currencyIcon: '#ff9800',
      expiredProductIcon: '#ff5722'
    }
  },
  {
    id: 'model7',
    name: 'نموذج 7 - صفحات خضراء',
    layout: 'pagedCategories',
    colors: {
      headerBackground: '#e8f5e9',
      sectionBackground: '#e8f5e9',
      cardBackground: '#c8e6c9',
      titleText: '#1b5e20',
      priceText: '#1b5e20',
      descriptionText: '#1b5e20',
      sectionTitleText: '#1b5e20',
      currencyIcon: '#43a047',
      expiredProductIcon: '#66bb6a'
    }
  },
  {
    id: 'model8',
    name: 'نموذج 8 - عمودي داكن',
    layout: 'vertical',
    colors: {
      headerBackground: '#121212',
      sectionBackground: '#121212',
      cardBackground: '#1e1e1e',
      titleText: '#eeeeee',
      priceText: '#eeeeee',
      descriptionText: '#eeeeee',
      sectionTitleText: '#eeeeee',
      currencyIcon: '#bb86fc',
      expiredProductIcon: '#03dac6'
    }
  },
  {
    id: 'model9',
    name: 'نموذج 9 - بطاقات وردية',
    layout: 'cards',
    colors: {
      headerBackground: '#fce4ec',
      sectionBackground: '#fce4ec',
      cardBackground: '#f8bbd0',
      titleText: '#880e4f',
      priceText: '#880e4f',
      descriptionText: '#880e4f',
      sectionTitleText: '#880e4f',
      currencyIcon: '#e91e63',
      expiredProductIcon: '#f06292'
    }
  },
  {
    id: 'model10',
    name: 'نموذج 10 - أقسام طبيعية',
    layout: 'sectioned',
    colors: {
      headerBackground: '#f1f8e9',
      sectionBackground: '#f1f8e9',
      cardBackground: '#dcedc8',
      titleText: '#33691e',
      priceText: '#33691e',
      descriptionText: '#33691e',
      sectionTitleText: '#33691e',
      currencyIcon: '#8bc34a',
      expiredProductIcon: '#cddc39'
    }
  }
]
