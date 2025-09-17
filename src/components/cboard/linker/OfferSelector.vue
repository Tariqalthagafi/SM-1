<template>
  <select :value="modelValue" @change="onChange">
    <option value="">بدون عرض</option>
    <option v-for="offer in offers" :key="offer.id" :value="offer.id">
      {{ offer.title }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { useOffersStore } from '@/stores/cboard/offers'
import type { Offer } from '@/types/contexts/Offers'

const props = defineProps<{ modelValue: string | undefined}>()
const emit = defineEmits(['update:modelValue'])

const offers = useOffersStore().offers

function onChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  emit('update:modelValue', value)
}
</script>

<style scoped>
select {
  padding: 0.4rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.85rem;
  background-color: #fff;
  color: #333;
  width: 100%;
}
</style>
