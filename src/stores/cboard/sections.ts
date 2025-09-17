import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Section } from '@/types/contexts/Sections'
import { indexedDBService } from '@/services/indexedDBService'

const STORE_NAME = 'sections'

export const useSectionStore = defineStore('sectionStore', () => {
  const sections = ref<Section[]>([])

  // 📌 تحميل الأقسام من IndexedDB
  async function load() {
    try {
      const all = await indexedDBService.getAll(STORE_NAME)
      sections.value = sortSections(all)
    } catch (err) {
      console.error('❌ فشل تحميل الأقسام:', err)
    }
  }

  // ➕ إضافة قسم جديد
  async function add(section: Section) {
    try {
      await indexedDBService.put(STORE_NAME, section)
      sections.value.push(section)
      sections.value = sortSections(sections.value)
    } catch (err) {
      console.error('❌ فشل إضافة القسم:', err)
    }
  }

  // ✏️ تعديل قسم
  async function update(section: Section) {
    try {
      await indexedDBService.put(STORE_NAME, section)
      const index = sections.value.findIndex(s => s.id === section.id)
      if (index !== -1) {
        sections.value[index] = section
        sections.value = sortSections(sections.value)
      }
    } catch (err) {
      console.error('❌ فشل تعديل القسم:', err)
    }
  }

  // 🗑️ حذف قسم
  async function remove(id: string) {
    try {
      await indexedDBService.delete(STORE_NAME, id)
      sections.value = sections.value.filter(s => s.id !== id)
    } catch (err) {
      console.error('❌ فشل حذف القسم:', err)
    }
  }

  // 🧹 مسح كل الأقسام
  async function clear() {
    try {
      await indexedDBService.clear(STORE_NAME)
      sections.value = []
    } catch (err) {
      console.error('❌ فشل مسح الأقسام:', err)
    }
  }

  // 🔠 ترتيب الأقسام (افتراضيًا بالاسم)
  function sortSections(list: Section[]) {
    return [...list].sort((a, b) => a.name.localeCompare(b.name, 'ar'))
  }

  return {
    sections,
    load,
    add,
    update,
    remove,
    clear
  }
})
