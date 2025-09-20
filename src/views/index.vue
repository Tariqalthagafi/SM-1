<template>
  <main class="home">

    <!-- 🔼 القسم الرابع: الشعار وزر اللغة وتسجيل الدخول -->
    <nav class="top-nav">
      <div class="logo">أداة المنيو</div>
      <div class="actions">
        <button class="lang-toggle">EN</button>
        <button @click="fakeLogin">تسجيل الدخول</button>
      </div>
    </nav>

    <!-- 🟢 القسم الأول: العنوان والتعريف -->
    <section class="intro">
      <h1 class="headline">الضيافة تبدأ من المنيو</h1>
      <p class="description">
        أداة المنيو هي أداة لإنشاء وإدارة منيو تفاعلي يعكس هوية العميل ويُعرض بشكل احترافي على جميع الأجهزة.
      </p>
    </section>

    <!-- 🟠 القسم الثاني: سلايدر المميزات -->
    <section class="features-slider">
      <Swiper
        :modules="[Pagination, Autoplay]"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 3000 }"
        :pagination="{ clickable: true }"
        class="swiper-container"
      >
        <SwiperSlide v-for="(feature, i) in features" :key="i">
          <div class="slide">
            <span class="green">✔</span> {{ feature }}
          </div>
        </SwiperSlide>
      </Swiper>
    </section>

    <!-- ⚫ القسم الثالث: الفوتر -->
    <footer class="footer">
      <p>© 2025 أداة المنيو. جميع الحقوق محفوظة.</p>
    </footer>

  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'

const router = useRouter()

function fakeLogin() {
  router.push('/cboard')
}

const features = [
  'تخصيص كامل للمنيو حسب هوية العميل',
  'نشر مباشر على دومين خاص أو فرعي',
  'دعم متعدد العملاء مع عزل البيانات',
  'لوحة تحكم سهلة لإدارة المحتوى',
  'تصميم متجاوب لجميع الأجهزة'
]
</script>

<style scoped>
/* ✅ ضبط الهيكل العام */
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', sans-serif;
  background-color: #fff;
  color: #000;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

/* 🔼 القسم الرابع: الشعار وزر اللغة وتسجيل الدخول */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #000;
  color: #fff;
  width: 100%;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 1rem;
}

.actions button {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.actions button:hover {
  background-color: #eee;
}

/* 🟢 القسم الأول: العنوان والتعريف */
.intro {
  text-align: center;
  padding: 3rem 1rem;
  width: 100%;
}

.headline {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  color: #333;
}

/* 🟠 القسم الثاني: سلايدر المميزات */
.features-slider {
  padding: 2rem 1rem;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  width: 100%;
}

.swiper-container {
  width: 100%;
  max-width: 100vw;
}

.slide {
  font-size: 1.5rem;
  color: #000;
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.green {
  color: #28a745;
  font-size: 1.4rem;
  margin-right: 0.5rem;
}

/* ⚫ القسم الثالث: الفوتر */
.footer {
  text-align: center;
  padding: 2rem 1rem;
  background-color: #000;
  color: #fff;
  font-size: 0.9rem;
  margin-top: auto;
  width: 100%;
}

/* ✅ تحسين العرض على الشاشات الصغيرة */
@media (max-width: 600px) {
  .headline {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }

  .slide {
    font-size: 1.2rem;
    padding: 1.5rem;
  }

  .top-nav {
    flex-direction: column;
    align-items: flex-start;
  }

  .actions {
    margin-top: 1rem;
    width: 100%;
    justify-content: flex-start;
  }

  .actions button {
    width: auto;
  }
}
</style>
