<template>
  <div class="welcome-message">
    <h2>مرحبًا بك 👋</h2>
    <p class="account-id">رقم الحساب: {{ homeStore.menuId }}</p>
  </div>
</template>

<script setup lang="ts">
import { useHomeStore } from '@/stores/cboard/homeStore'

const homeStore = useHomeStore()

// تحميل البيانات من IndexedDB إذا لم تكن محملة مسبقًا
homeStore.initStore()

// تسجيل وقت الزيارة
homeStore.markVisit()
</script>

<style scoped>
.welcome-message {
  text-align: start;
  padding: 1rem 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  margin-bottom: 1rem;
}

.welcome-message h2 {
  font-size: 1.6rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.account-id {
  font-size: 0.95rem;
  color: #555;
}
</style>
