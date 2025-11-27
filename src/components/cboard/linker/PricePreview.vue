<template>
  <span>{{ finalPrice }} {{ t('cboard.linker.row.currency') }}</span>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Offer } from '@/types/contexts/offers1.ts'
import { supabase } from '@/supabase'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  basePrice: number
  offerId?: string
}>()

// ✅ العروض تجلب مباشرة من Supabase
const offers = ref<Offer[]>([])

onMounted(async () => {
  const { data, error } = await supabase.from('offers').select('*')
  if (error) {
    console.error(error)
    return
  }
  offers.value = data || []
})

// ✅ حساب السعر النهائي مباشرة
const finalPrice = computed(() => {
  if (!props.offerId) return props.basePrice || 0

  const offer = offers.value.find(o => o.id === props.offerId)
  if (!offer) return props.basePrice || 0

  if (!offer.is_active) return props.basePrice || 0

  if (offer.type === 'percentage') {
    return Math.round((props.basePrice || 0) * (1 - offer.discount / 100))
  }

  if (offer.type === 'unifiedPrice') {
    return offer.discount
  }

  return props.basePrice || 0
})
</script>
