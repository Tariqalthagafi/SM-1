import { defineStore } from 'pinia'
import { ref } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'
import { useRemoteSyncStore } from '@/stores/cboard/home/remoteSyncStore'

export const useIdentityStore = defineStore('identityStore', () => {
  const restaurantName = ref('')
  const businessType = ref('')
  const logoUrl = ref<string | null>(null)

  const remote = useRemoteSyncStore()

  async function loadFromIndexedDB() {
    const name = await indexedDBService.get('home', 'restaurantName')
    const type = await indexedDBService.get('home', 'businessType')
    const logo = await indexedDBService.get('home', 'logoUrl')

    restaurantName.value = name?.value ?? ''
    businessType.value = type?.value ?? ''
    logoUrl.value = logo?.value ?? null
  }

  async function setRestaurantName(name: string) {
    restaurantName.value = name
    await indexedDBService.put('home', { id: 'restaurantName', value: name })
    await remote.syncIdentity({ restaurant_name: name })
  }

  async function setBusinessType(type: string) {
    businessType.value = type
    await indexedDBService.put('home', { id: 'businessType', value: type })
    await remote.syncIdentity({ business_type: type })
  }

  async function setLogoUrl(url: string | null) {
    logoUrl.value = url
    await indexedDBService.put('home', { id: 'logoUrl', value: url })
    await remote.syncIdentity({ logo_url: url })
  }

  async function uploadLogoToStorage(file: File) {
    const url = await remote.uploadLogo(file)
    if (url) await setLogoUrl(url)
  }

  async function deleteLogoFromStorage() {
    if (logoUrl.value) {
      await remote.deleteLogo(logoUrl.value)
      await setLogoUrl(null)
    }
  }

  return {
    restaurantName,
    businessType,
    logoUrl,
    loadFromIndexedDB,
    setRestaurantName,
    setBusinessType,
    setLogoUrl,
    uploadLogoToStorage,
    deleteLogoFromStorage
  }
})
