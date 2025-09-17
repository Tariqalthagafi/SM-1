<template>
  <span class="social-icon">
    <img :src="iconUrl" :alt="props.platform" />
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{ platform: string }>()

const iconUrl = `/icons/social/${props.platform}.svg`
</script>

<style scoped>
.social-icon img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
</style>
