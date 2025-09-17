<template>
  <button @click="fakeLogin" class="login-btn">تسجيل الدخول</button>
</template>

<script setup>
function fakeLogin() {
  alert('تم تسجيل الدخول (وهميًا) 🎉')
}
</script>

<style scoped>
.login-btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
