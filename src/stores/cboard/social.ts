import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SocialField, social_key } from '@/types/contexts/social1.ts'
import { supabase } from '@/supabase'

function generate_default_fields(): SocialField[] {
  const defaults: Record<social_key, Omit<SocialField, 'value' | 'is_public'>> = {
    email: { id: 'email', key: 'email', social_type: 'email', label: '📧 البريد الإلكتروني', placeholder: 'your@email.com', input_type: 'email', icon: 'email-icon.svg' },
    phone: { id: 'phone', key: 'phone', social_type: 'phone', label: '📱 رقم التواصل', placeholder: '05xxxxxxxx', input_type: 'tel', icon: 'mobile-icon.svg' },
    website: { id: 'website', key: 'website', social_type: 'website', label: '🌐 الموقع الإلكتروني', placeholder: 'https://example.com', input_type: 'url', icon: 'website-icon.svg' },
    instagram: { id: 'instagram', key: 'instagram', social_type: 'instagram', label: '📸 إنستغرام', placeholder: '@yourname', input_type: 'text', icon: 'instagram-icon.svg' },
    twitter: { id: 'twitter', key: 'twitter', social_type: 'twitter', label: '🐦 تويتر', placeholder: '@yourname', input_type: 'text', icon: 'x-icon.svg' },
    facebook: { id: 'facebook', key: 'facebook', social_type: 'facebook', label: '📘 فيسبوك', placeholder: 'رابط الصفحة أو اسم المستخدم', input_type: 'text', icon: 'facebook-icon.svg' },
    snapchat: { id: 'snapchat', key: 'snapchat', social_type: 'snapchat', label: '👻 سناب شات', placeholder: 'yourname', input_type: 'text', icon: 'snapchat-icon.svg' },
    tiktok: { id: 'tiktok', key: 'tiktok', social_type: 'tiktok', label: '🎵 تيك توك', placeholder: '@yourname', input_type: 'text', icon: 'tiktok-icon.svg' },
    youtube: { id: 'youtube', key: 'youtube', social_type: 'youtube', label: '📺 يوتيوب', placeholder: 'رابط القناة أو اسم المستخدم', input_type: 'text', icon: 'youtube-icon.svg' },
    whatsapp: { id: 'whatsapp', key: 'whatsapp', social_type: 'whatsapp', label: '💬 واتساب', placeholder: 'رابط أو رقم واتساب', input_type: 'text', icon: 'whatsapp-icon.svg' },
    location: { id: 'location', key: 'location', social_type: 'location', label: '📍 الموقع الجغرافي', placeholder: 'https://maps.google.com/?q=...', input_type: 'url', icon: 'maps-icon.svg' }
  }

  return Object.values(defaults).map((field) => ({
    ...field,
    value: '',
    is_public: false
  }))
}

export const use_social_store = defineStore('social', () => {
  const fields = ref<SocialField[]>([])

  async function fetch_user_id(): Promise<string> {
    const { data } = await supabase.auth.getUser()
    return data?.user?.id ?? 'anonymous'
  }

  async function load(): Promise<void> {
    const user_id = await fetch_user_id()
    const { data, error } = await supabase
      .from('social_fields')
      .select('*')
      .eq('user_id', user_id)

    if (error) {
      console.error('❌ Supabase load error:', error.message)
    }

    const defaults = generate_default_fields()

    if (data && Array.isArray(data) && data.length > 0) {
      // دمج البيانات القادمة من Supabase مع الافتراضية
      fields.value = defaults.map(def => {
        const remote = data.find(d => d.key === def.key)
        return remote ? { ...def, ...remote } : def
      })
    } else {
      fields.value = defaults
      await sync_to_supabase()
    }
  }

  function get_field(key: social_key): SocialField {
    const found = fields.value.find((f) => f.key === key)
    if (found) return found

    const defaults = generate_default_fields()
    return defaults.find(f => f.key === key)!
  }

  function update_value(key: social_key, new_value: string): void {
    const field = get_field(key)
    field.value = new_value
    sync_to_supabase()
  }

  function toggle_visibility(key: social_key): void {
    const field = get_field(key)
    field.is_public = !field.is_public
    sync_to_supabase()
  }

  function reset_fields(): void {
    fields.value = generate_default_fields()
    sync_to_supabase()
  }

  function get_all_public_fields(): SocialField[] {
    return fields.value.filter((f: SocialField) => f.is_public)
  }

  async function sync_to_supabase(): Promise<void> {
    const user_id = await fetch_user_id()
    const payload = fields.value.map((f: SocialField) => ({
      id: `${user_id}:${f.key}`,
      user_id,
      key: f.key,
      value: f.value,
      is_public: f.is_public
    }))
    const { error } = await supabase.from('social_fields').upsert(payload, { onConflict: 'id' })
    if (error) {
      console.error('❌ Supabase save error:', error.message)
    } else {
      console.log('✅ Saved to Supabase:', payload)
    }
  }

  return {
    fields,
    fetch_user_id,
    load,
    update_value,
    toggle_visibility,
    reset_fields,
    get_field,
    get_all_public_fields,
    sync_to_supabase
  }
})
