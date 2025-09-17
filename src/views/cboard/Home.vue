<script setup lang="ts">
import WelcomeMessage from '@/components/cboard/Home/WelcomeMessage.vue'
import HomeSummary from '@/components/cboard/Home/HomeSummary.vue'
import IdentityForm from '@/components/cboard/Home/IdentityForm.vue'
import { useHomeStore } from '@/stores/cboard/homeStore'

const homeStore = useHomeStore()

// تحميل البيانات من IndexedDB عند فتح الصفحة
homeStore.initStore()
</script>

<template>
  <div class="page-wrapper">
    <div class="home-dashboard">
      <WelcomeMessage />
      <IdentityForm />
      <HomeSummary />


    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 3rem);
  padding: 1rem;
  background-color: #f0f2f5;
}

.home-dashboard {
  width: 100%;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  display: grid;
  row-gap: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.menu-id {
  padding: 0.5rem;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .home-dashboard {
    padding: 1rem;
  }
}
</style>
