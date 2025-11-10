import { defineStore } from 'pinia'
import { templixDBService } from '@/services/templixDBService'
import type { TemplateConfig, TemplateSettings } from '@/types/contexts/templates1.ts'

// 🗂️ استيراد القوالب الافتراضية من ملفات التعريفات
import { cafeBrown } from '@/stores/cboard/theme/templates/definitions/cafeBrown.ts'
import { modernBlue } from '@/stores/cboard/theme/templates/definitions/modernBlue.ts'
import { freshGreen } from '@/stores/cboard/theme/templates/definitions/freshGreen.ts'

// 📦 تجميع القوالب في Array واحدة
const defaultTemplatesData: TemplateConfig[] = [
  cafeBrown,
  modernBlue,
  freshGreen
]

export const useTemplixStore = defineStore('templix', {
  state: () => ({
    defaultTemplates: [] as TemplateConfig[],
    customizer1: null as { templateId: string; settings: TemplateSettings } | null,
    customizer2: null as { templateId: string; settings: TemplateSettings } | null,
    productionTemplate: null as { templateId: string; settings: TemplateSettings } | null,
    loading: false as boolean
  }),

  getters: {
    activeTemplate(state) {
      return state.productionTemplate || state.defaultTemplates[0] || null
    },
    defaultTemplateCount: (state) => state.defaultTemplates.length
  },

  actions: {
    // 📥 تحميل القوالب الافتراضية مع التهيئة إذا كانت القاعدة فاضية
    async loadDefaultTemplates() {
      this.loading = true
      try {
        const templates = await templixDBService.getTemplatesCatalog()
        if (templates.length === 0) {
          for (const tpl of defaultTemplatesData) {
            await templixDBService.saveTemplateConfig(tpl)
          }
          this.defaultTemplates = defaultTemplatesData
          console.log('✅ تم تهيئة قاعدة Templix بالقوالب الافتراضية')
        } else {
          this.defaultTemplates = templates
        }
      } finally {
        this.loading = false
      }
    },

    async addDefaultTemplate(template: TemplateConfig) {
      await templixDBService.saveTemplateConfig(template)
      this.defaultTemplates.push(template)
    },

    // 🎯 تحميل حالة المخصص
    async loadCustomizerState(customizerId: 'custom1' | 'custom2') {
      this.loading = true
      try {
        const state = await templixDBService.getCustomizerState(customizerId)
        if (customizerId === 'custom1') {
          this.customizer1 = state || null
        } else {
          this.customizer2 = state || null
        }
      } finally {
        this.loading = false
      }
    },

    // 💾 حفظ حالة المخصص
    async saveCustomizerState(customizerId: 'custom1' | 'custom2', templateId: string, settings: TemplateSettings) {
      await templixDBService.saveCustomizerState({ id: customizerId, templateId, settings })
      if (customizerId === 'custom1') {
        this.customizer1 = { templateId, settings }
      } else {
        this.customizer2 = { templateId, settings }
      }
    },

    // 🚀 تحميل حالة الإنتاج
    async loadProductionState() {
      this.productionTemplate = await templixDBService.getProductionState() || null
    },

    // 🚀 تعيين كافتراضي (يحفظ في المخصص الحالي وينسخ للإنتاج)
    async setAsDefault(customizerId: 'custom1' | 'custom2') {
      const state = customizerId === 'custom1' ? this.customizer1 : this.customizer2
      if (!state) return
      await templixDBService.saveCustomizerState({ id: customizerId, ...state })
      await templixDBService.setProductionState(state.templateId, state.settings)
      this.productionTemplate = { ...state }
    },

    // 🔄 إعادة التعيين
    async resetCustomizer(customizerId: 'custom1' | 'custom2', templateId: string) {
      await templixDBService.resetCustomizer(customizerId, templateId)
      await this.loadCustomizerState(customizerId)
    },

    // 🧹 مسح كل البيانات
    async clearAll() {
      await templixDBService.clear('templates_catalog')
      await templixDBService.clear('customizer_states')
      await templixDBService.clear('production_state')
      this.defaultTemplates = []
      this.customizer1 = null
      this.customizer2 = null
      this.productionTemplate = null
    }
  }
})
