<template>
  <div class="public-menu">
    <MenuDataProvider :shortId="menuShortId" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import MenuDataProvider from '@/components/public/MenuDataProvider.vue'

const route = useRoute()

// تأكد أن القيمة دائمًا string
const menuShortId = computed(() => {
  const param = route.params.shortId
  return Array.isArray(param) ? param[0] : String(param)
})
</script>

<style scoped>
.public-menu { width: 100%; }
</style>
