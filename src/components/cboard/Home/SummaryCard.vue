<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <p>{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: string
}>()
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 1.2rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: default;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
}

.card h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: #2c3e50;
}

.card p {
  font-size: 1rem;
  color: #555;
  margin: 0;
}
</style>
