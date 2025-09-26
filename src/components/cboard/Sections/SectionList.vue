<template>
  <section class="section-list-card">

    <draggable
      v-model="sectionStore.sections"
      item-key="id"
      class="section-list"
      handle=".drag-handle"
    >
      <template #header>
      </template>

      <template #item="{ element, index }">
        <SectionItem
          :section="element"
          :index="index"
          @delete="deleteSection"
        />
      </template>
    </draggable>
  </section>
</template>

<script setup lang="ts">
import { useSectionStore } from '@/stores/cboard/sections'
import draggable from 'vuedraggable'
import SectionItem from './SectionItem.vue'

const sectionStore = useSectionStore()

function deleteSection(id: string) {
  sectionStore.remove(id)
}
</script>

<style scoped>
.section-list-card {
  background: transparent; /* ✅ إزالة الخلفية */
  border-radius: 0;         /* ✅ إزالة الزوايا */
  padding: 0;               /* ✅ إزالة الحواف */
  box-shadow: none;         /* ✅ إزالة الظل */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Tajawal', sans-serif;
}

.card-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #FF7A00; /* ✅ برتقالي للتمييز */
  padding-bottom: 0.5rem;
}

.section-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-header {
  font-weight: bold;
  font-size: 0.95rem;
  color: #1C1C1C;
  margin-bottom: 0.5rem;
  background: transparent; /* ✅ إزالة الخلفية الرمادية */
  padding: 0.4rem 0.6rem;
  border-radius: 0;
}
</style>
