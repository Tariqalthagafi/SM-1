// src/stores/cboard/home/userStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase'

export const useUserStore = defineStore('userStore', () => {
  const userName = ref<string | null>(null)
  const userEmail = ref<string | null>(null)
  const userId = ref<string | null>(null)

  async function loadUser() {
    const { data: userData } = await supabase.auth.getUser()
    const user = userData?.user
    if (!user) return

    userId.value = user.id ?? null
    userEmail.value = user.email ?? null

    const name = user.user_metadata?.name
    const fallback = user.email?.split('@')[0] ?? null

    userName.value = name ?? fallback ?? 'مستخدم'
  }

  return {
    userName,
    userEmail,
    userId,
    loadUser
  }
})
