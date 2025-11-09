<template>
  <div class="contact-button-container none">
    <button
  class="main-contact-btn"
  @click="isOpen = !isOpen"
  :style="{ backgroundColor: props.colors.topIconsBackground }"
>

      <img src="/icons/operationstime/hours.svg" alt="ساعات التشغيل" class="svg-icon" />
    </button>

    <div v-if="isOpen" class="contact-popover">
      <h6 class="popover-title">ساعات التشغيل</h6>

      <div v-if="activeDaysWithPeriods.length" class="social-links">
        <div
          v-for="{ day, periods } in activeDaysWithPeriods"
          :key="day"
          class="social-link-item"
          :title="day"
          @click="isOpen = false"
        >
          <span class="icon-wrapper white-bg">
            <span class="text-icon">
              {{ day }}
              <br />
              <span
                v-for="p in periods"
                :key="p.type"
                class="period-text"
              >
                {{ getLabel(p.type, p) }}
              </span>
            </span>
          </span>
        </div>
      </div>

      <p v-else class="empty-message">لا توجد أيام مفعّلة</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'
import type { OperatingHours, TimePeriod } from '@/types/contexts/OrderInfo'
const props = defineProps<{
  colors: Record<string, string>
}>()

const isOpen = ref(false)
const operatingHours = ref<OperatingHours>({})

const allDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']

onMounted(async () => {
  const saved = await indexedDBService.getOperatingHours('default')
  operatingHours.value = saved ?? {}
})

const activeDaysWithPeriods = computed(() =>
  allDays
    .map(day => {
      const periods = operatingHours.value[day]?.filter(p => p.enabled) ?? []
      return periods.length ? { day, periods } : null
    })
    .filter(Boolean) as { day: string; periods: TimePeriod[] }[]
)

function getLabel(type: 'first' | 'second' | 'full', p: TimePeriod) {
  if (type === 'first') return `الفترة الأولى: ${p.from} - ${p.to}`
  if (type === 'second') return `الفترة الثانية: ${p.from} - ${p.to}`
  return '24 ساعة'
}
</script>

<style scoped>
.contact-button-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-button-container.none {
  position: static;
}

.main-contact-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #b36e15;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;
}

.main-contact-btn:hover {
  transform: scale(1.05);
}

.svg-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  display: block;
}

.contact-popover {
  position: absolute;
  top: 65px;
  left: 50%;
  transform: translateX(-50%);
  width: 250px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  padding: 10px;
  animation: pop-in 0.3s ease-out;
  z-index: 1000;
}

.popover-title {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  text-align: center;
}

.social-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(45px, 1fr));
  gap: 10px;
}

.social-link-item {
  width: 45px;
  height: auto;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;
  text-align: center;
}

.social-link-item:hover {
  transform: scale(1.1);
}

.icon-wrapper {
  background: white;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  padding: 4px;
}

.text-icon {
  font-size: 0.85rem;
  font-weight: bold;
  color: #FF7A00;
  line-height: 1.2;
}

.period-text {
  display: block;
  font-size: 0.7rem;
  color: #666;
  margin-top: 2px;
}

.empty-message {
  text-align: center;
  font-size: 0.85rem;
  color: #999;
  margin-top: 0.5rem;
}

@keyframes pop-in {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
