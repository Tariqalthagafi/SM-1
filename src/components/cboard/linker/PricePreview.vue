<template>
  <span>{{ finalPrice }} {{ t('cboard.linker.row.currency') }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useOffersStore } from '@/stores/cboard/offers'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps<{
  basePrice: number
  offerId?: string
}>()

const offersStore = useOffersStore()

// ✅ الحساب يعتمد على calculatePrice في offersStore
const finalPrice = computed(() => {
  const offer = offersStore.offers.find(o => o.id === props.offerId)
  if (!offer) return props.basePrice || 0
  return offersStore.calculatePrice(props.basePrice || 0, offer)
})
</script>
