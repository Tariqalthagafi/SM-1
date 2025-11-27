// src/stores/cboard/home/membershipStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase'

export const useMembershipStore = defineStore('membershipStore', () => {
  const accountId = ref<string | null>(null)

  // ✅ توليد رقم الحساب من أول 8 خانات من UID
  async function loadAccountId() {
    const { data: userData, error } = await supabase.auth.getUser()
    if (error) {
      console.error('❌ خطأ في جلب المستخدم:', error.message)
      return
    }

    const userId = userData?.user?.id
    if (!userId) {
      console.warn('⚠️ لا يوجد مستخدم مسجل')
      return
    }

    // أخذ أول 8 خانات من الـ UUID
    accountId.value = `menu-${userId.split('-')[0]}`
  }

  return { accountId, loadAccountId }
})
