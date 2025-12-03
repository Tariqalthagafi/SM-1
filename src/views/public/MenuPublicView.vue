<template>
  <div class="public-menu">
    <MenuDataProvider :uuid="menuId" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import MenuDataProvider from '@/components/public/MenuDataProvider.vue'

const route = useRoute()
const menuId = computed(() => String(route.params.id))
</script>

<style scoped>
.public-menu { width: 100%; }
</style>
