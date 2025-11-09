<template>
  <div class="welcome-message">
    <h2 class="title">{{ t('cboard.home.welcome.headline') }} <span class="id-value">{{ userStore.userName }}</span></h2>
     
  </div>
</template>

<script setup lang="ts">

import { useUserStore } from '@/stores/cboard/home/userStore'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const userStore = useUserStore()

userStore.loadUser()

</script>

<style scoped>
.welcome-message {
  background-color: transparent; /* ✅ إزالة الخلفية */
  border-radius: 0;              /* ✅ إزالة الزوايا */
  padding: 0;                    /* ✅ إزالة الحواف الداخلية */
  box-shadow: none;             /* ✅ إزالة الظل */
  font-family: 'Tajawal', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.title {
  font-size: 1.8rem;
  color: #FF7A00; /* ✅ برتقالي للتمييز */
  font-weight: bold;
  margin: 0;
}

.account-id {
  font-size: 1rem;
  color: #1C1C1C;
}

.id-value {
  font-weight: bold;
  color: #1C1C1C; /* ✅ توحيد اللون مع النص الأساسي */
}

</style>
