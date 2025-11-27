<template>
  <section class="section-editor-card card-box">
    <div class="card-header">
      <h2 class="card-title">{{ t('cboard.sections.editor.title') }}</h2>
      <button type="button" class="add-btn" @click="handleAdd">
        {{ t('cboard.sections.editor.button') }}
      </button>
    </div>

    <div class="section-count-text">
      {{ t('cboard.sections.count', { count: sections.length }) }}
    </div>

    <form class="form-row">
      <input
        v-model="form.name"
        type="text"
        :placeholder="t('cboard.sections.editor.placeholder')"
        required
        name="section-name"
        id="section-name"
      />
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useSections } from './useSections'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { sections, addSection } = useSections()

const form = reactive<{ name: string }>({ name: '' })

async function handleAdd() {
  const name = form.name.trim()
  if (!name) return

  const exists = sections.value.find(s => s.name === name)
  if (exists) {
    alert(t('cboard.sections.editor.duplicateAlert'))
    return
  }

  await addSection(name)
  form.name = ''
}
</script>

<style scoped>
.card-box {
  background-color: #fff;
  border: 1px solid #FF7A00;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  font-family: 'Tajawal', sans-serif;
  width: 100%;
  max-width: 333.333px;
  box-sizing: border-box;
}

.section-editor-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between; /* ✅ توزيع العنوان والزر */
  flex-wrap: wrap;
  gap: 0.5rem;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1C1C1C;
  margin: 0;
}

.section-count-text {
  font-size: 0.95rem;
  color: #666;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.form-row input {
  flex: 1;
  min-width: 220px;
  padding: 0.4rem 0.6rem;
  font-size: 0.9rem;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  background-color: #FFFFFF;
  color: #1C1C1C;
  transition: border-color 0.3s ease;
}

.form-row input:focus {
  border-color: #FF7A00;
  outline: none;
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
