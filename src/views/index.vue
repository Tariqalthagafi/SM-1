<template>
  <main class="home">
    <header class="top-bar">
      <button @click="fakeLogin">تسجيل الدخول</button>
    </header>

    <section class="content">
      <h1 class="title">منيو رقمي</h1>
      <div class="features-scroll">
        <div class="feature"><span class="green">✔</span> تخصيص كامل للمنيو حسب هوية العميل</div>
        <div class="feature"><span class="green">✔</span> نشر مباشر على دومين خاص أو فرعي</div>
        <div class="feature"><span class="green">✔</span> دعم متعدد العملاء مع عزل البيانات</div>
        <div class="feature"><span class="green">✔</span> لوحة تحكم سهلة لإدارة المحتوى</div>
        <div class="feature"><span class="green">✔</span> تصميم متجاوب لجميع الأجهزة</div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function fakeLogin() {
  router.push('/cboard')
}
</script>

<style scoped>
/* ✅ ضبط الهيكل العام */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', sans-serif;
  overflow-x: auto;

}

.home {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom right, #28a745, #ffffff); /* ✅ تدرج أخضر إلى أبيض */
  font-family: 'Segoe UI', sans-serif;
  overflow-x: auto;
}

/* ✅ شريط علوي */
.top-bar {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 2rem;
}

.top-bar button {
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.top-bar button:hover {
  background-color: #0056b3;
}

/* ✅ محتوى الصفحة */
.content {
  flex: 1;
  width: 100%;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* ✅ العنوان */
.title {
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #222;
  text-align: center;
}

/* ✅ توزيع أفقي للعناصر */
.features-scroll {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem;
  scroll-snap-type: x mandatory;
  width: 100%;
  justify-content: center;
}

.feature {
  flex: 0 0 auto;
  scroll-snap-align: start;
  font-size: 1.2rem;
  color: #444;
  background-color: #ffffffaa;
  padding: 1rem;
  border-radius: 8px;
  text-align: left;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  min-width: 280px;
}

.green {
  color: #28a745;
  font-size: 1.4rem;
  margin-right: 0.5rem;
}

/* ✅ تحسين العرض على الشاشات الصغيرة */
@media (max-width: 600px) {
  .content {
    padding: 2rem 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .feature {
    font-size: 1rem;
    min-width: 220px;
  }

  .top-bar {
    padding: 1rem;
  }

  .top-bar button {
    width: 100%;
  }
}
</style>
