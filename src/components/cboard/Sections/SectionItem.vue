<template>
  <li class="list-item">
    <span class="drag-handle" title="اسحب لإعادة الترتيب">
      ↕️ <small class="priority-number">{{ index + 1 }}</small>
    </span>

    <!-- وضع التعديل -->
    <template v-if="isEditing">
      <input
        v-model="editedName"
        type="text"
        class="edit-input"
        @keyup.enter="saveEdit"
        @keyup.esc="cancelEdit"
      />
      <div class="actions">
        <button @click="saveEdit" title="حفظ">💾</button>
        <button @click="cancelEdit" title="إلغاء">❌</button>
      </div>
    </template>

    <!-- وضع العرض -->
    <template v-else>
      <span class="section-name">{{ section.name }}</span>
      <div class="actions">
        <button @click="startEdit" title="تعديل">✏️</button>
        <button @click="$emit('delete', section.id)">🗑️</button>
      </div>
    </template>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fafafa;
  margin-bottom: 0.5rem;
}

.drag-handle {
  cursor: grab;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.priority-number {
  font-size: 0.75rem;
  color: #888;
}

.section-name {
  flex: 1;
  padding: 0 1rem;
  font-size: 1rem;
  color: #333;
}

.edit-input {
  flex: 1;
  padding: 0.3rem;
  font-size: 1rem;
}

.actions {
  display: flex;
  gap: 0.25rem;
}

.actions button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.2rem;
}

.actions button:hover {
  color: #007bff;
}
</style>
