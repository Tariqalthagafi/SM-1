<template>
  <section class="settings-section">
    <h2>حالة العضوية</h2>

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
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isActive = ref(false)
const accountId = 'ACCT-1024'

function activate() {
  isActive.value = true
}
</script>

<style scoped>
.settings-section {
  padding: 2rem;
  max-width: 600px;
  margin: auto;
  font-family: 'Segoe UI', sans-serif;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  color: #1a1a1a;
  text-align: center;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #000000;
}

.field {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

code {
  background-color: #fff6ec;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #ff9318;
  border: 1px solid #ffd9b3;
}

.status {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
}

.status.active {
  background-color: #fff6ec;
  color: #ff9318;
  border: 1px solid #ffd9b3;
}

.status.inactive {
  background-color: #f0f0f0;
  color: #999;
  border: 1px solid #ddd;
}

.activate-btn {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #ff9318;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.activate-btn:hover {
  background-color: #d86e00;
}
</style>
