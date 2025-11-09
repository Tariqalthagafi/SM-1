import { defineStore } from 'pinia'
import { supabase } from '@/supabase'

// استيراد الستورات المنفصلة
import { useFontStore } from './fontStore'
import { useCurrencyStore } from './currencyStore'
import { useOfferStyleStore } from './offerStyleStore'
import { useExpiredStyleStore } from './expiredStyleStore'
import { useImageShapeStore } from './imageShapeStore'
import { useAllergenStyleStore } from './allergenStyleStore'
import { useLayoutEditorStore } from '@/stores/cboard/MenuDesign/LayoutEditor'

export const useTemplateSettingsStore = defineStore('templateSettings', () => {
  const fontStore = useFontStore()
  const currencyStore = useCurrencyStore()
  const offerStyleStore = useOfferStyleStore()
  const expiredStyleStore = useExpiredStyleStore()
  const imageShapeStore = useImageShapeStore()
  const allergenStyleStore = useAllergenStyleStore()
  const layoutStore = useLayoutEditorStore()


  async function loadFromSupabase() {
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user?.id) return

    const userId = userData.user.id

    const { data, error } = await supabase
      .from('template_settings')
      .select('*')
      .eq('created_by', userId)
      .single()

    if (error || !data) return

    fontStore.setFont(data.font_family)
    currencyStore.setCurrency(data.currency_symbol)
    offerStyleStore.setOfferStyle(data.offer_style)
    expiredStyleStore.setExpiredStyle(data.expired_style)
    imageShapeStore.setImageShape(data.image_shape)
    allergenStyleStore.setAllergenStyle(data.allergen_style)
    layoutStore.setLayout(data.layout_id)

  }

  async function saveToSupabase() {
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user?.id) return

    const userId = userData.user.id

    const payload = {
      font_family: fontStore.fontFamily,
      currency_symbol: currencyStore.currencySymbol,
      offer_style: offerStyleStore.offerStyle,
      expired_style: expiredStyleStore.expiredStyle,
      image_shape: imageShapeStore.imageShape,
      allergen_style: allergenStyleStore.allergenIconStyle,
      layout_id: layoutStore.layout,
      created_by: userId
    }

    const { error } = await supabase
      .from('template_settings')
      .upsert([payload], { onConflict: 'created_by' })

    if (error) {
      console.error('خطأ في حفظ إعدادات القالب إلى Supabase:', error.message)
    }
  }

  return {
    loadFromSupabase,
    saveToSupabase
  }
})
