<template>
  <section class="section-editor-card">
    <h2 class="card-title">➕ إضافة قسم جديد</h2>

    <form @submit.prevent="handleAdd" class="form-row">
      <input
        v-model="form.name"
        type="text"
        placeholder="ادخل اسم القسم ثم إضافه"
        required
        name="section-name"
        id="section-name"
      />
      <button type="submit" class="add-btn">إضافة</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useSectionStore } from '@/stores/cboard/sections'
import type { Section } from '@/types/contexts/Sections'

const sectionStore = useSectionStore()

const form = reactive<{ name: string }>({ name: '' })

function handleAdd() {
  const name = form.name.trim()
  if (!name) return

  const exists = sectionStore.sections.find(s => s.name === name)
  if (exists) {
    alert('⚠️ القسم موجود مسبقًا')
    return
  }

  const newSection: Section = {
    id: crypto.randomUUID(),
    name,
    isActive: true
  }

  sectionStore.add(newSection)
  form.name = ''
}
</script>

<style scoped>
.section-editor-card {
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

.form-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.form-row input {
  flex: 1;
  padding: 0.5rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
}

.add-btn {
  padding: 0.5rem 0.8rem;
  font-size: 0.9rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-btn:hover {
  background-color: #0056b3;
}
</style>
