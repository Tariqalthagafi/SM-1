<template>
  <section class="info-section" v-if="isReady">
    <h3>مواعيد العمل</h3>
    <div class="days-grid">
      <div v-for="day in allDays" :key="day" class="day-card">
        <h4>{{ day }}</h4>

        <div class="period-options">
          <!-- الفترة الأولى -->
          <div class="option-row" :class="{ active: getPeriod(day, 'first')?.enabled }">
            <button @click="togglePeriod(day, 'first')">الفترة الأولى</button>

            <div class="period-info" v-if="getPeriod(day, 'first')?.enabled">
              <input type="time" v-model="getPeriod(day, 'first').from" />
              إلى
              <input type="time" v-model="getPeriod(day, 'first').to" />
            </div>
            <div class="period-info" v-else>
              08:00 إلى 12:00
            </div>

            <label class="switch">
              <input type="checkbox" :checked="getPeriod(day, 'first')?.enabled" @change="togglePeriod(day, 'first')" />
              <span class="slider"></span>
            </label>
          </div>

          <!-- الفترة الثانية -->
          <div class="option-row" :class="{ active: getPeriod(day, 'second')?.enabled }">
            <button @click="togglePeriod(day, 'second')">الفترة الثانية</button>

            <div class="period-info" v-if="getPeriod(day, 'second')?.enabled">
              <input type="time" v-model="getPeriod(day, 'second').from" />
              إلى
              <input type="time" v-model="getPeriod(day, 'second').to" />
            </div>
            <div class="period-info" v-else>
              16:00 إلى 22:00
            </div>

            <label class="switch">
              <input type="checkbox" :checked="getPeriod(day, 'second')?.enabled" @change="togglePeriod(day, 'second')" />
              <span class="slider"></span>
            </label>
          </div>

          <!-- 24 ساعة -->
          <div class="option-row" :class="{ active: getPeriod(day, 'full')?.enabled }">
            <button @click="togglePeriod(day, 'full')">24 ساعة</button>

            <div class="period-info" v-if="getPeriod(day, 'full')?.enabled">
              <input type="time" v-model="getPeriod(day, 'full').from" />
              إلى
              <input type="time" v-model="getPeriod(day, 'full').to" />
            </div>
            <div class="period-info" v-else>
              00:00 إلى 23:59
            </div>

            <label class="switch">
              <input type="checkbox" :checked="getPeriod(day, 'full')?.enabled" @change="togglePeriod(day, 'full')" />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { ref, watch, toRaw, onMounted } from 'vue'
import { useOrderInfoStore } from '@/stores/cboard/OrderInfo'
import { indexedDBService } from '@/services/indexedDBService'
import type { OperatingHours, TimePeriod } from '@/types/contexts/OrderInfo'



const allDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
const store = useOrderInfoStore()
const operatingHours = store.operatingHours
const isReady = ref(false)

onMounted(async () => {
  const saved = await indexedDBService.getOperatingHours('default')
  allDays.forEach(day => {
    operatingHours.value[day] = saved?.[day] ?? []
  })
  isReady.value = true
})

watch(operatingHours, () => {
  const cleanData = JSON.parse(JSON.stringify(toRaw(operatingHours.value)))
  indexedDBService.saveOperatingHours(cleanData, 'default')
}, { deep: true })

function getPeriodValues(type: 'first' | 'second' | 'full'): TimePeriod {
  if (type === 'first') return { type: 'first', from: '08:00', to: '12:00', enabled: true }
  if (type === 'second') return { type: 'second', from: '16:00', to: '22:00', enabled: true }
  return { type: 'full', from: '00:00', to: '23:59', enabled: true }
}


function hasPeriod(day: string, type: 'first' | 'second' | 'full') {
  return operatingHours.value[day].some(p => p.type === type && p.enabled)
}

function getPeriod(day: string, type: 'first' | 'second' | 'full') {
  const index = operatingHours.value[day].findIndex(p => p.type === type)
  return operatingHours.value[day][index] ?? getPeriodValues(type)
}

function togglePeriod(day: string, type: 'first' | 'second' | 'full') {
  const periods = operatingHours.value[day]
  const index = periods.findIndex(p => p.type === type)

  if (index !== -1) {
    periods[index].enabled = !periods[index].enabled
  } else {
    // إذا كانت 24 ساعة مفعلة، نلغيها أولاً
    const fullIndex = periods.findIndex(p => p.type === 'full')
    if (fullIndex !== -1) periods.splice(fullIndex, 1)

    periods.push(getPeriodValues(type))
  }
}

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

.days-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.day-card {
  background: #fff;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  padding: 1rem;
  font-family: 'Tajawal', sans-serif;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.day-card h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.3rem;
}

.period-options {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.option-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.option-row.active {
  background-color: #FFF3E5;
  border: 1px solid #FF7A00;
}

.option-row button {
  background: none;
  border: none;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  color: #333;
}

.period-info {
  font-size: 0.8rem;
  color: #666;
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.period-info input[type="time"] {
  padding: 0.2rem 0.4rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.8rem;
  font-family: inherit;
}

/* زر التبديل */
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
.period-info {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
  max-width: 100%;
}

.period-info input[type="time"] {
  width: 80px;
  min-width: 70px;
  max-width: 100px;
  box-sizing: border-box;
}


</style>
