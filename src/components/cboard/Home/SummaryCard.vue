<template>
  <div class="summary-card">
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-value">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: string
}>()
</script>

<style scoped>
.summary-card {
  background-color: transparent; /* ✅ إزالة الخلفية */
  border-radius: 0;              /* ✅ إزالة الزوايا */
  padding: 0;                    /* ✅ إزالة الحواف */
  box-shadow: none;              /* ✅ إزالة الظل */
  border: none;                  /* ✅ إزالة الحدود */
  font-family: 'Tajawal', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.card-title {
  font-size: 1.1rem;
  color: #FF7A00; /* ✅ برتقالي للتمييز */
  font-weight: bold;
  margin: 0;
}

.card-value {
  font-size: 1.6rem;
  color: #1C1C1C; /* ✅ أسود للنص الأساسي */
  font-weight: 600;
  margin: 0;
}
</style>
