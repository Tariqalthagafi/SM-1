<template>
  <li class="list-item">
    <div class="item-row">
      <!-- أدوات التحكم أولاً -->
      <span class="drag-handle" title="اسحب لإعادة الترتيب">⠿</span>

      <template v-if="isEditing">
        <button @click="saveEdit" title="حفظ">💾</button>
        <button @click="cancelEdit" title="إلغاء">❌</button>
        <input
          v-model="editedName"
          type="text"
          class="edit-input"
          @keyup.enter="saveEdit"
          @keyup.esc="cancelEdit"
        />
      </template>

      <template v-else>
        <button @click="startEdit" title="تعديل">✏️</button>
        <button @click="$emit('delete', section.id)">🗑️</button>
        <span class="section-name">{{ section.name }}</span>
      </template>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Section } from '@/types/contexts/Sections'
import { useSectionStore } from '@/stores/cboard/sections'

const props = defineProps<{
  section: Section
  index: number
}>()

defineEmits<{
  (e: 'delete', id: string): void
}>()

const sectionStore = useSectionStore()

const isEditing = ref(false)
const editedName = ref(props.section.name)

function startEdit() {
  editedName.value = props.section.name
  isEditing.value = true
}

function saveEdit() {
  const name = editedName.value.trim()
  if (!name) return
  sectionStore.update({ ...props.section, name })
  isEditing.value = false
}

function cancelEdit() {
  editedName.value = props.section.name
  isEditing.value = false
}
</script>

<style scoped>
.list-item {
  padding: 0.4rem 0.6rem;
  font-family: 'Tajawal', sans-serif;
  background-color: transparent;
  border: none;
  border-radius: 0;
}

.item-row {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.drag-handle {
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background-color: #F0F0F0;
  transition: background-color 0.2s ease;
}

.drag-handle:hover {
  background-color: #E0E0E0;
}


.section-name {
  font-size: 1rem;
  color: #1C1C1C;
  white-space: nowrap;
}

.edit-input {
  width: 220px;
  padding: 0.3rem 0.5rem;
  font-size: 0.95rem;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  background-color: #FFFFFF;
  color: #1C1C1C;
}

button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.2rem;
  color: #1C1C1C;
}

button:hover {
  color: #FF7A00;
}
</style>
