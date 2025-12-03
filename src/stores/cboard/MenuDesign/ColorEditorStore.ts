import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ColorSettings } from '@/types/contexts/menuDesign1.ts'
import { indexedDBService } from '@/services/indexedDBService'
import { supabase } from '@/supabase'

const selectedPreset = ref<string>('مخصص 1')


export const useColorEditorStore = defineStore('colorEditorStore', () => {
  // ✅ الحالة الأساسية للألوان
  const colors = ref<ColorSettings>({
    headerBackground: '#ffffff',
    titleText: '#000000',
    priceText: '#333333',
    descriptionText: '#666666',
    allergenIcon: '#ff0000',
    offerLabel: '#007bff',
    sectionTitleText: '#222222',
    currencyIcon: '#009688',
    expiredProductIcon: '#9e9e9e',
    currencyBackground: '#ffe0b2',
    
    menuPageBackground: '#ffffff',
    topIconsBackground: '#f5f5f5',
    sectionBackground: '#f0f0f0',
    cardBackground: '#ffffff',
    bodyBackground: '#f0f0f0',
    productBackground: '#ffffff',
    priceBackground: '#fff8e1',
    })

  // ✅ تعديل لون مفرد
  function setColor(key: keyof ColorSettings, value: string) {
    colors.value[key] = value
  }

  // ✅ تطبيق مجموعة ألوان كاملة
  function setColors(newColors: Partial<ColorSettings>) {
    colors.value = { ...colors.value, ...newColors }
  }

  // ✅ تحميل الألوان من نمط معين
  async function loadColors(presetName: string) {
    const saved = await indexedDBService.getColors(`preset-${presetName}`)
    if (saved && typeof saved === 'object') {
      colors.value = { ...colors.value, ...(saved as ColorSettings) }
    }
  }

  // ✅ حفظ الألوان في نمط معين
async function saveColors(presetName?: string) {
  const name = presetName ?? selectedPreset.value
  await indexedDBService.saveColors(colors.value, `preset-${name}`)
}


  // ✅ حفظ النسخة الأصلية للنمط (لأجل إعادة الضبط)
async function saveDefaultPreset(presetName: string) {
  await indexedDBService.saveSetting(`preset-default-${presetName}`, JSON.parse(JSON.stringify(colors.value)))
  await savePresetToSupabase(presetName)
}


  // ✅ إعادة ضبط النمط إلى حالته الأصلية
async function resetPreset(presetName?: string) {
  const name = presetName ?? selectedPreset.value
  const saved = await indexedDBService.getSetting(`preset-default-${name}`)
  if (saved && typeof saved === 'object') {
    colors.value = { ...saved as ColorSettings }
    await saveColors(name)
  }
}

function setSelectedPreset(name: string) {
  selectedPreset.value = name
}

async function savePresetToSupabase(presetName: string) {
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData?.user?.id) return

  const userId = userData.user.id

  const { error } = await supabase
    .from('color_presets')
    .upsert([{
      id: presetName,
      colors: colors.value,
      is_system: false,
      created_by: userId
    }], { onConflict: 'id' })

  if (error) {
    console.error('خطأ في حفظ النمط إلى Supabase:', error.message)
  }
}

async function loadPresetFromSupabase(presetName: string) {
  const { data, error } = await supabase
    .from('color_presets')
    .select('colors')
    .eq('id', presetName)
    .single()

  if (error || !data?.colors) {
    console.warn('تعذر تحميل النمط من Supabase:', error?.message)
    return
  }

  colors.value = { ...colors.value, ...data.colors }
}

return {
  colors,
  selectedPreset,
  setSelectedPreset,
  setColor,
  setColors,
  loadColors,
  saveColors,
  saveDefaultPreset,
  resetPreset
}

})
