<template>
  <section class="settings-section">
    <h2>إعدادات الدومين</h2>

    <div class="domain-info">
      <label>رابط النطاق الفرعي</label>
      <div class="domain-link">
        <a
  class="domain-link"
  :href="menuUrl"
  target="_blank"
  rel="noopener noreferrer"
>
  {{ menuUrl }}
</a>
<button class="copy-btn" @click="copyToClipboard">📋 نسخ</button>
      </div>
    </div>

    <div class="email-verification">
      <label>حالة الرابط</label>
      <div class="toggle-wrapper">
  <label class="switch">
    <input type="checkbox" v-model="isActive" />
    <span class="slider"></span>
  </label>
  <span class="toggle-label">
    {{ isActive ? 'الرابط مفعل 🔔' : 'الرابط غير مفعل 🔕' }}
  </span>
</div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed ,onMounted, watch} from 'vue'
import { indexedDBService } from '@/services/indexedDBService'

const isActive = ref(false)

function toggleLink() {
  isActive.value = !isActive.value
}

// تحديد الرابط حسب البيئة
const menuUrl = computed(() => {
  const base =
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5173'
      : 'https://client.example.com'
  return `${base}/menu/42`
})

function copyToClipboard() {
  navigator.clipboard.writeText(menuUrl.value).then(() => {
    alert('✅ تم نسخ الرابط إلى الحافظة')
  }).catch(() => {
    alert('❌ فشل نسخ الرابط')
  })
}

onMounted(async () => {
  const record = await indexedDBService.get('domain', 'default')
  isActive.value = record?.isActive ?? false
})

watch(isActive, async (newValue) => {
  await indexedDBService.put('domain', { id: 'default', isActive: newValue })
})



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
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #000000;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.domain-info,
.email-verification {
  margin-bottom: 1.5rem;
}

.domain-link code {
  background-color: #fff6ec;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  display: inline-block;
  font-size: 0.95rem;
  color: #ff9318;
  border: 1px solid #ffd9b3;
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
.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.5rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0;
  right: 0; bottom: 0;
  background-color: #ccc;
  transition: 0.3s;
  border-radius: 26px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #ff9318;
}

input:checked + .slider:before {
  transform: translateX(24px);
}

.toggle-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a1a1a;
}
.domain-link {
  display: inline-block;
  background-color: #fff6ec;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #ff9318;
  border: 1px solid #ffd9b3;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.domain-link:hover {
  background-color: #fff0dc;
  text-decoration: underline;
}
.domain-link-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.domain-link {
  background-color: #fff6ec;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #ff9318;
  border: 1px solid #ffd9b3;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.domain-link:hover {
  background-color: #fff0dc;
  text-decoration: underline;
}

.copy-btn {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  background-color: #1C1C1C;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.copy-btn:hover {
  background-color: #000000;
}

</style>
