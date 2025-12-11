<template>
  <div class="public-menu">
    <MenuDataProvider v-if="shortId" :shortId="shortId" />
  </div>
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import MenuDataProvider from '@/components/public/MenuDataProvider.vue'

const route = useRoute()

// ✅ تحويل shortId إلى string آمن
const shortId = computed(() => {
  const param = route.params.shortId
  // لو كان مصفوفة نأخذ أول عنصر، لو كان undefined نرجع نص فارغ
  return Array.isArray(param) ? param[0] : String(param ?? '')
})
</script>

<style scoped>
.public-menu { width: 100%; }
</style>
