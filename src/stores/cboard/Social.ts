import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SocialLinks, SocialKey } from '@/types/contexts/Social'
import { indexedDBService } from '@/services/indexedDBService'

const STORE_NAME = 'social'
const DEFAULT_ID = 'site-social'

export const useSocialStore = defineStore('socialStore', () => {
  const links = ref<SocialLinks>({
    id: DEFAULT_ID,
    email: { value: '', isPublic: true },
    phone: { value: '', isPublic: true },
    website: { value: '', isPublic: true },
    instagram: { value: '', isPublic: true },
    twitter: { value: '', isPublic: true },
    facebook: { value: '', isPublic: true },
    snapchat: { value: '', isPublic: true },
    tiktok: { value: '', isPublic: true },
    youtube: { value: '', isPublic: true },
    whatsapp: { value: '', isPublic: true },
    location: { value: '', isPublic: true},

  })

  async function load() {
    const saved = await indexedDBService.get(STORE_NAME, DEFAULT_ID)
    if (saved) links.value = saved
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
