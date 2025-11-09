<template>
  <section class="section-editor-card">
    <h2 class="card-title">{{ t('cboard.sections.editor.title') }}</h2>

    <form @submit.prevent="handleAdd" class="form-row">
     <input
     v-model="form.name"
     type="text"
     :placeholder="t('cboard.sections.editor.placeholder')"
     required
     name="section-name"
     id="section-name"
     />
         <button type="submit" class="add-btn"> {{ t('cboard.sections.editor.button') }} </button>
</form>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useSectionStore } from '@/stores/cboard/sections'
import type { Section } from '@/types/contexts/Sections'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const sectionStore = useSectionStore()
const form = reactive<{ name: string }>({ name: '' })

function handleAdd() {
  const name = form.name.trim()
  if (!name) return

  const exists = sectionStore.sections.find(s => s.name === name)
  if (exists) {
    alert(t('cboard.sections.editor.duplicateAlert'))
    return
  }

  const newSection: Section = {
    id: crypto.randomUUID(),
    name,
    is_active: true
  }

  sectionStore.add(newSection)
  form.name = ''
}
</script>

<style scoped>
.section-editor-card {
  background: transparent;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Tajawal', sans-serif;
}

.card-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #FF7A00;
  padding-bottom: 0.5rem;
}

.form-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.form-row input {
  width: 220px;
  padding: 0.4rem 0.6rem;
  font-size: 0.9rem;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  background-color: #FFFFFF;
  color: #1C1C1C;
}

.add-btn {
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  background-color: #FF7A00;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-btn:hover {
  background-color: #e96c00;
}
</style>
