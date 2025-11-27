import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase'

export const useIdentityStore = defineStore('identityStore', () => {
  const restaurantName = ref('')
  const businessType = ref('')
  const logoUrl = ref<string | null>(null)
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)

  // ⬇️ تحميل الهوية التجارية من Supabase
  async function initIdentity() {
    isLoading.value = true
    const { data: userData, error: authError } = await supabase.auth.getUser()
    const user_id = userData?.user?.id
    if (!user_id || authError) { isLoading.value = false; return }

    const { data, error } = await supabase
      .from('home_settings')
      .select('*')
      .eq('user_id', user_id)
      .single()

    if (!error && data) {
      restaurantName.value = data.restaurant_name ?? ''
      businessType.value = data.business_type ?? ''
      logoUrl.value = data.logo_url ?? null
    }
    isLoading.value = false
  }

  // ⬆️ مزامنة الهوية التجارية إلى Supabase
  async function syncIdentity(payload: {
    restaurant_name?: string
    business_type?: string
    logo_url?: string | null
  }) {
    const { data: userData, error: authError } = await supabase.auth.getUser()
    const user_id = userData?.user?.id
    if (!user_id || authError) return { success: false, error: authError }

    const { error } = await supabase
      .from('home_settings')
      .upsert({ user_id, ...payload }, { onConflict: 'user_id' })

    if (error) {
      console.error('❌ فشل المزامنة:', error.message)
      errorMessage.value = error.message
      return { success: false, error }
    }

    return { success: true }
  }

  // 📝 setters تستدعى فقط عند التأمين
  async function setRestaurantName(name: string) {
    restaurantName.value = name
    return await syncIdentity({ restaurant_name: name })
  }

  async function setBusinessType(type: string) {
    businessType.value = type
    return await syncIdentity({ business_type: type })
  }

  async function setLogoUrl(url: string | null) {
    logoUrl.value = url
    return await syncIdentity({ logo_url: url })
  }

  // 🖼️ رفع شعار إلى Supabase Storage
  async function uploadLogoToStorage(file: File) {
    const { data: userData, error: authError } = await supabase.auth.getUser()
    const user_id = userData?.user?.id
    if (!user_id || authError) return null

    const fileExt = file.name.split('.').pop()
    const fileName = `logo-${user_id}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('logos')
      .upload(fileName, file, { upsert: true })

    if (uploadError) { errorMessage.value = uploadError.message; return null }

    const { data: urlData } = supabase.storage
      .from('logos')
      .getPublicUrl(fileName)

    const url = urlData?.publicUrl ?? null
    if (url) await setLogoUrl(url)
    return url
  }

  // 🗑️ حذف شعار من Supabase Storage
  async function deleteLogoFromStorage() {
    if (!logoUrl.value) return
    const fileName = logoUrl.value.split('/logos/')[1]
    if (!fileName) return

    await supabase.storage.from('logos').remove([fileName])
    await setLogoUrl(null)
  }

  return {
    restaurantName,
    businessType,
    logoUrl,
    isLoading,
    errorMessage,
    initIdentity,
    setRestaurantName,
    setBusinessType,
    setLogoUrl,
    uploadLogoToStorage,
    deleteLogoFromStorage
  }
})
