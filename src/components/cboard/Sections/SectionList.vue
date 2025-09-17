<template>
  <section class="section-list-card">
    <h2 class="card-title">📦 قائمة الأقسام</h2>

    <draggable
      v-model="sectionStore.sections"
      item-key="id"
      class="section-list"
      handle=".drag-handle"
    >
      <template #header>
        <div class="list-header">↕️ اسحب لإعادة ترتيب الأقسام</div>
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
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  border-bottom: 1px solid #eee;
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
  color: #555;
  margin-bottom: 0.5rem;
  background: #f8f9fa;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
}
</style>
