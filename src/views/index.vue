<template>
  <main class="home">
    <!-- 🔼 الهيدر -->
    <HeaderSection />

    <!-- 🟠 السلايدر التسويقي -->
    <FeatureSlider />

    <!-- ⚫ الفوتر -->
    <FooterSection />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import HeaderSection from '@/components/Home/HeaderSection.vue'
import FeatureSlider from '@/components/Home/FeatureSlider.vue'
import FooterSection from '@/components/Home/FooterSection.vue'

const router = useRouter()
const currentLang = ref<'ar' | 'en'>('ar')

function toggleLang() {
  currentLang.value = currentLang.value === 'ar' ? 'en' : 'ar'
  document.documentElement.setAttribute('dir', currentLang.value === 'ar' ? 'rtl' : 'ltr')
}

function fakeLogin() {
  router.push('/cboard')
}

onMounted(() => {
  document.documentElement.setAttribute('dir', currentLang.value === 'ar' ? 'rtl' : 'ltr')
})
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  width: 100%;
  background-color: #fff;
  overflow-x: hidden;
}

/* 🟠 السلايدر */
.feature-slider {
  padding: 3rem 1rem;
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 600px) {
  .feature-slider {
    padding: 2rem 1rem;
  }
}
</style>
