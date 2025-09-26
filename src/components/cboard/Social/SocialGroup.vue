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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem 2rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #E0E0E0;
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
