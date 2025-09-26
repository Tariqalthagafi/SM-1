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
  align-items: flex-start;
  min-height: max-content;
  padding: 2rem 1rem;
  background-color: #FFFFFF; /* ✅ خلفية بيضاء موحدة */
  overflow-x: hidden;
}

.home-dashboard {
  width: 100%;
  max-width: 1000px;
  display: grid;
  row-gap: 2rem;
  padding: 0; /* ✅ إزالة الحواف الداخلية */
  background-color: transparent; /* ✅ إزالة الخلفية البيضاء */
  border-radius: 0; /* ✅ إزالة الزوايا */
  box-shadow: none; /* ✅ إزالة الظل */
  box-sizing: border-box;
}

/* دعم الجوال */
@media (max-width: 768px) {
  .home-dashboard {
    padding: 1rem;
    border-radius: 0;
  }
}

</style>
