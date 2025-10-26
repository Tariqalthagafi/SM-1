<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useFontStore } from '@/stores/cboard/templates/fontStore'

const fontStore = useFontStore()

onMounted(async () => {
  await fontStore.initFontOptions() // ✅ تحميل الخط وتطبيقه مباشرة
})
</script>


<style>
/* لا يوجد أي ستايل هنا، كل مكون مسؤول عن شكله */
</style>
