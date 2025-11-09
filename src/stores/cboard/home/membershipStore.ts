// src/stores/cboard/home/membershipStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase' // ✅ الاستيراد الموحد

export const useMembershipStore = defineStore('membershipStore', () => {
  const isActive = ref(false)
  const menuId = ref<string | null>(null)
  const activatedAt = ref<string | null>(null)

  async function loadStatus() {
    const { data, error } = await supabase
      .from('home_settings')
      .select('menu_id, activated_at')
      .eq('user_id', (await supabase.auth.getUser()).data?.user?.id)
      .single()

    if (data) {
      menuId.value = data.menu_id
      activatedAt.value = data.activated_at
      isActive.value = !!data.activated_at
    }
  }

  async function activate() {
    const userId = (await supabase.auth.getUser()).data?.user?.id
    const { error } = await supabase
      .from('home_settings')
      .update({ activated_at: new Date().toISOString() })
      .eq('user_id', userId)

    if (!error) {
      isActive.value = true
      activatedAt.value = new Date().toISOString()
    }
  }

  return { isActive, menuId, activatedAt, loadStatus, activate }
})
