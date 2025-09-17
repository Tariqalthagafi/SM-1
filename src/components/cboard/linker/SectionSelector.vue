<template>
  <div class="section-selector">
    <select :value="selectedId" @change="handleChange" :disabled="disabled">
      <option value="">بدون قسم</option>
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
</style>
