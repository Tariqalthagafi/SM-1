import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { templixDBService } from '@/services/templixDBService'

export interface ThemePreset {
  id: string
  name: string
  mode: 'light' | 'dark'
  primaryColor: string
  secondaryColor: string
  fontFamily: string
  designConfig?: {
    expiredStyle: 'strike' | 'badge' | 'overlay'
    offerStyle: 'priceOnly' | 'badge' | 'background'
  }
}

export const themePresets: ThemePreset[] = [
  {
    id: 'desert',
    name: 'رملي',
    mode: 'light',
    primaryColor: '#D2B48C',
    secondaryColor: '#8B4513',
    fontFamily: 'Cairo'
  },
  {
    id: 'night',
    name: 'ليلي',
    mode: 'dark',
    primaryColor: '#1e1e2f',
    secondaryColor: '#00bcd4',
    fontFamily: 'Roboto'
  },
  {
    id: 'classic',
    name: 'كلاسيكي',
    mode: 'light',
    primaryColor: '#ffffff',
    secondaryColor: '#333333',
    fontFamily: 'Tahoma'
  }
]

export const useThemeStore = defineStore('themeStore', () => {
  const themeConfig = ref<ThemePreset>({
    id: 'default',
    name: 'افتراضي',
    mode: 'light',
    primaryColor: '#ffffff',
    secondaryColor: '#000000',
    fontFamily: 'Arial',
    designConfig: {
      expiredStyle: 'strike',
      offerStyle: 'priceOnly'
    }
  })

  // 📥 تحميل الثيم من قاعدة البيانات أو حفظ الافتراضي
  async function loadFromStorage() {
    const saved = await templixDBService.get('customizations_meta', 'theme_config')
    if (saved && 'data' in saved) {
      themeConfig.value = saved.data as unknown as ThemePreset
    } else {
      const clean = JSON.parse(JSON.stringify(themeConfig.value))
      await templixDBService.put('customizations_meta', {
        type: 'theme_config',
        data: clean,
        updatedAt: new Date().toISOString()
      })
    }
  }

  // 🎨 تطبيق ثيم وحفظه
  async function applyPreset(presetId: string) {
    const preset = themePresets.find(p => p.id === presetId)
    if (preset) {
      themeConfig.value = {
        ...preset,
        designConfig: themeConfig.value.designConfig // احتفظ بإعدادات العرض
      }
      const clean = JSON.parse(JSON.stringify(themeConfig.value))
      await templixDBService.put('customizations_meta', {
        type: 'theme_config',
        data: clean,
        updatedAt: new Date().toISOString()
      })
    }
  }

  // ✏️ تعديل الخط وحفظه
  async function setFont(font: string) {
    themeConfig.value.fontFamily = font
    const clean = JSON.parse(JSON.stringify(themeConfig.value))
    await templixDBService.put('customizations_meta', {
      type: 'theme_config',
      data: clean,
      updatedAt: new Date().toISOString()
    })
  }

  // ⚙️ تعديل إعدادات العرض وحفظها
  async function setDesignConfig(config: ThemePreset['designConfig']) {
    themeConfig.value.designConfig = config
    const clean = JSON.parse(JSON.stringify(themeConfig.value))
    await templixDBService.put('customizations_meta', {
      type: 'theme_config',
      data: clean,
      updatedAt: new Date().toISOString()
    })
  }

  // ⏳ تحميل تلقائي عند التهيئة
  onMounted(() => {
    loadFromStorage()
  })

  return {
    themeConfig,
    applyPreset,
    setFont,
    setDesignConfig,
    loadFromStorage
  }
})
