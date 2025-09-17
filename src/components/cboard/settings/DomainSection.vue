<template>
  <section class="settings-section">
    <h2>إعدادات الدومين</h2>

    <!-- رابط النطاق الفرعي -->
    <div class="domain-info">
      <label>رابط النطاق الفرعي</label>
      <div class="domain-link">
        <code>https://client.example.com/menu/42</code>
      </div>
    </div>

    <!-- زر تفعيل / تعطيل الرابط -->
    <div class="email-verification">
      <label>حالة الرابط</label>
      <button class="verify-btn" @click="toggleLink">
        {{ isActive ? '🚫 تعطيل الرابط' : '📧 تفعيل الرابط' }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// حالة الرابط (وهمية)
const isActive = ref(false)

function toggleLink() {
  isActive.value = !isActive.value
}
</script>

<style scoped>
.settings-section {
  padding: 2rem;
  max-width: 500px;
  margin: auto;
  font-family: 'Segoe UI', sans-serif;
  background-color: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

h2 {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: #555;
}

.domain-info,
.email-verification {
  margin-bottom: 1.5rem;
}

.domain-link code {
  background-color: #eef;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  display: inline-block;
  font-size: 0.95rem;
  color: #005fa3;
}

.verify-btn {
  padding: 0.5rem 1rem;
  background-color: #0078d4;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.verify-btn:hover {
  background-color: #005fa3;
}

.verify-btn:active {
  transform: scale(0.98);
}
</style>
