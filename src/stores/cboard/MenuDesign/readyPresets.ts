import type { MenuLayout } from '@/types/contexts/menuDesign1.ts'

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
  currencyIconUrl?: string
  priceBackground?: string
}

export interface ReadyPreset {
  id: string
  name: string
  layout: MenuLayout
  colors: Partial<ColorSettings>
}

export const readyPresets: ReadyPreset[] = [
{
  id: 'simple',
  name: 'عادي',
  layout: 'grid',
  colors: {
    headerBackground: '#ffffff',
    sectionBackground: '#ffffff',
    cardBackground: '#ffffff',
    titleText: '#000000',
    priceText: '#000000',
    descriptionText: '#000000',
    sectionTitleText: '#000000',
    currencyIcon: '#000000',
    expiredProductIcon: '#000000',
    currencyIconUrl: '/images/SRS1.svg',
    priceBackground: '#fff'   // ✅ خلفية رمادية فاتحة للسعر
  }
},
{
  id: 'classic',
  name: 'كلاسيك',
  layout: 'vertical',
  colors: {
    headerBackground: '#fafafa',
    sectionBackground: '#f5f5f5',
    cardBackground: '#ffffff',
    titleText: '#000000',
    priceText: '#333333',
    descriptionText: '#444444',
    sectionTitleText: '#000000',
    currencyIcon: '#c49b0b',
    expiredProductIcon: '#777777',
    currencyIconUrl: '/images/SRS1.svg',
    priceBackground: '#fff8e1'   // ✅ خلفية بيج فاتحة للسعر
  }
},
{
  id: 'modern',
  name: 'موديرن',
  layout: 'cards',
  colors: {
    headerBackground: '#121212',
    sectionBackground: '#1e1e1e',
    cardBackground: '#2a2a2a',
    titleText: '#ffffff',
    priceText: '#ff9800',
    descriptionText: '#cccccc',
    sectionTitleText: '#ffffff',
    currencyIcon: '#00bcd4',
    expiredProductIcon: '#e53935',
    currencyIconUrl: '/images/SRS1.svg',
    priceBackground: '#fff'   // ✅ خلفية داكنة للسعر
  }
}
]
