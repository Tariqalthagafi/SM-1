// src/stores/cboard/orderInfo/operatingHoursStore.ts
import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import { supabase } from '@/supabase'
import type { OperatingHours, TimePeriod } from '@/types/contexts/orderInfo1.ts'

const allDays = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت']

function inferType(index: number): 'first' | 'second' | 'full' {
  return index === 0 ? 'first' : index === 1 ? 'second' : 'full'
}

function normalizePeriod(p: Partial<TimePeriod>, index: number): TimePeriod {
  return {
    type: p.type ?? inferType(index),
    from: p.from ?? '',
    to: p.to ?? '',
    enabled: p.enabled ?? true
  }
}

function initializeHours(data?: OperatingHours): OperatingHours {
  const result: OperatingHours = {}
  for (const day of allDays) {
    const raw = data?.[day] ?? [
      { type: 'first', from: '08:00', to: '12:00', enabled: false },
      { type: 'second', from: '16:00', to: '22:00', enabled: false },
      { type: 'full', from: '00:00', to: '23:59', enabled: false }
    ]
    result[day] = raw.map((p, i) => normalizePeriod(p, i))
  }
  return result
}

export const useOperatingHoursStore = defineStore('operatingHours', () => {
  const operatingHours = ref<OperatingHours>(initializeHours())

  function removePeriod(day: string, index: number) {
    operatingHours.value[day].splice(index, 1)
  }

  function cleanHours(hours: OperatingHours): OperatingHours {
    const result: OperatingHours = {}
    for (const day of allDays) {
      const validPeriods = hours[day].filter(p => p.from && p.to)
      if (validPeriods.length > 0) result[day] = validPeriods
    }
    return result
  }

  async function syncOperatingHoursFromSupabase() {
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user?.id) return
    const userId = userData.user.id

    const { data, error } = await supabase
      .from('operating_hours')
      .select('*')
      .eq('created_by', userId)

    if (error || !data) return

    const result = allDays.reduce((acc, day) => {
      const periods = data.filter(p => p.day === day).map((p, i) => normalizePeriod(p, i))
      acc[day] = periods
      return acc
    }, {} as OperatingHours)

    operatingHours.value = initializeHours(result)
  }

  async function syncOperatingHoursToSupabase() {
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user?.id) return
    const userId = userData.user.id
    const raw = toRaw(operatingHours.value)

    const rows = allDays.flatMap(day =>
      raw[day].map(p => ({
        day,
        type: p.type,
        from: p.from,
        to: p.to,
        enabled: p.enabled,
        created_by: userId
      }))
    )

    const { error } = await supabase
      .from('operating_hours')
      .upsert(rows, { onConflict: 'day,type,created_by' })

    if (error) console.error('خطأ في حفظ ساعات العمل:', error.message)
  }

  return {
    operatingHours,
    removePeriod,
    cleanHours,
    syncOperatingHoursFromSupabase,
    syncOperatingHoursToSupabase
  }
})
