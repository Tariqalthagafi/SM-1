import { defineStore } from 'pinia'
import { ref } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'
import { supabase } from '@/supabase'

export const useHomeStore = defineStore('homeStore', () => {
  // 🏷️ الحقول الأساسية
  const restaurantName = ref('')
  const businessType = ref('مطعم')
  const logoUrl = ref<string | null>(null)
  const menuId = ref<string | null>(null)

  // 📌 تحميل البيانات من IndexedDB و Supabase
  async function initStore() {
    await ensureHomeSettings()
    await loadFromSupabase()

    const savedName = await indexedDBService.get('home', 'restaurantName')
    if (savedName) restaurantName.value = savedName.value

    const savedType = await indexedDBService.get('home', 'businessType')
    if (savedType) businessType.value = savedType.value

    const savedLogo = await indexedDBService.get('home', 'logoUrl')
    if (savedLogo) logoUrl.value = savedLogo.value

    const savedMenuId = await indexedDBService.get('home', 'menuId')
    if (savedMenuId) {
      menuId.value = savedMenuId.value
    } else {
      menuId.value = 'MENU-' + Math.floor(100000 + Math.random() * 900000)
      await indexedDBService.put('home', { id: 'menuId', value: menuId.value })
    }
  }

  // ✏️ تحديث الحقول بشكل منفصل
  async function setRestaurantName(name: string) {
    restaurantName.value = name
    await indexedDBService.put('home', { id: 'restaurantName', value: name })

    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id
    if (!userId) return

    await supabase
      .from('home_settings')
      .update({ restaurant_name: name })
      .eq('user_id', userId)
  }

  async function setBusinessType(type: string) {
    businessType.value = type
    await indexedDBService.put('home', { id: 'businessType', value: type })

    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id
    if (!userId) return

    await supabase
      .from('home_settings')
      .update({ business_type: type })
      .eq('user_id', userId)
  }

  async function setLogoUrl(url: string | null) {
    logoUrl.value = url
    await indexedDBService.put('home', { id: 'logoUrl', value: url })

    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id
    if (!userId) return

    await supabase
      .from('home_settings')
      .update({ logo_url: url })
      .eq('user_id', userId)
  }

  // 🖼️ رفع الشعار إلى Supabase Storage
  async function uploadLogoToStorage(file: File) {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id
    if (!userId) return

    const fileExt = file.name.split('.').pop()
    const fileName = `logo-${userId}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('logos')
      .upload(fileName, file, { upsert: true })

    if (uploadError) {
      console.error('❌ خطأ في رفع الشعار:', uploadError)
      return
    }

    const { data: urlData } = supabase.storage
      .from('logos')
      .getPublicUrl(fileName)

    logoUrl.value = urlData?.publicUrl ?? null
    await indexedDBService.put('home', { id: 'logoUrl', value: logoUrl.value })
    await setLogoUrl(logoUrl.value)
  }

  // 🗑️ حذف الشعار من Supabase Storage
  async function deleteLogoFromStorage() {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id
    if (!userId || !logoUrl.value) return

    const fileName = logoUrl.value.split('/').pop()
    if (!fileName) return

    await supabase.storage.from('logos').remove([fileName])
    logoUrl.value = null
    await indexedDBService.put('home', { id: 'logoUrl', value: null })
    await setLogoUrl(null)
  }

  // ☁️ تحميل من Supabase
  async function loadFromSupabase() {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id
    if (!userId) return

    const { data } = await supabase
      .from('home_settings')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (data) {
      restaurantName.value = data.restaurant_name
      businessType.value = data.business_type
      logoUrl.value = data.logo_url
      menuId.value = data.menu_id
    }
  }

  // ✅ إنشاء صف إذا لم يكن موجودًا
  async function ensureHomeSettings() {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id
    if (!userId) return

    const { data } = await supabase
      .from('home_settings')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle()

    if (!data) {
      const payload = {
        user_id: userId,
        restaurant_name: restaurantName.value,
        business_type: businessType.value,
        logo_url: logoUrl.value,
        menu_id: menuId.value ?? 'MENU-' + Math.floor(100000 + Math.random() * 900000)
      }

      await supabase
        .from('home_settings')
        .upsert([payload], { onConflict: 'user_id' })
    }
  }

  return {
    restaurantName,
    businessType,
    logoUrl,
    menuId,
    initStore,
    setRestaurantName,
    setBusinessType,
    setLogoUrl,
    uploadLogoToStorage,
    deleteLogoFromStorage
  }
})
