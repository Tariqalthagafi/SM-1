import { defineStore } from 'pinia'
import { supabase } from '@/supabase'

export const useRemoteSyncStore = defineStore('remoteSyncStore', () => {
  // ⬆️ مزامنة الهوية التجارية إلى Supabase
  async function syncIdentity(payload: {
    restaurant_name?: string
    business_type?: string
    logo_url?: string | null
    menu_id?: number
  }) {
    const { data: userData, error: authError } = await supabase.auth.getUser()
    const user_id = userData?.user?.id
    if (!user_id || authError) return

    const { error } = await supabase
      .from('home_settings')
      .upsert({ user_id, ...payload }, { onConflict: 'user_id' })

    if (error) console.error('❌ فشل مزامنة الهوية:', error)
  }

  // ⬇️ تحميل الهوية التجارية من Supabase
  async function loadIdentity() {
    const { data: userData, error: authError } = await supabase.auth.getUser()
    const user_id = userData?.user?.id
    if (!user_id || authError) return null

    const { data, error } = await supabase
      .from('home_settings')
      .select('*')
      .eq('user_id', user_id)
      .single()

    if (error) {
      console.error('❌ تحميل الهوية فشل:', error)
      return null
    }

    return data
  }

  // 🖼️ رفع شعار إلى Supabase Storage
  async function uploadLogo(file: File): Promise<string | null> {
    const { data: userData, error: authError } = await supabase.auth.getUser()
    const user_id = userData?.user?.id
    if (!user_id || authError) return null

    const fileExt = file.name.split('.').pop()
    const fileName = `logo-${user_id}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('logos')
      .upload(fileName, file, {
        upsert: true,
        metadata: { owner: user_id }
      })

    if (uploadError) {
      console.error('❌ رفع الشعار فشل:', uploadError)
      return null
    }

    const { data: urlData } = supabase.storage
      .from('logos')
      .getPublicUrl(fileName)

    return urlData?.publicUrl ?? null
  }

  // 🗑️ حذف شعار من Supabase Storage
  async function deleteLogo(publicUrl: string) {
    const fileName = publicUrl.split('/logos/')[1]
    if (!fileName) return

    const { error } = await supabase.storage
      .from('logos')
      .remove([fileName])

    if (error) console.error('❌ حذف الشعار فشل:', error)
  }

  return {
    syncIdentity,
    loadIdentity,
    uploadLogo,
    deleteLogo
  }
})
