<template>
  <section class="feature-slider">
    <Swiper
      v-if="isReady"
      :modules="[Pagination, Autoplay]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 5000 }"
      :pagination="{ clickable: true }"
      :observer="true"
      :observe-parents="true"
      :space-between="20"
      :effect="'slide'"
    >
      <SwiperSlide><Slide1 /></SwiperSlide>
      <SwiperSlide><Slide2 /></SwiperSlide>
      <SwiperSlide><Slide3 /></SwiperSlide>
      <SwiperSlide><Slide4 /></SwiperSlide>
      <SwiperSlide><Slide5 /></SwiperSlide>
      <SwiperSlide><Slide6 /></SwiperSlide>
      <SwiperSlide><Slide7 /></SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import Slide1 from './Slider/Slide1.vue'
import Slide2 from './Slider/Slide2.vue'
import Slide3 from './Slider/Slide3.vue'
import Slide4 from './Slider/Slide4.vue'
import Slide5 from './Slider/Slide5.vue'
import Slide6 from './Slider/Slide6.vue'
import Slide7 from './Slider/Slide7.vue'

const isReady = ref(false)

onMounted(() => {
  // تأخير بسيط لضمان تحميل كل السلايدات قبل عرض السلايدر
  setTimeout(() => {
    isReady.value = true
  }, 100)
})
</script>

<style scoped>
.feature-slider {
  padding: 3rem 1rem;
  background-color: #fff;
  max-width: 900px;
  margin: 0 auto;
}

.swiper {
  width: 100%;
  height: auto;
}
</style>
