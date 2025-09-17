<template>
  <div class="welcome-message">
    <h2>مرحبًا بك يا {{ homeStore.username }} 👋</h2>
    <p class="menu-id">معرّف المنيو: {{ homeStore.menuId }}</p>
    
  </div>
</template>

<script setup lang="ts">
import { useHomeStore } from '@/stores/cboard/homeStore'

const homeStore = useHomeStore()

// تحميل البيانات من IndexedDB إذا ما كانت محملة
homeStore.initStore()

// تسجيل وقت الزيارة
homeStore.markVisit()
</script>

<style scoped>
.welcome-message {
  text-align: start;
  padding-bottom: 1rem;
}

.welcome-message h2 {
  font-size: 1.6rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.menu-id {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.welcome-message p {
  font-size: 1rem;
  color: #555;
}
</style>
