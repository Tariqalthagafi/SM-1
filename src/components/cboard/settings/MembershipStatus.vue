<template>
  <div class="card">
    <h3>حالة العضوية</h3>

    <div class="field">
      <label>رقم الحساب</label>
      <code>{{ accountId }}</code>
    </div>

    <div class="field">
      <label>الحالة الحالية</label>
      <span :class="['status', isActive ? 'active' : 'inactive']">
        {{ isActive ? 'مفعلة' : 'غير مفعلة' }}
      </span>
    </div>

    <button v-if="!isActive" class="activate-btn" @click="activate">
      ✅ تفعيل العضوية
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// وهميًا: الحالة تبدأ غير مفعلة
const isActive = ref(false)
const accountId = 'ACCT-1024'

function activate() {
  isActive.value = true
}
</script>

<style scoped>
.card {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  text-align: center;
  font-family: 'Segoe UI', sans-serif;
}

h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
}

.field {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: #555;
}

code {
  background-color: #eef;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #005fa3;
}

.status {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.95rem;
}

.status.active {
  background-color: #d4edda;
  color: #155724;
}

.status.inactive {
  background-color: #f8d7da;
  color: #721c24;
}

.activate-btn {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #0078d4;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
}

.activate-btn:hover {
  background-color: #005fa3;
}
</style>
