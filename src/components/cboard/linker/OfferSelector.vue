<template>
  <select :value="modelValue" @change="onChange">
    <option value="">{{ t('cboard.linker.row.none') }}</option>
    <option v-for="offer in offers" :key="offer.id" :value="offer.id">
      {{ offer.title }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { useOffersStore } from '@/stores/cboard/offers.ts'
import type { Offer } from '@/types/contexts/offers1.ts'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
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
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  font-size: 0.85rem;
  background-color: #FFFFFF;
  color: #1C1C1C;
  width: 100%;
  font-family: 'Tajawal', sans-serif;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

select:focus {
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
  outline: none;
}

select:disabled {
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

</style>
