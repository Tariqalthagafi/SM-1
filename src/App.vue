<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
// لا حاجة لأي كود في هذه المرحلة
</script>

<style>
/* ✅ ضبط الهيكل العام بدون اتجاه */
html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', sans-serif;
}
</style>
