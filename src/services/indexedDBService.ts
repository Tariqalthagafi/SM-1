import { openDB } from 'idb'
import type { OperatingHours , PaymentMethod } from '@/types/contexts/orderInfoView.ts'
import type { social_key, SocialField  } from '@/types/contexts/social.ts'


const DB_NAME = 'menuDB'
const DB_VERSION = 13

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    // 🛒 منتجات
    if (!db.objectStoreNames.contains('products')) {
      db.createObjectStore('products', { keyPath: 'id' })
    }

    // 🗂️ أقسام
    if (!db.objectStoreNames.contains('sections')) {
      db.createObjectStore('sections', { keyPath: 'id' })
    }

    // 🎁 عروض
    if (!db.objectStoreNames.contains('offers')) {
      db.createObjectStore('offers', { keyPath: 'id' })
    }

    // 📡 إعدادات التواصل
    if (!db.objectStoreNames.contains('social')) {
      db.createObjectStore('social', { keyPath: 'key' })
    }

    // ⚙️ إعدادات عامة
    if (!db.objectStoreNames.contains('home')) {
      db.createObjectStore('home', { keyPath: 'id' })
    }

    // 🧱 خيارات التخصيص (template_options)
    if (!db.objectStoreNames.contains('template_options')) {
    db.createObjectStore('template_options', { keyPath: 'id' })
   }

    // 🧱 إعدادات المستخدم أو القالب (template_settings)
    if (!db.objectStoreNames.contains('template_settings')) {
    db.createObjectStore('template_settings', { keyPath: 'id' })
   }
 // 🎨 جدول الألوان الثابتة
if (!db.objectStoreNames.contains('menu_colors')) {
  db.createObjectStore('menu_colors', { keyPath: 'id' })
}

// 📐 جدول نماذج التخطيط المثبتة
if (!db.objectStoreNames.contains('layout_templates')) {
  db.createObjectStore('layout_templates', { keyPath: 'id' })
}

// 🧩 جدول تخصيص المستخدم النهائي
if (!db.objectStoreNames.contains('menu_customization')) {
  db.createObjectStore('menu_customization', { keyPath: 'id' })
}

if (!db.objectStoreNames.contains('order_methods')) {
  db.createObjectStore('order_methods', { keyPath: 'id' })
}

if (!db.objectStoreNames.contains('payment_methods')) {
  db.createObjectStore('payment_methods', { keyPath: 'id' })
}

if (!db.objectStoreNames.contains('operating_hours')) {
  db.createObjectStore('operating_hours', { keyPath: 'id' })
}
if (!db.objectStoreNames.contains('domain')) {
  db.createObjectStore('domain', { keyPath: 'id' })
}


}
})

export const indexedDBService = {
  // جلب كل العناصر من store معين
  async getAll(storeName: string) {
    const db = await dbPromise
    return db.getAll(storeName)
  },

  // جلب عنصر محدد حسب id
  async get(storeName: string, id: string | number) {
    const db = await dbPromise
    return db.get(storeName, id)
  },

  // حفظ أو تحديث عنصر
  async put(storeName: string, value: any) {
    const db = await dbPromise
    return db.put(storeName, value)
  },

  // حذف عنصر حسب id
  async delete(storeName: string, id: string | number) {
    const db = await dbPromise
    return db.delete(storeName, id)
  },

  // تفريغ store بالكامل
  async clear(storeName: string) {
    const db = await dbPromise
    return db.clear(storeName)
  },
  // جلب إعداد معين
async getSetting(key: string) {
  const db = await dbPromise
  const settings = await db.get('template_settings', 'template')
  return settings?.[key] ?? null
},

// حفظ إعداد معين
async saveSetting(key: string, value: any) {
  const db = await dbPromise
  const current = (await db.get('template_settings', 'template')) || { id: 'template' }
  current[key] = value
  await db.put('template_settings', current)
},

// جلب الخيارات المتاحة لنوع معين
async getOptions(key: string) {
  const db = await dbPromise
  const all = await db.getAll('template_options')
  return all.filter(opt => opt.key === key && opt.is_active)
},

// حفظ خيار جديد (للاستخدام الإداري لاحقًا)
async saveOption(option: any) {
  const db = await dbPromise
  await db.put('template_options', option)
},
async getColors(id = 'default') {
  const db = await dbPromise
  return db.get('menu_colors', id)
},

async saveColors(colors: any, id = 'default') {
  const db = await dbPromise
  await db.put('menu_colors', { id, ...colors })
},
async getLayoutTemplate(id: string) {
  const db = await dbPromise
  return db.get('layout_templates', id)
},

async getActiveLayoutTemplates() {
  const db = await dbPromise
  const all = await db.getAll('layout_templates')
  return all.filter(template => template.is_active)
},

async saveLayoutTemplate(template: any) {
  const db = await dbPromise
  await db.put('layout_templates', template)
},
async getCustomization(id = 'template') {
  const db = await dbPromise
  return db.get('menu_customization', id)
},

async saveCustomization(data: any, id = 'template') {
  const db = await dbPromise
  await db.put('menu_customization', { id, ...data })
},

async getOrderMethods(id = 'default') {
  const db = await dbPromise
  return db.get('order_methods', id)
},

async saveOrderMethods(methods: any[], id = 'default') {
  const db = await dbPromise
  await db.put('order_methods', { id, methods })
},
async getOperatingHours(id = 'default') {
  const db = await dbPromise
  const record = await db.get('operating_hours', id)
  return record?.hours ?? null
},

async saveOperatingHours(hours: OperatingHours, id = 'default') {
  const db = await dbPromise
  const cleanHours = JSON.parse(JSON.stringify(hours))
  await db.put('operating_hours', { id, hours: cleanHours })
},

async getPaymentMethods(id = 'default') {
  const db = await dbPromise
  return db.get('payment_methods', id)
},

async savePaymentMethods(methods: PaymentMethod[], id = 'default') {
  const db = await dbPromise
  await db.put('payment_methods', { id, methods })
},

// جلب إعدادات التواصل
async getSocialField(key: social_key): Promise<SocialField | undefined> {
  const db = await dbPromise
  return db.get('social', key)
}
,

// حفظ إعدادات التواصل
async saveSocialField(field: SocialField) {
  const db = await dbPromise
  await db.put('social', field) // field يحتوي على key و value و is_public
}
,

// حذف إعدادات التواصل
async deleteSocialField(key: social_key) {
  const db = await dbPromise
  await db.delete('social', key)
}
,
async getAllSocialFields(): Promise<SocialField []> {
  const db = await dbPromise
  return db.getAll('social')
}
,
// جلب إعداد من جدول home
async getHomeSetting(key: string) {
  const db = await dbPromise
  const settings = await db.get('home', 'home')
  return settings?.[key] ?? null
},

// حفظ إعداد في جدول home
async saveHomeSetting(key: string, value: any) {
  const db = await dbPromise
  const current = (await db.get('home', 'home')) || { id: 'home' }
  current[key] = value
  await db.put('home', current)
},


}
