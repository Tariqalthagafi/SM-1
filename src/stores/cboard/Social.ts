import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SocialLinks, SocialKey } from '@/types/contexts/Social'
import { indexedDBService } from '@/services/indexedDBService'

const STORE_NAME = 'social'
const DEFAULT_ID = 'site-social'

export const useSocialStore = defineStore('socialStore', () => {
const links = ref<SocialLinks>({
  id: DEFAULT_ID,
  email:    { value: '', isPublic: false, icon: 'email-icon.svg' },
  phone:    { value: '', isPublic: false, icon: 'mobile-icon.svg' },
  website:  { value: '', isPublic: false, icon: 'website-icon.svg' },
  instagram:{ value: '', isPublic: false, icon: 'instagram-icon.svg' },
  twitter:  { value: '', isPublic: false, icon: 'x-icon.svg' },
  facebook: { value: '', isPublic: false, icon: 'facebook-icon.svg' },
  snapchat: { value: '', isPublic: false, icon: 'snapchat-icon.svg' },
  tiktok:   { value: '', isPublic: false, icon: 'tiktok-icon.svg' },
  youtube:  { value: '', isPublic: false, icon: 'youtube-icon.svg' },
  whatsapp: { value: '', isPublic: false, icon: 'whatsapp-icon.svg' },
  location: { value: '', isPublic: false, icon: 'maps-icon.svg' }
})

const defaultLinks = {
  email:    { value: '', isPublic: false, icon: 'email-icon.svg' },
  phone:    { value: '', isPublic: false, icon: 'mobile-icon.svg' },
  website:  { value: '', isPublic: false, icon: 'website-icon.svg' },
  instagram:{ value: '', isPublic: false, icon: 'instagram-icon.svg' },
  twitter:  { value: '', isPublic: false, icon: 'x-icon.svg' },
  facebook: { value: '', isPublic: false, icon: 'facebook-icon.svg' },
  snapchat: { value: '', isPublic: false, icon: 'snapchat-icon.svg' },
  tiktok:   { value: '', isPublic: false, icon: 'tiktok-icon.svg' },
  youtube:  { value: '', isPublic: false, icon: 'youtube-icon.svg' },
  whatsapp: { value: '', isPublic: false, icon: 'whatsapp-icon.svg' },
  location: { value: '', isPublic: false, icon: 'maps-icon.svg' }
}

async function load() {
  const saved = await indexedDBService.get(STORE_NAME, DEFAULT_ID)
  if (saved) {
   for (const key in defaultLinks) {
  const typedKey = key as SocialKey
  links.value[typedKey] = {
    ...defaultLinks[typedKey],
    ...(saved[typedKey] || {})
  }
}

  }
}


  async function updateLinkValue(key: SocialKey, value: string) {
    links.value[key].value = value
    await persist()
  }

  async function toggleLinkVisibility(key: SocialKey) {
    links.value[key].isPublic = !links.value[key].isPublic
    await persist()
  }

async function persist() {
  const plain = JSON.parse(JSON.stringify(links.value))
  await indexedDBService.put(STORE_NAME, plain)
}


  return {
    links,
    updateLinkValue,
    toggleLinkVisibility,
    load
  }
})
