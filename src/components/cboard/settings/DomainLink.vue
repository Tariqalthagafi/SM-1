<template>
  <section class="settings-section">
    <h2>إعداد دومين خارجي</h2>

    <!-- اسم الدومين -->
    <div class="domain-field">
      <label>اسم الدومين</label>
      <input type="text" v-model="customDomain" placeholder="example.com" />
      <small class="hint">أدخل اسم الدومين الذي تملكه</small>
    </div>

    <!-- نوع الـ DNS Record -->
    <div class="domain-field">
      <label>نوع الربط (DNS Record)</label>
      <select v-model="recordType">
        <option value="A">A Record</option>
        <option value="CNAME">CNAME Record</option>
      </select>
      <small class="hint">اختر طريقة الربط: IP مباشر (A) أو دومين رئيسي (CNAME)</small>
    </div>

    <!-- قيمة الـ Record -->
    <div class="domain-field">
      <label>قيمة الربط</label>
      <input type="text" v-model="recordValue" placeholder="مثال: client.example.com أو 192.168.1.1" />
      <small class="hint">أدخل القيمة التي ستضعها في لوحة تحكم الدومين</small>
    </div>

    <!-- TXT Record للتحقق -->
    <div class="domain-field">
      <label>كود التحقق (TXT Record)</label>
      <input type="text" v-model="txtRecord" placeholder="verify=account123" />
      <small class="hint">أضف هذا الكود في إعدادات DNS للتحقق من ملكية الدومين</small>
    </div>

    <!-- زر تحقق شكلي -->
    <div class="domain-actions">
      <button class="verify-btn">تحقق من الربط</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const customDomain = ref('')
const recordType = ref('CNAME')
const recordValue = ref('')
const txtRecord = ref('')
</script>

<style scoped>
.settings-section {
  padding: 2rem;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  margin: auto;
  font-family: 'Segoe UI', sans-serif;
  color: #1a1a1a;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #000000;
}

.domain-field {
  margin-bottom: 1.2rem;
}

.domain-field label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.domain-field input,
.domain-field select {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  font-size: 0.95rem;
}

.hint {
  display: block;
  margin-top: 0.3rem;
  font-size: 0.8rem;
  color: #666;
}

.domain-actions {
  text-align: center;
  margin-top: 1.5rem;
}

.verify-btn {
  padding: 0.6rem 1.2rem;
  background-color: #ff9318;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.verify-btn:hover {
  background-color: #d86e00;
}

.verify-btn:active {
  transform: scale(0.98);
}
</style>
