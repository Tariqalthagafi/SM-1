<template>
  <section class="section-list-card">
    <draggable
      v-model="sections"
      item-key="id"
      class="section-list"
      handle=".drag-handle"
    >
      <template #item="{ element: section }">
        <div class="section-item card-box">
          <span class="drag-handle">⠿</span>

          <div class="section-name-wrapper">
            <input
              v-if="editingId === section.id"
              v-model="editableName"
              @blur="saveEdit(section.id)"
              @keyup.enter="saveEdit(section.id)"
              class="section-input"
              autofocus
            />
            <div v-else class="section-name" @click="startEdit(section)">
              {{ section.name }}
            </div>
          </div>

          <button class="delete-btn" @click="deleteSection(section.id)">
            🗑️
          </button>
        </div>
      </template>
    </draggable>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import { useSections } from './useSections'

const { sections, updateSection, deleteSection } = useSections()

const editingId = ref<string | null>(null)
const editableName = ref('')

function startEdit(section: { id: string; name: string }) {
  editingId.value = section.id
  editableName.value = section.name
}

async function saveEdit(id: string) {
  const name = editableName.value.trim()
  editingId.value = null
  if (!name) return
  await updateSection(id, name)
}
</script>

<style scoped>
.section-list-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Tajawal', sans-serif;
}

.loading-message {
  font-size: 1rem;
  color: #999;
  text-align: center;
  padding: 1rem;
}

.section-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  padding: 0;
  margin: 0;
}


.card-box {
  background-color: #fff;
  border: 1px solid #FF7A00;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  width: 100%;
  max-width: 400px;
}

.section-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  transition: box-shadow 0.2s ease;
}

.section-item:hover {
  box-shadow: 0 4px 10px rgba(255, 122, 0, 0.1);
}

.drag-handle {
  cursor: grab;
  font-size: 1.2rem;
  color: #999;
}

.section-name-wrapper {
  flex-grow: 1;
}

.section-name {
  font-size: 1rem;
  color: #1C1C1C;
  cursor: pointer;
  padding: 0.3rem 0.4rem;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.section-name:hover {
  background-color: #FFF3E5;
}

.section-input {
  font-size: 1rem;
  padding: 0.3rem 0.4rem;
  border: 2px solid #FF7A00;
  border-radius: 6px;
  width: 100%;
  background-color: #FFFBEF;
}

.section-input:focus {
  outline: none;
}

.delete-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #f44336;
}
.delete-btn:hover {
  color: #d32f2f;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-box {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  width: 320px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.modal-box h2 {
  color: #FF7A00;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.modal-box p {
  color: #1C1C1C;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.confirm-btn {
  background-color: #FF7A00;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #fff;
  color: #1C1C1C;
  border: 1px solid #E0E0E0;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
</style>
