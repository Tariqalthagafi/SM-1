// src/components/cboard/Sections/useSections.ts
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
import type { Section } from '@/types/contexts/sections1.ts'

const sections = ref<Section[]>([])
const userId = ref<string>('')

// ✅ تحميل الأقسام الخاصة بالمستخدم
async function loadSections() {
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError) {
    console.error('❌ خطأ في جلب المستخدم:', userError.message)
    return
  }

  userId.value = userData?.user?.id ?? ''

  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .eq('user_id', userId.value)

  if (error) {
    console.error('❌ خطأ في تحميل الأقسام:', error.message)
  } else {
    sections.value = data ?? []
  }
}

// ✅ إضافة قسم جديد
async function addSection(name: string) {
  const newSection = {
    id: crypto.randomUUID(),
    user_id: userId.value,
    name,
    is_active: true
  }

  const { data, error } = await supabase
    .from('sections')
    .insert(newSection)
    .select()

  if (error) {
    console.error('❌ خطأ في الإضافة:', error.message)
  } else if (data) {
    sections.value.push(...data)
  }
}

// ✅ تعديل قسم
async function updateSection(id: string, name: string) {
  const { data, error } = await supabase
    .from('sections')
    .update({ name })
    .eq('id', id)
    .eq('user_id', userId.value)
    .select()

  if (error) {
    console.error('❌ خطأ في التحديث:', error.message)
  } else if (data) {
    const idx = sections.value.findIndex(s => s.id === id)
    if (idx !== -1) sections.value[idx] = data[0]
  }
}

// ✅ حذف قسم
async function deleteSection(id: string) {
  const { error } = await supabase
    .from('sections')
    .delete()
    .eq('id', id)
    .eq('user_id', userId.value)

  if (error) {
    console.error('❌ خطأ في الحذف:', error.message)
  } else {
    sections.value = sections.value.filter(s => s.id !== id)
  }
}

export function useSections() {
  onMounted(loadSections)
  return { sections, addSection, updateSection, deleteSection, loadSections }
}
