import { openDB } from 'idb'
import type {
  TemplateConfig,
  TemplateInstance,
  TemplateSettings,
  TemplixDBSchema
} from '@/types/contexts/templates.ts'

const DB_NAME = 'Templix'
const DB_VERSION = 3 // رفعنا الإصدار بسبب تغيير الجداول

export const templixDBPromise = openDB<TemplixDBSchema>(DB_NAME, DB_VERSION, {
  upgrade(db) {
    // 🗑 حذف الجداول القديمة إذا وجدت
    const legacyStores = [
      'default_templates',
      'customizer1_templates',
      'customizer2_templates',
      'production_template',
      'theme'
    ]
    for (const store of legacyStores) {
      if (db.objectStoreNames.contains(store)) {
        db.deleteObjectStore(store)
      }
    }

    // 📦 القوالب الجاهزة
    if (!db.objectStoreNames.contains('templates_catalog')) {
      db.createObjectStore('templates_catalog', { keyPath: 'id' })
    }

    // 🎯 حالة المخصصين (custom1 / custom2)
    if (!db.objectStoreNames.contains('customizer_states')) {
      db.createObjectStore('customizer_states', { keyPath: 'id' })
    }

    // 🚀 حالة الإنتاج
    if (!db.objectStoreNames.contains('production_state')) {
      db.createObjectStore('production_state', { keyPath: 'id' })
    }

    // 📝 سجل التعديلات
    if (!db.objectStoreNames.contains('template_edits')) {
      db.createObjectStore('template_edits', { keyPath: 'id', autoIncrement: true })
    }

    // ⚙️ ميتاداتا التخصيص
    if (!db.objectStoreNames.contains('customizations_meta')) {
      db.createObjectStore('customizations_meta', { keyPath: 'type' })
    }
  }
})

export const templixDBService = {
  // =========================
  // دوال عامة
  // =========================
  async getAll<K extends keyof TemplixDBSchema>(storeName: K) {
    const db = await templixDBPromise
    return db.getAll(storeName) as unknown as TemplixDBSchema[K]
  },

  async get<K extends keyof TemplixDBSchema>(storeName: K, id: string) {
    const db = await templixDBPromise
    return db.get(storeName, id) as unknown as TemplixDBSchema[K][number] | undefined
  },

  async put<K extends keyof TemplixDBSchema>(storeName: K, value: TemplixDBSchema[K][number]) {
    const db = await templixDBPromise
    return db.put(storeName, value as any)
  },

  async delete<K extends keyof TemplixDBSchema>(storeName: K, id: string) {
    const db = await templixDBPromise
    return db.delete(storeName, id)
  },

  async clear<K extends keyof TemplixDBSchema>(storeName: K) {
    const db = await templixDBPromise
    return db.clear(storeName)
  },

  // =========================
  // 📦 القوالب الجاهزة
  // =========================
  getTemplatesCatalog() {
    return this.getAll('templates_catalog')
  },

  saveTemplateConfig(template: TemplateConfig) {
    return this.put('templates_catalog', template)
  },

  // =========================
  // 🎯 حالة المخصصين
  // =========================
  getCustomizerState(id: 'custom1' | 'custom2') {
    return this.get('customizer_states', id)
  },

  saveCustomizerState(state: {
    id: 'custom1' | 'custom2'
    templateId: string
    settings: TemplateSettings
  }) {
    return this.put('customizer_states', state)
  },

  // =========================
  // 🚀 حالة الإنتاج
  // =========================
  getProductionState() {
    return this.get('production_state', 'current')
  },

  setProductionState(templateId: string, settings: TemplateSettings) {
    return this.put('production_state', { id: 'current', templateId, settings })
  },

  // =========================
  // 🔄 إعادة التعيين
  // =========================
  async resetCustomizer(customizerId: 'custom1' | 'custom2', templateId: string) {
    const baseTemplate = await this.get('templates_catalog', templateId) as TemplateConfig
    if (!baseTemplate) return
    await this.put('customizer_states', {
      id: customizerId,
      templateId: baseTemplate.id,
      settings: JSON.parse(JSON.stringify(baseTemplate.defaultSettings))
    })
  }
}
