import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SocialField, social_key } from '@/types/contexts/social1.ts'
import { indexedDBService } from '@/services/indexedDBService'
import { supabase } from '@/supabase'

function generate_default_fields(): SocialField[] {
  const defaults: Record<social_key, Omit<SocialField, 'value' | 'is_public'>> = {
    email: {
      id: 'email',
      key: 'email',
      social_type: 'email',
      label: '📧 البريد الإلكتروني',
      placeholder: 'your@email.com',
      input_type: 'email',
      icon: 'email-icon.svg'
    },
    phone: {
      id: 'phone',
      key: 'phone',
      social_type: 'phone',
      label: '📱 رقم التواصل',
      placeholder: '05xxxxxxxx',
      input_type: 'tel',
      icon: 'mobile-icon.svg'
    },
    website: {
      id: 'website',
      key: 'website',
      social_type: 'website',
      label: '🌐 الموقع الإلكتروني',
      placeholder: 'https://example.com',
      input_type: 'url',
      icon: 'website-icon.svg'
    },
    instagram: {
      id: 'instagram',
      key: 'instagram',
      social_type: 'instagram',
      label: '📸 إنستغرام',
      placeholder: '@yourname',
      input_type: 'text',
      icon: 'instagram-icon.svg'
    },
    twitter: {
      id: 'twitter',
      key: 'twitter',
      social_type: 'twitter',
      label: '🐦 تويتر',
      placeholder: '@yourname',
      input_type: 'text',
      icon: 'x-icon.svg'
    },
    facebook: {
      id: 'facebook',
      key: 'facebook',
      social_type: 'facebook',
      label: '📘 فيسبوك',
      placeholder: 'رابط الصفحة أو اسم المستخدم',
      input_type: 'text',
      icon: 'facebook-icon.svg'
    },
    snapchat: {
      id: 'snapchat',
      key: 'snapchat',
      social_type: 'snapchat',
      label: '👻 سناب شات',
      placeholder: 'yourname',
      input_type: 'text',
      icon: 'snapchat-icon.svg'
    },
    tiktok: {
      id: 'tiktok',
      key: 'tiktok',
      social_type: 'tiktok',
      label: '🎵 تيك توك',
      placeholder: '@yourname',
      input_type: 'text',
      icon: 'tiktok-icon.svg'
    },
    youtube: {
      id: 'youtube',
      key: 'youtube',
      social_type: 'youtube',
      label: '📺 يوتيوب',
      placeholder: 'رابط القناة أو اسم المستخدم',
      input_type: 'text',
      icon: 'youtube-icon.svg'
    },
    whatsapp: {
      id: 'whatsapp',
      key: 'whatsapp',
      social_type: 'whatsapp',
      label: '💬 واتساب',
      placeholder: 'رابط أو رقم واتساب',
      input_type: 'text',
      icon: 'whatsapp-icon.svg'
    },
    location: {
      id: 'location',
      key: 'location',
      social_type: 'location',
      label: '📍 الموقع الجغرافي',
      placeholder: 'https://maps.google.com/?q=...',
      input_type: 'url',
      icon: 'maps-icon.svg'
    }
  }

  return Object.values(defaults).map((field) => ({
    ...field,
    value: '',
    is_public: false
  }))
}

function is_valid_fields(data: unknown): data is SocialField[] {
  return Array.isArray(data) && data.every((item) =>
    typeof item === 'object' &&
    typeof item.key === 'string' &&
    typeof item.value === 'string' &&
    typeof item.is_public === 'boolean'
  )
}

export const use_social_store = defineStore('social', () => {
  const fields = ref<SocialField[]>([])

  async function fetch_user_id(): Promise<string> {
    const { data } = await supabase.auth.getUser()
    return data?.user?.id ?? 'anonymous'
  }

  async function load(): Promise<void> {
    const stored = await indexedDBService.getAllSocialFields()
    if (!is_valid_fields(stored)) {
      fields.value = generate_default_fields()
      for (const field of fields.value) {
        await indexedDBService.saveSocialField({ ...field })
      }
    } else {
      fields.value = stored
    }
  }

  async function persist_field(key: social_key): Promise<void> {
    const field = get_field(key)
    const clean = JSON.parse(JSON.stringify(field))
    if (!clean.key) clean.key = key
    await indexedDBService.saveSocialField(clean)
    if (navigator.onLine) await sync_to_supabase()
  }

  function update_value(key: social_key, new_value: string): void {
    const field = get_field(key)
    field.value = new_value
    persist_field(key)
  }

  function toggle_visibility(key: social_key): void {
    const field = get_field(key)
    field.is_public = !field.is_public
    persist_field(key)
  }

  function reset_fields(): void {
    fields.value = generate_default_fields()
    for (const field of fields.value) {
      indexedDBService.saveSocialField({ ...field })
    }
  }

  function get_field(key: social_key): SocialField {
    const found = fields.value.find((f) => f.key === key)
    return found ?? {
      id: key,
      key,
      social_type: key,
      label: '',
      placeholder: '',
      input_type: 'text',
      icon: '',
      value: '',
      is_public: false
    }
  }

  function get_all_public_fields(): SocialField[] {
    return fields.value.filter((f: SocialField) => f.is_public)
  }

  async function sync_from_supabase(): Promise<void> {
    const user_id = await fetch_user_id()
    const { data } = await supabase
      .from('social_fields')
      .select('*')
      .eq('user_id', user_id)

    if (data && Array.isArray(data)) {
      fields.value = data
      for (const field of data) {
        await indexedDBService.saveSocialField(field)
      }
    }
  }

  async function sync_to_supabase(): Promise<void> {
    const user_id = await fetch_user_id()
    const payload = fields.value.map((f: SocialField) => ({
      ...f,
      user_id,
      id: `${user_id}:${f.key}`
    }))
    await supabase.from('social_fields').upsert(payload, { onConflict: 'id' })
  }

  async function sync_bidirectional(): Promise<void> {
    const local = await indexedDBService.getAllSocialFields()
    const user_id = await fetch_user_id()

    const { data: remote } = await supabase
      .from('social_fields')
      .select('*')
      .eq('user_id', user_id)

    if (!remote) return

    const merged: SocialField[] = []

    for (const def of generate_default_fields()) {
      const localField = local.find(f => f.key === def.key)
      const remoteField = remote.find(f => f.key === def.key)

      const resolved = remoteField ?? localField ?? def
      merged.push(resolved)
      await indexedDBService.saveSocialField(resolved)
    }

    fields.value = merged
    await sync_to_supabase()
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
    sync_from_supabase,
    sync_to_supabase,
    sync_bidirectional
  }
})
