<template>
  <div class="section-selector">
    <select :value="selectedId" @change="handleChange" :disabled="disabled">
      <option value="">{{ t('cboard.linker.row.sectionSelector.none') }}</option>
      <option
        v-for="section in sectionsStore.sections"
        :key="section.id"
        :value="section.id"
      >
        {{ section.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useSectionStore } from '@/stores/cboard/sections'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps<{
  selectedId: string
  disabled?: boolean
}>()

const emit = defineEmits(['select'])

const sectionsStore = useSectionStore()

function handleChange(event: Event) {
  const newId = (event.target as HTMLSelectElement).value
  emit('select', newId)
}
</script>

<style scoped>
.section-selector select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
  background-color: #fff;
  cursor: pointer;
}
.section-selector select:focus {
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
  outline: none;
}

.section-selector select {
  padding: 0.4rem 0.6rem;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  font-size: 0.85rem;
  background-color: #FFFFFF;
  color: #1C1C1C;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  font-family: 'Tajawal', sans-serif;
}

.section-selector select:disabled {
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

</style>
