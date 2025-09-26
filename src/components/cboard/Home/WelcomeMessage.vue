<template>
  <div class="welcome-message">
    <h2 class="title">مرحبًا بك 👋</h2>
    <p class="account-id">رقم الحساب: <span class="id-value">{{ homeStore.menuId }}</span></p>
  </div>
</template>

<script setup lang="ts">
import { useHomeStore } from '@/stores/cboard/homeStore'

const homeStore = useHomeStore()

homeStore.initStore()
homeStore.markVisit()
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
