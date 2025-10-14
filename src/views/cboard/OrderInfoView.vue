<template>
  <div class="order-info-editor">
    <!-- ✅ مواعيد العمل -->
    <section class="info-section">
      <h3>مواعيد العمل</h3>
      <div v-for="day in allDays" :key="day" class="day-row">
        <h4>{{ day }}</h4>
        <div class="periods-inline">
          <div v-for="(period, i) in operatingHours[day]" :key="i" class="period-inline">
            <input
              type="time"
              v-model="period.from"
              @focus="focusedField = `${day}-from-${i}`"
              @blur="focusedField = ''"
              :class="{ active: focusedField === `${day}-from-${i}` }"
            />
            <span>إلى</span>
            <input
              type="time"
              v-model="period.to"
              @focus="focusedField = `${day}-to-${i}`"
              @blur="focusedField = ''"
              :class="{ active: focusedField === `${day}-to-${i}` }"
            />
            <button @click="removePeriod(day, i)">🗑️</button>
          </div>
          <button class="add-btn" @click="addPeriod(day)">➕</button>
        </div>
      </div>
    </section>

    <!-- ✅ طرق استلام الطلب -->
    <section class="info-section">
      <h3>طرق استلام الطلب</h3>
      <div v-for="method in deliveryMethods" :key="method.name" class="toggle-row">
        <label>{{ method.name }}</label>
        <input type="checkbox" v-model="method.enabled" />
      </div>
    </section>

    <!-- ✅ طرق الدفع -->
    <section class="info-section">
      <h3>طرق الدفع</h3>
      <div v-for="method in paymentMethods" :key="method.name" class="toggle-row">
        <label>{{ method.name }}</label>
        <input type="checkbox" v-model="method.enabled" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useOrderInfoStore } from '@/stores/cboard/OrderInfo'

const focusedField = ref('')
const allDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']

const {
  operatingHours,
  deliveryMethods,
  paymentMethods,
  load,
  save,
  addPeriod,
  removePeriod
} = useOrderInfoStore()

onMounted(() => {
  load()
})

watch([operatingHours, deliveryMethods, paymentMethods], () => {
  save()
}, { deep: true })
</script>

<style scoped>
.order-info-editor {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  font-family: var(--font-family, 'Tajawal');
  background-color: var(--background-bg, #fff);
  color: var(--titleText-color, #000);
}

.info-section h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--sectionTitle-color, #000);
  border-bottom: 1px solid var(--sectionTitle-color, #000);
  padding-bottom: 0.3rem;
}

.day-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.day-row h4 {
  width: 100px;
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0;
  color: var(--titleText-color, #000);
}

.periods-inline {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  flex: 1;
}

.period-inline {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background-color: #f9f9f9;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.period-inline input[type="time"] {
  padding: 0.3rem;
  font-size: 0.85rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #000;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.period-inline input.active {
  border-color: #FF7A00 !important;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
}

.period-inline button {
  background: none;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  color: #f00;
}

.add-btn {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #007bff;
}

.toggle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
  border-bottom: 1px dashed #ccc;
}

.toggle-row label {
  font-size: 0.9rem;
  color: var(--titleText-color, #000);
}

.toggle-row input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: orange;
}
</style>
