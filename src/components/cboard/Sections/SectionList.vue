<template>
  <section class="section-list-card">
    <draggable
      v-model="sectionStore.sections"
      item-key="id"
      class="section-list"
      handle=".drag-handle"
    >
      <template #item="{ element: section }">
        <div class="section-item">
          <span class="drag-handle" title="اسحب لإعادة الترتيب">⠿</span>

          <div class="section-name-wrapper">
            <input
              v-if="editingId === section.id"
              v-model="editableName"
              @blur="saveEdit(section.id)"
              @keyup.enter="saveEdit(section.id)"
              class="section-input"
              autofocus
            />
            <div
              v-else
              class="section-name"
              @click="startEdit(section)"
              title="اضغط للتعديل"
            >
              {{ section.name }}
            </div>
          </div>

          <button class="delete-btn" @click="confirmDeleteId = section.id" title="حذف القسم">🗑️</button>

          <!-- ✅ نافذة تأكيد الحذف -->
          <div v-if="confirmDeleteId === section.id" class="modal-overlay">
            <div class="modal-box">
              <h2>تأكيد الحذف</h2>
              <p>هل أنت متأكد من حذف هذا القسم؟ لا يمكن التراجع بعد الحذف.</p>
              <div class="modal-actions">
                <button class="confirm-btn" @click="deleteSection(section.id)">نعم، احذف</button>
                <button class="cancel-btn" @click="confirmDeleteId = null">إلغاء</button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </draggable>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSectionStore } from '@/stores/cboard/sections'
import draggable from 'vuedraggable'

const sectionStore = useSectionStore()

const editingId = ref<string | null>(null)
const editableName = ref('')
const confirmDeleteId = ref<string | null>(null)

function startEdit(section: { id: string; name: string }) {
  editingId.value = section.id
  editableName.value = section.name
}

async function saveEdit(id: string) {
  const name = editableName.value.trim()
  editingId.value = null // ✅ إغلاق التحرير فورًا

  if (!name) return

  // ✅ الحفظ يتم بعد الخروج من التحرير
  await sectionStore.update({
    ...sectionStore.sections.find(s => s.id === id)!,
    name
  })
}


function deleteSection(id: string) {
  sectionStore.remove(id)
  confirmDeleteId.value = null
}
</script>

<style scoped>
.section-list-card {
  background: transparent;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Tajawal', sans-serif;
}

.section-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.section-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.6rem;
  border-bottom: 1px solid #E0E0E0;
  position: relative;
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
}

.section-input {
  font-size: 1rem;
  padding: 0.3rem 0.4rem;
  border: 2px solid #FF7A00; /* ✅ برتقالي عند التحرير */
  border-radius: 6px;
  width: 100%;
  background-color: #FFFBEF; /* ✨ خلفية خفيفة */
}

.section-input:focus {
  outline: none; /* ✅ إزالة الحدود السوداء الافتراضية */
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

/* ✅ نافذة تأكيد الحذف */
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
