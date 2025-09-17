<template>
  <div class="social-group">
    <h4>{{ title }}</h4>
    <div class="group-fields">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<style scoped>
.social-group {
  margin-bottom: 1.5rem;
}
.group-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
h4 {
  margin-bottom: 0.5rem;
  color: #444;
}
</style>
