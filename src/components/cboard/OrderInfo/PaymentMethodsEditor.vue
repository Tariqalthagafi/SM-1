<template>
  <section class="info-section">
    <h3>طرق الدفع</h3>
    <div class="methods-grid">
      <div
        class="method-card"
        v-for="method in typedPaymentMethods"
        :key="method.name"
      >
        <div class="method-icon">{{ method.icon }}</div>
        <div class="method-name">{{ method.name }}</div>
        <label class="switch">
          <input type="checkbox" v-model="method.enabled" />
          <span class="slider"></span>
        </label>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useOrderInfoStore } from '@/stores/OrderInfo'
import type { PaymentMethod } from '@/types/contexts/OrderInfo'

const store = useOrderInfoStore()
const typedPaymentMethods = store.paymentMethods as (PaymentMethod & { icon: string })[]

watch(typedPaymentMethods, () => {
  store.save()
}, { deep: true })
</script>

<style scoped>
.info-section h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--sectionTitle-color, #000);
  border-bottom: 1px solid var(--sectionTitle-color, #000);
  padding-bottom: 0.3rem;
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
}

.method-card {
  background: #fff;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Tajawal', sans-serif;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease;
}

.method-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.method-icon {
  font-size: 1.6rem;
}

.method-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: #1C1C1C;
  text-align: center;
}

/* ✅ زر التبديل */
.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
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
  border-radius: 20px;
  transition: 0.3s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: 0.3s;
}

input:checked + .slider {
  background-color: #FF7A00;
}

input:checked + .slider:before {
  transform: translateX(16px);
}
</style>
