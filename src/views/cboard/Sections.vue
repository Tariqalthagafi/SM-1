<template>
  <div class="page-wrapper">
    <div class="sections-dashboard">
      <h2 class="page-title">{{ t('cboard.sections.title') }}</h2>

      <!-- المكونات الفرعية هي اللي تتعامل مع Supabase -->
      <SectionEditor />
      <SectionList />
    </div>
  </div>
</template>

<script setup lang="ts">
import SectionEditor from '@/components/cboard/Sections/SectionEditor.vue'
import SectionList from '@/components/cboard/Sections/SectionList.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: max-content;
  padding: 2rem 1rem;
  background-color: #FFFFFF;
  overflow-x: hidden;
}

.sections-dashboard {
  width: 100%;
  max-width: 1000px;
  display: grid;
  row-gap: 2rem;
  padding: 0;
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
  box-sizing: border-box;
  font-family: 'Tajawal', sans-serif;
}

.page-title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #1C1C1C;
  border-bottom: 1px solid #E0E0E0;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  text-align: start;
}
</style>
