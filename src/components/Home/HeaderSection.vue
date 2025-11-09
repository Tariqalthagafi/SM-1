<template>
  <header class="header">
    <nav class="top-nav">
<div class="logo">
  <span class="logo-ar">{{ t('home.header.logo.part1') }}</span>
  <span class="logo-en">{{ t('home.header.logo.part2') }}</span>
</div>


      <div class="actions">
        <button class="lang-toggle" @click="toggleLang">
  {{ t('home.header.langToggle') }}

</button>
        <button class="login-button" @click="loginWithGoogle">
  <img src="/icons/login/google-icon.svg" alt="Google" class="google-icon" />
  {{ t('home.header.loginButton') }}
</button>


      </div>
    </nav>

    <!-- ✅ خط فاصل تحت اللوقو والأزرار -->
    <div class="nav-divider"></div>

    <div class="hero-message">
      <h1 class="headline">
        <span class="highlight">{{ t('home.hero.headline.part1') }}</span> {{ t('home.hero.headline.part2') }}
      </h1>
      <p class="subtext">
        {{ t('home.hero.subtext.part1') }} <span class="highlight">{{ t('home.hero.subtext.highlight') }}</span> {{ t('home.hero.subtext.part2') }}
      </p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()


const router = useRouter()
const currentLang = ref<'ar' | 'en'>('ar')

// ✅ تغيير اتجاه الصفحة حسب اللغة
function toggleLang() {
  currentLang.value = currentLang.value === 'ar' ? 'en' : 'ar'
  locale.value = currentLang.value // ✅ هذا السطر هو المفتاح
  document.documentElement.setAttribute('dir', currentLang.value === 'ar' ? 'rtl' : 'ltr')
}


// ✅ تسجيل الدخول عبر Google
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

// ✅ التوجيه إلى لوحة التحكم بعد العودة من Google
onMounted(async () => {
  document.documentElement.setAttribute('dir', currentLang.value === 'ar' ? 'rtl' : 'ltr')

  const { data: user } = await supabase.auth.getUser()
  if (user?.user) {
    router.push('/cboard') // ✅ توجيه المستخدم إلى لوحة التحكم
  }
})
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

.login-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #ffffff;
  color: #FF7A00;
  border: 2px solid #FF7A00;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.login-button:hover {
  background-color: #fff5eb;
}

.google-icon {
  width: 20px;
  height: 20px;
  color: black;
}

</style>
