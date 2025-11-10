import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Section } from '@/types/contexts/sections1.ts'
import { indexedDBService } from '@/services/indexedDBService'
import { supabase } from '@/supabase'

const STORE_NAME = 'sections'

export const useSectionStore = defineStore('sectionStore', () => {
  const sections = ref<Section[]>([])

  // ✅ مزامنة من Supabase إلى IndexedDB
async function syncFromSupabase() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) throw userError || new Error('لا يوجد مستخدم مسجل')

    const { data, error } = await supabase
      .from('sections')
      .select('*')
      .eq('is_active', true)
      .eq('created_by', user.id) // ✅ فلترة حسب المستخدم

    if (error) throw error

    // حفظ في IndexedDB
    for (const section of data) {
      await indexedDBService.put(STORE_NAME, section)
    }

    // تحميل من IndexedDB للعرض
    const all = await indexedDBService.getAll(STORE_NAME)
    sections.value = sortSections(all)
  } catch (err) {
    console.error('❌ فشل مزامنة الأقسام من Supabase:', err)
  }
}


  // ✅ تحميل الأقسام من IndexedDB فقط
  async function load() {
    try {
      const all = await indexedDBService.getAll(STORE_NAME)
      sections.value = sortSections(all)
    } catch (err) {
      console.error('❌ فشل تحميل الأقسام من IndexedDB:', err)
    }
  }

  // ✅ إضافة قسم إلى Supabase ثم IndexedDB
async function add(section: Section) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) throw userError || new Error('لا يوجد مستخدم مسجل')

    const sectionWithUser = {
      ...section,
      created_by: user.id
    }

    const { error } = await supabase.from('sections').insert([sectionWithUser])
    if (error) throw error

    await indexedDBService.put(STORE_NAME, sectionWithUser)
    sections.value.push(sectionWithUser)
    sections.value = sortSections(sections.value)
  } catch (err) {
    console.error('❌ فشل إضافة القسم:', err)
  }
}


  // ✅ تعديل قسم في Supabase ثم IndexedDB
async function update(section: Section) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) throw userError || new Error('لا يوجد مستخدم مسجل')

    const { error } = await supabase
      .from('sections')
      .update({ name: section.name })
      .eq('id', section.id)
      .eq('created_by', user.id) // ✅ شرط RLS

    if (error) throw error

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


  // ✅ حذف قسم من Supabase ثم IndexedDB
 async function remove(id: string) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) throw userError || new Error('لا يوجد مستخدم مسجل')

    const { error } = await supabase
      .from('sections')
      .delete()
      .eq('id', id)
      .eq('created_by', user.id) // ✅ شرط RLS

    if (error) throw error

    await indexedDBService.delete(STORE_NAME, id)
    sections.value = sections.value.filter(s => s.id !== id)
  } catch (err) {
    console.error('❌ فشل حذف القسم:', err)
  }
}


  // ✅ مسح كل الأقسام من IndexedDB فقط
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
    syncFromSupabase,
    load,
    add,
    update,
    remove,
    clear
  }
})
