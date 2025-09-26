<template>
  <header class="header">
    <nav class="top-nav">
      <div class="logo">
        <span class="logo-ar">سوبر</span>
        <span class="logo-en">منيو</span>
      </div>

      <div class="actions">
        <button class="lang-toggle" @click="toggleLang">
          {{ currentLang === 'ar' ? 'EN' : 'AR' }}
        </button>
        <button class="login-button" @click="fakeLogin">تسجيل الدخول</button>
      </div>
    </nav>

    <!-- ✅ خط فاصل تحت اللوقو والأزرار -->
    <div class="nav-divider"></div>

    <div class="hero-message">
      <h1 class="headline">
        <span class="highlight">الضيافة</span> تبدأ من المنيو
      </h1>
      <p class="subtext">
        ارتقِ بتجربة عملائك عبر منيو <span class="highlight">تفاعلي وذكي</span> يعكس هوية مطعمك ويُعرض بانسيابية على كل شاشة.
      </p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentLang = ref<'ar' | 'en'>('ar')

function toggleLang() {
  currentLang.value = currentLang.value === 'ar' ? 'en' : 'ar'
  document.documentElement.setAttribute('dir', currentLang.value === 'ar' ? 'rtl' : 'ltr')
}

function fakeLogin() {
  router.push('/cboard')
}
</script>

<style scoped>
.header {
  background-color: #FFFFFF;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.logo-ar {
  color: #FF7A00;
  font-family: 'Tajawal', sans-serif;
}

.logo-en {
  color: #1C1C1C;
  font-family: 'Inter', sans-serif;
}

.actions {
  display: flex;
  gap: 1rem;
}

.lang-toggle,
.login-button {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.lang-toggle {
  background-color: #FFFFFF;
  color: #1C1C1C;
  border: 1px solid #1C1C1C;
}

.lang-toggle:hover {
  background-color: #F9F9F9;
}

.login-button {
  background-color: #FF7A00;
  color: #FFFFFF;
  border: none;
}

.login-button:hover {
  background-color: #e96b00;
}

/* ✅ الخط الفاصل */
.nav-divider {
  width: 100%;
  height: 1px;
  background-color: #EAEAEA;
}

.hero-message {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.headline {
  font-size: 2.5rem;
  color: #1C1C1C;
  margin-bottom: 0.5rem;
  font-family: 'Tajawal', sans-serif;
}

.subtext {
  font-size: 1.2rem;
  color: #1C1C1C;
  font-family: 'Tajawal', sans-serif;
}

.highlight {
  color: #FF7A00;
  font-weight: bold;
}
</style>
