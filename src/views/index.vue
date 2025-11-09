<template>
  <main class="home">
    <!-- 🔼 الهيدر -->
    <HeaderSection />
<!-- 🔵 زر تسجيل الدخول -->
<section class="login-section">

</section>

    <!-- 🟠 السلايدر التسويقي -->
    <FeatureSlider />

    <!-- ⚫ الفوتر -->
    <FooterSection />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'

import HeaderSection from '@/components/Home/HeaderSection.vue'
import FeatureSlider from '@/components/Home/FeatureSlider.vue'
import FooterSection from '@/components/Home/FooterSection.vue'

const router = useRouter()
const currentLang = ref<'ar' | 'en'>('ar')

function toggleLang() {
  currentLang.value = currentLang.value === 'ar' ? 'en' : 'ar'
  document.documentElement.setAttribute('dir', currentLang.value === 'ar' ? 'rtl' : 'ltr')
}

async function loginWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  })

  if (error) {
    console.error('❌ فشل تسجيل الدخول:', error.message)
  } else {
    window.location.href = data.url // ✅ فتح نافذة تسجيل الدخول
  }
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

.login-section {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.login-button {
  background-color: #4285f4;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #3367d6;
}

</style>
