import { defineStore } from 'pinia'
import { reactive, toRaw } from 'vue'
import { menuTemplates } from './templatesConfig'
import type { TemplateConfig, TemplateInstance, TemplateSettings } from '@/types/contexts/templates'
import { templixDBService } from '@/services/templixDBService'

// 🖌️ دالة مساعدة لحقن CSS القالب
function injectTemplateCSS(css: string) {
  let styleTag = document.getElementById('template-style') as HTMLStyleElement | null
  if (!styleTag) {
    styleTag = document.createElement('style')
    styleTag.id = 'template-style'
    document.head.appendChild(styleTag)
  }
  styleTag.innerHTML = css
}

// 🎨 دالة لتطبيق الإعدادات على CSS Variables
function applySettingsToCSS(settings: TemplateSettings) {
  const root = document.documentElement
  if (settings.colors) {
    Object.entries(settings.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}-bg`, value)
      root.style.setProperty(`--${key}-color`, value)
    })
  }
  if (settings.fontFamily) {
    root.style.setProperty('--font-family', settings.fontFamily)
  }
}

interface PresetData {
  template: TemplateInstance | null
  defaultSettings: TemplateSettings | null
  history?: TemplateSettings[]
}

interface TemplateState {
  defaultPreset: 'custom1' | 'custom2'
  activePreset: 'custom1' | 'custom2'
  presets: {
    custom1: PresetData
    custom2: PresetData
  }
}

export const usePreviewManager = defineStore('previewManager', {
  state: (): TemplateState => ({
    defaultPreset: 'custom1',
    activePreset: 'custom1',
    presets: reactive({
      custom1: { template: null, defaultSettings: null, history: [] },
      custom2: { template: null, defaultSettings: null, history: [] }
    })
  }),

  getters: {
    activeTemplate(state): TemplateInstance | null {
      return state.presets[state.activePreset]?.template || null
    }
  },

  actions: {
    pushHistory(presetName: 'custom1' | 'custom2') {
      const preset = this.presets[presetName]
      if (preset.template) {
        preset.history = preset.history || []
        preset.history.push(JSON.parse(JSON.stringify(preset.template.settings)))
        if (preset.history.length > 20) preset.history.shift()
      }
    },

    undoStep(presetName: 'custom1' | 'custom2') {
      const preset = this.presets[presetName]
      if (preset.template && preset.history && preset.history.length) {
        const prevSettings = preset.history.pop()!
        Object.assign(preset.template.settings, prevSettings)
        const cfg = menuTemplates[preset.template.id]
        if (cfg) {
          injectTemplateCSS(cfg.css)
          applySettingsToCSS(prevSettings)
        }
        this.saveToStorage()
      }
    },

    canUndo(presetName: 'custom1' | 'custom2') {
      return !!this.presets[presetName].history?.length
    },

    savePreset(presetName: 'custom1' | 'custom2') {
      this.pushHistory(presetName)
      const preset = this.presets[presetName]
      if (preset.template) {
        preset.template.settings = reactive({ ...preset.template.settings })
        this.saveToStorage()
      }
    },

    saveActiveTemplate() {
      this.savePreset(this.activePreset)
    },

    async loadFromStorage() {
      const state1 = await templixDBService.getCustomizerState('custom1')
      const state2 = await templixDBService.getCustomizerState('custom2')

      if (state1) {
        const config = menuTemplates[state1.templateId]
        if (config) {
          this.presets.custom1.template = reactive({
            id: state1.templateId,
            settings: reactive({ ...state1.settings })
          })
          this.presets.custom1.defaultSettings = reactive({ ...config.defaultSettings })
        }
      }

      if (state2) {
        const config = menuTemplates[state2.templateId]
        if (config) {
          this.presets.custom2.template = reactive({
            id: state2.templateId,
            settings: reactive({ ...state2.settings })
          })
          this.presets.custom2.defaultSettings = reactive({ ...config.defaultSettings })
        }
      }

      const activeTemplate = this.presets[this.activePreset].template
      if (activeTemplate) {
        const config = menuTemplates[activeTemplate.id]
        if (config) {
          injectTemplateCSS(config.css)
          applySettingsToCSS(activeTemplate.settings)
        }
      }
    },

    async saveToStorage() {
      const preset1 = this.presets.custom1.template
      const preset2 = this.presets.custom2.template

      if (preset1) {
        await templixDBService.saveCustomizerState({
          id: 'custom1',
          templateId: preset1.id,
          settings: JSON.parse(JSON.stringify(toRaw(preset1.settings)))
        })
      }
      if (preset2) {
        await templixDBService.saveCustomizerState({
          id: 'custom2',
          templateId: preset2.id,
          settings: JSON.parse(JSON.stringify(toRaw(preset2.settings)))
        })
      }
    },

    setActivePreset(presetName: 'custom1' | 'custom2') {
      this.activePreset = presetName
      const preset = this.presets[presetName]
      if (preset.template) {
        const config = menuTemplates[preset.template.id]
        if (config) {
          injectTemplateCSS(config.css)
          applySettingsToCSS(preset.template.settings)
        }
      }
      this.saveToStorage()
    },

    loadTemplateForPreset(presetName: 'custom1' | 'custom2', templateId: string) {
      const config: TemplateConfig = menuTemplates[templateId]
      if (!config) return

      const instance: TemplateInstance = {
        id: templateId,
        settings: reactive({ ...config.defaultSettings })
      }

      this.presets[presetName].template = instance
      this.presets[presetName].defaultSettings = reactive({ ...config.defaultSettings })

      injectTemplateCSS(config.css)
      applySettingsToCSS(instance.settings)

      this.saveToStorage()
    },

    resetPreset(presetName: 'custom1' | 'custom2') {
      const preset = this.presets[presetName]
      if (preset.template) {
        templixDBService.resetCustomizer(presetName, preset.template.id)
        const config = menuTemplates[preset.template.id]
        if (config) {
          preset.template.settings = reactive({ ...config.defaultSettings })
          preset.defaultSettings = reactive({ ...config.defaultSettings })
          injectTemplateCSS(config.css)
          applySettingsToCSS(config.defaultSettings)
          this.saveToStorage()
        }
      }
    },

    setAsDefault(presetName: 'custom1' | 'custom2') {
      this.defaultPreset = presetName
      const preset = this.presets[presetName]
      if (preset.template) {
        templixDBService.setProductionState(preset.template.id, toRaw(preset.template.settings))
      }
      this.saveToStorage()
    }
  }
})
