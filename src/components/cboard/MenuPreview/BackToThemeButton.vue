<template>
  <div class="back-button">
    <button @click="goBack">
      ← العودة إلى إعدادات الثيم
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.push('/cboard/templates')
}
</script>

<style scoped>
.back-button {
  margin-top: 2rem;
  text-align: center;
}

button {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s ease;
}

button:hover {
  background-color: #e0e0e0;
}
</style>
