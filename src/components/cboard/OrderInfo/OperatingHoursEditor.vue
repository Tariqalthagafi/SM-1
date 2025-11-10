<template>
  <section class="info-section" v-if="isReady">
    <h3>{{ t('cboard.orderInfo.operatingHours.title') }}</h3>
    <div class="days-grid">
      <div v-for="day in typedDays" :key="day" class="day-card">
        <h4>{{ t(`cboard.orderInfo.operatingHours.days.${day}`) }}</h4>


        <div class="period-options">
          <div
            v-for="type in periodTypes"
            :key="type"
            class="option-row"
            :class="{ active: getPeriod(day, type)?.enabled === true }"
          >
            <button @click="togglePeriod(day, type)">
              {{ type === 'first' ? t('cboard.orderInfo.operatingHours.periodLabels.first') : type === 'second' ? t('cboard.orderInfo.operatingHours.periodLabels.second') : t('cboard.orderInfo.operatingHours.periodLabels.full') }}
            </button>

            <div class="period-info" v-if="getPeriod(day, type)?.enabled === true">
              <template v-if="type === 'full'">
                {{ t('cboard.orderInfo.operatingHours.periodLabels.full') }}
              </template>
              <template v-else>
                <input
                  type="time"
                  :value="getPeriod(day, type)?.from ?? ''"
                  @change="e => updateTime(day, type, 'from', e)"
                />
                إلى
                <input
                  type="time"
                  :value="getPeriod(day, type)?.to ?? ''"
                  @change="e => updateTime(day, type, 'to', e)"
                />
              </template>
            </div>

            <div class="period-info" v-else>
              {{ getDefaultTime(type) }}
            </div>

            <label class="switch">
              <input
                type="checkbox"
                :checked="getPeriod(day, type)?.enabled === true"
                :disabled="shouldDisableSwitch(day, type)"
                @change="togglePeriod(day, type)"
              />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast تنبيه -->
<Teleport to="body">
  <div v-if="alertMessage" class="toast">
    {{ alertMessage }}
    <button @click="alertMessage = ''">{{ t('cboard.orderInfo.operatingHours.alerts.close') }}</button>
  </div>
</Teleport>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue'
import { useOrderInfoStore } from '@/stores/cboard/orderInfo1'
import { indexedDBService } from '@/services/indexedDBService'
import type { OperatingHours, TimePeriod } from '@/types/contexts/orderInfo1.ts'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const
type DayKey = typeof dayKeys[number]
const typedDays: readonly DayKey[] = dayKeys


const periodTypes = ['first', 'second', 'full'] as const
type PeriodType = typeof periodTypes[number]

const store = useOrderInfoStore()
const operatingHours = store.operatingHours
const isReady = ref(false)
const alertMessage = ref('')

onMounted(async () => {
  const saved = await indexedDBService.getOperatingHours('default') as Partial<OperatingHours>
  typedDays.forEach((day) => {
    operatingHours[day] = (saved?.[day] ?? []) as TimePeriod[]
  })
  isReady.value = true
})

async function saveHours() {
  const raw = toRaw(operatingHours)
  const cleanData: OperatingHours = structuredClone(raw)

  // حفظ محلي
  await indexedDBService.saveOperatingHours(cleanData, 'default')

  // حفظ في Supabase
  await store.syncOperatingHoursToSupabase()
}


function getPeriodValues(type: PeriodType): TimePeriod {
  if (type === 'first') return { type, from: '08:00', to: '12:00', enabled: true }
  if (type === 'second') return { type, from: '16:00', to: '22:00', enabled: true }
  return { type, from: '00:00', to: '23:59', enabled: true }
}

function getDefaultTime(type: PeriodType): string {
  const p = getPeriodValues(type)
  return `${p.from} إلى ${p.to}`
}

function getPeriod(day: DayKey, type: PeriodType): TimePeriod | null {
  const periods = operatingHours[day]
  if (!periods) return null
  const index = periods.findIndex((p: TimePeriod) => p.type === type)
  return index !== -1 ? periods[index] : null
}

function shouldDisableSwitch(day: DayKey, type: PeriodType): boolean {
  const periods = operatingHours[day]
  if (!periods) return false

  const fullEnabled = periods.some(p => p.type === 'full' && p.enabled)
  const firstEnabled = periods.some(p => p.type === 'first' && p.enabled)
  const secondEnabled = periods.some(p => p.type === 'second' && p.enabled)

  if (type === 'full') return firstEnabled || secondEnabled
  if (type === 'first' || type === 'second') return fullEnabled
  return false
}

function togglePeriod(day: DayKey, type: PeriodType): void {
  const periods = operatingHours[day]
  if (!periods) return

  const fullEnabled = periods.some(p => p.type === 'full' && p.enabled)
  const firstEnabled = periods.some(p => p.type === 'first' && p.enabled)
  const secondEnabled = periods.some(p => p.type === 'second' && p.enabled)

  if (type === 'full' && (firstEnabled || secondEnabled)) {
    alertMessage.value = 'لا يمكن تفعيل خيار 24 ساعة إلا بعد تعطيل الفترتين الأولى والثانية.'
    return
  }

  if ((type === 'first' || type === 'second') && fullEnabled) {
    alertMessage.value = 'لا يمكن تفعيل الفترات الجزئية إلا بعد تعطيل خيار 24 ساعة.'
    return
  }

  alertMessage.value = ''

  const index = periods.findIndex((p: TimePeriod) => p.type === type)

  if (index !== -1) {
    periods[index].enabled = !periods[index].enabled
  } else {
    if (type === 'full') {
      ['first', 'second'].forEach(t => {
        const i = periods.findIndex(p => p.type === t)
        if (i !== -1) periods.splice(i, 1)
      })
    } else {
      const i = periods.findIndex(p => p.type === 'full')
      if (i !== -1) periods.splice(i, 1)
    }

    periods.push(getPeriodValues(type))
  }

  saveHours()
}

function updateTime(day: DayKey, type: PeriodType, field: 'from' | 'to', e: Event): void {
  const target = e.target as HTMLInputElement
  const value = target?.value
  if (value) {
    const period = getPeriod(day, type)
    if (period) {
      period[field] = value
      saveHours()
    }
  }
}
</script>


<style scoped>
/* ✅ تنسيق عام */
.info-section {
  padding: 1rem;
  font-family: 'Tajawal', sans-serif;
  direction: rtl;
}

.info-section h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--sectionTitle-color, #000);
  border-bottom: 2px solid var(--sectionTitle-color, #000);
  padding-bottom: 0.5rem;
}

/* ✅ شبكة الأيام */
.days-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

/* ✅ بطاقة اليوم */
.day-card {
  background: #fff;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  padding: 1rem;
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

/* ✅ خيارات الفترات */
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

/* ✅ معلومات الفترة */
.period-info {
  font-size: 0.8rem;
  color: #666;
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.period-info input[type="time"] {
  padding: 0.2rem 0.4rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.8rem;
  width: 80px;
  box-sizing: border-box;
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

input:disabled + .slider {
  background-color: #eee;
  cursor: not-allowed;
}

input:disabled + .slider:before {
  background-color: #ccc;
}

/* ✅ Toast تنبيه */
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #fff3f3;
  color: #d00;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1000;
}

.toast button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #d00;
}

 </style>