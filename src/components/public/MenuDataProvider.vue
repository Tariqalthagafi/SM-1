<template>
  <MenuRenderer
    :isActive="isActive"
    :layout="layout"
    :products="products"
    :sections="sections"
    :settings="settings"
    :colors="settings.colors"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
import MenuRenderer from './MenuRenderer.vue'
import { readyPresets, type ReadyPreset } from '@/stores/cboard/MenuDesign/readyPresets.ts'

const props = defineProps<{ shortId: string }>()

const isActive = ref(true)
const layout = ref<'vertical' | 'grid' | 'cards' | 'sectioned' | 'sidebar' | 'paged'>('grid')
const products = ref<any[]>([])
const sections = ref<any[]>([])
const settings = ref({
  currencySymbol: 'SAR',
  currencyKey: 'SAR',
  imageShape: 'roundedSquare',
  offerStyle: 'strikeWithBadge',
  allergenIconStyle: 'mono',
  colors: {} as Record<string, string>,
  fontFamily: 'Tajawal, sans-serif'
})

onMounted(async () => {
  // ✅ حماية من undefined
  if (!props.shortId) {
    console.error('🚨 shortId غير موجود في props')
    return
  }
  console.log('📌 shortId المستلم:', props.shortId)

  // ✅ تحويل shortId إلى uuid كامل
  const { data: menu, error: menuError } = await supabase
    .from('menu_settings')
    .select('id, ready_preset')
    .eq('short_id', props.shortId)
    .single()

  if (menuError) {
    console.error('🚨 خطأ في menu_settings:', menuError)
    return
  }
  if (!menu) {
    console.error('🚨 لم يتم العثور على سجل في menu_settings للـ shortId:', props.shortId)
    return
  }
  console.log('📌 نتيجة menu_settings:', menu)

  const fullUuid = menu.id
  let activePreset: ReadyPreset | null = null

  if (menu.ready_preset) {
    activePreset = readyPresets.find(p => p.id === menu.ready_preset) ?? null
    console.log('📌 ready_preset المختار:', activePreset)
  }

  // ✅ تنفيذ الاستعلامات بالتوازي
  const [templateRes, colorRes, productsRes] = await Promise.all([
    supabase.from('template_settings')
      .select('layout_id, font_family, offer_style, image_shape, currency_symbol, allergen_style')
      .eq('id', fullUuid)
      .single(),
    supabase.from('color_presets')
      .select('colors')
      .eq('id', fullUuid)
      .maybeSingle(),
    supabase.from('products')
      .select('*')
      .eq('user_id', fullUuid)
  ])

  console.log('📌 template_settings:', templateRes.data, '🚨 خطأ:', templateRes.error)
  console.log('📌 color_presets:', colorRes.data, '🚨 خطأ:', colorRes.error)
  console.log('📌 products:', productsRes.data?.length, '🚨 خطأ:', productsRes.error)

  const templateData = templateRes.data
  const colorData = colorRes.data
  const productsData = productsRes.data

  const colors = activePreset?.colors ?? colorData?.colors ?? {
    bodyBackground: '#ffffff',
    cardBackground: '#ffffff',
    titleText: '#000000',
    priceText: '#000000'
  }

  // ✅ settings
  settings.value = {
    currencySymbol: templateData?.currency_symbol ?? 'SAR',
    currencyKey: templateData?.currency_symbol ?? 'SAR',
    imageShape: templateData?.image_shape ?? 'roundedSquare',
    offerStyle: templateData?.offer_style ?? 'strikeWithBadge',
    allergenIconStyle: templateData?.allergen_style ?? 'mono',
    colors,
    fontFamily: templateData?.font_family ?? 'Tajawal, sans-serif'
  }
  console.log('📌 settings النهائية:', settings.value)

  // ✅ لو فيه نموذج جاهز مختار نطبقه، وإلا نستخدم القيمة من template_settings
  layout.value = activePreset?.layout ?? templateData?.layout_id ?? 'grid'
  console.log('📌 layout المستخدم:', layout.value)

  // ✅ products
  products.value = productsData ?? []
  console.log('📌 عدد المنتجات:', products.value.length)

  // ✅ sections
  const sectionMap = new Map<string, any>()
  products.value.forEach(p => {
    if (p.section_id && !sectionMap.has(p.section_id)) {
      sectionMap.set(p.section_id, {
        id: p.section_id,
        name: p.section_name ?? `قسم ${p.section_id}`
      })
    }
  })
  sections.value = Array.from(sectionMap.values())
  console.log('📌 الأقسام المستخرجة:', sections.value)
})
</script>
