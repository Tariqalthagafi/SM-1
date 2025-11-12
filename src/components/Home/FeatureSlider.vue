<template>
  <section class="feature-slider">
    <Swiper
      :modules="[Pagination, Autoplay, EffectFade]"
      :slides-per-view="1"
      :loop="false"
      :autoplay="{ delay: 5000 }"
      :pagination="{ clickable: true, el: '.custom-pagination' }"
      :observer="true"
      :observe-parents="true"
      :space-between="20"
      :effect="'fade'"
    >
      <SwiperSlide><div class="slide-wrapper"><HeroSlider /></div></SwiperSlide>
      <SwiperSlide><div class="slide-wrapper"><Slide7 /></div></SwiperSlide>
      <SwiperSlide><div class="slide-wrapper"><Slide1 /></div></SwiperSlide>
      <SwiperSlide><div class="slide-wrapper"><Slide2 /></div></SwiperSlide>
      <SwiperSlide><div class="slide-wrapper"><Slide3 /></div></SwiperSlide>
      <SwiperSlide><div class="slide-wrapper"><Slide4 /></div></SwiperSlide>
      <SwiperSlide><div class="slide-wrapper"><Slide5 /></div></SwiperSlide>
      <SwiperSlide><div class="slide-wrapper"><Slide6 /></div></SwiperSlide>
    </Swiper>
    <div class="custom-pagination"></div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import HeroSlider from './Slider/HeroSlider.vue'
import Slide1 from './Slider/Slide1.vue'
import Slide2 from './Slider/Slide2.vue'
import Slide3 from './Slider/Slide3.vue'
import Slide4 from './Slider/Slide4.vue'
import Slide5 from './Slider/Slide5.vue'
import Slide6 from './Slider/Slide6.vue'
import Slide7 from './Slider/Slide7.vue'

const isReady = ref(false)

onMounted(async () => {
  await nextTick()
  isReady.value = true
})
</script>

<style scoped>
.feature-slider {
  position: relative;
  padding: 3rem 1rem;
  background-color: #fff;
  max-width: 900px;
  margin: 0 auto;
}

.swiper {
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;
}

/* ✅ الشرائح غير النشطة — إخفاء فوري */
:deep(.swiper-slide),
:deep(.swiper-slide-duplicate) {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 0;
  transform: scale(0.98);
  filter: blur(8px);
  transition: none; /* ← إخفاء فوري بدون تدرج */
}

/* ✅ الشريحة النشطة — تدرج ناعم */
:deep(.swiper-slide-active),
:deep(.swiper-slide-duplicate-active) {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  z-index: 1;
  transform: scale(1);
  filter: blur(0px);
  transition:
    opacity 0.8s ease,
    visibility 0s linear 0s,
    transform 0.8s ease,
    filter 0.8s ease;
}

/* ✅ تغليف داخلي للشرائح */
.slide-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ✅ النقاط الرأسية */
:deep(.custom-pagination) {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  z-index: 10;
}

:deep(.custom-pagination .swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ccc;
  opacity: 0.4;
  transition: transform 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease;
}

:deep(.custom-pagination .swiper-pagination-bullet-active) {
  background-color: #FF7A00;
  opacity: 1;
  transform: scale(1.2);
  box-shadow: 0 0 3px #FF7A00;
}

/* ✅ دعم الاتجاه حسب اللغة */
:deep(html[dir="rtl"] .custom-pagination) {
  right: 1rem;
  left: auto;
}

:deep(html[dir="ltr"] .custom-pagination) {
  left: 1rem;
  right: auto;
}
</style>
