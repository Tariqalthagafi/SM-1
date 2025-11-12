<template>
  <div class="slide">
    <h2>
  <span class="headline-part1">{{ t('home.hero.headline.part1') }}</span>&nbsp;
  <span class="headline-part2">{{ t('home.hero.headline.part2') }}</span>
</h2>
<img src="/images/slide-hero.png" alt="Hero Slide" class="hero-image" />

    
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.slide {
  text-align: center;
  padding: 2rem 1rem;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* ✅ العنوان */
h2 {
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.headline-part1 {
  color: #FF7A00;
  font-weight: bold;
  font-size: 2rem;
  font-family: 'Tajawal', sans-serif;
  margin-inline-end: 0.25rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.headline-part2 {
  color: #1C1C1C;
  font-weight: normal;
  font-size: 2.3rem;
  font-family: 'Inter', sans-serif;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* ✅ الصورة */
.hero-image {
  max-width: 200px;
  height: 200px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  opacity: 0;
  transform: scale(0.95);
  animation: fadeInZoom 0.8s ease-out forwards;
}

/* ✅ تأثير دخول للصورة */
@keyframes fadeInZoom {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ✅ فقرة إضافية (اختياري) */
p {
  color: #1C1C1C;
  font-size: 1.1rem;
  margin: 1rem 0 1.5rem;
  font-family: 'Tajawal', sans-serif;
}

.highlight {
  color: #FF7A00;
  font-weight: bold;
}
</style>

