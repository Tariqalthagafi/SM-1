// src/stores/cboard/home/membershipStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase' // ✅ الاستيراد الموحد

export const useMembershipStore = defineStore('membershipStore', () => {
  const menuId = ref<string | null>(null)

  async function loadMenuId() {
    const { data, error } = await supabase
      .from('home_settings')
      .select('menu_id')
      .eq('user_id', (await supabase.auth.getUser()).data?.user?.id)
      .single()

    if (data?.menu_id) {
      menuId.value = data.menu_id
    } else {
      console.warn('لم يتم العثور على menu_id أو حدث خطأ:', error?.message)
    }
  }

  return { menuId, loadMenuId }
})
