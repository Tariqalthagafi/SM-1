<template>
  <div v-if="isActive">
    <!-- ✅ Grid Layout -->
    <GridLayout
      v-if="layout === 'grid'"
      :products="products"
      :sections="sections"
      :colors="colors"
      :currencySymbol="settings.currencySymbol"
      :currencyKey="settings.currencyKey"
      :imageShape="settings.imageShape as ImageShape"
      :offerStyle="settings.offerStyle as OfferStyle"
      :allergenIconStyle="settings.allergenIconStyle as AllergenStyle"
      :fontFamily="settings.fontFamily"
    />

    <!-- ✅ Vertical Layout -->
    <VerticalLayout
      v-else-if="layout === 'vertical'"
      :products="products"
      :sections="sections"
      :colors="colors"
      :currencySymbol="settings.currencySymbol"
      :currencyKey="settings.currencyKey"
      :imageShape="settings.imageShape as ImageShape"
      :offerStyle="settings.offerStyle as OfferStyle"
      :allergenIconStyle="settings.allergenIconStyle as AllergenStyle"
      :fontFamily="settings.fontFamily"
    />

    <!-- ✅ Cards Layout -->
    <CardsLayout
      v-else-if="layout === 'cards'"
      :products="products"
      :sections="sections"
      :colors="colors"
      :currencySymbol="settings.currencySymbol"
      :currencyKey="settings.currencyKey"
      :imageShape="settings.imageShape as ImageShape"
      :offerStyle="settings.offerStyle as OfferStyle"
      :allergenIconStyle="settings.allergenIconStyle as AllergenStyle"
      :fontFamily="settings.fontFamily"
    />

    <!-- ✅ Sectioned Layout -->
    <SectionedLayout
      v-else-if="layout === 'sectioned'"
      :products="products"
      :sections="sections"
      :colors="colors"
      :currencySymbol="settings.currencySymbol"
      :currencyKey="settings.currencyKey"
      :imageShape="settings.imageShape as ImageShape"
      :offerStyle="settings.offerStyle as OfferStyle"
      :allergenIconStyle="settings.allergenIconStyle as AllergenStyle"
      :fontFamily="settings.fontFamily"
    />

    <!-- ✅ Sidebar Layout -->
    <SidebarView
      v-else-if="layout === 'sidebar'"
      :products="products"
      :sections="sections"
      :colors="colors"
      :currencySymbol="settings.currencySymbol"
      :currencyKey="settings.currencyKey"
      :imageShape="settings.imageShape as ImageShape"
      :offerStyle="settings.offerStyle as OfferStyle"
      :allergenIconStyle="settings.allergenIconStyle as AllergenStyle"
      :fontFamily="settings.fontFamily"
    />

    <!-- ✅ Paged Layout -->
    <PagedView
      v-else-if="layout === 'paged'"
      :products="products"
      :sections="sections"
      :colors="colors"
      :currencySymbol="settings.currencySymbol"
      :currencyKey="settings.currencyKey"
      :imageShape="settings.imageShape as ImageShape"
      :offerStyle="settings.offerStyle as OfferStyle"
      :allergenIconStyle="settings.allergenIconStyle as AllergenStyle"
      :fontFamily="settings.fontFamily"
    />
  </div>
</template>

<script setup lang="ts">
import GridLayout from '@/components/cboard/MenuDesign/shapesmenu/GridLayout.vue'
import VerticalLayout from '@/components/cboard/MenuDesign/shapesmenu/VerticalLayout.vue'
import CardsLayout from '@/components/cboard/MenuDesign/shapesmenu/CardsLayout.vue'
import SectionedLayout from '@/components/cboard/MenuDesign/shapesmenu/SectionedLayout.vue'
import SidebarView from '@/components/cboard/MenuDesign/shapesmenu/SidebarView.vue'
import PagedView from '@/components/cboard/MenuDesign/shapesmenu/PagedView.vue'

// ✅ تعريف الأنواع الصحيحة
type ImageShape = 'circle' | 'roundedSquare' | 'rectangle' | 'hidden'
type OfferStyle = 'strikeOnly' | 'strikeWithSaving' | 'strikeWithBadge'
type AllergenStyle =
  | 'hidden'
  | 'colored'
  | 'outlined'
  | 'monochrome'
  | 'boxedA'
  | 'boldA'
  | 'warningTriangle'
  | undefined

defineProps<{
  isActive: boolean
  layout: 'vertical' | 'grid' | 'cards' | 'sectioned' | 'sidebar' | 'paged'
  products: any[]
  sections: any[]
  settings: {
    currencySymbol: string
    currencyKey: string
    imageShape: ImageShape | string
    offerStyle: OfferStyle | string
    allergenIconStyle: AllergenStyle | string
    fontFamily: string
  }
  colors: Record<string, string>
}>()
</script>
