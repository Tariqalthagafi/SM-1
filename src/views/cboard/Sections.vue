<template>
  <div class="page-wrapper">
    <div class="sections-dashboard">
      <h1 class="page-title">{{ t('cboard.sections.title') }}</h1>
      <div class="section-count">
        {{ t('cboard.sections.count', { count: sectionStore.sections.length }) }}
      </div>

      <SectionEditor />
      <SectionList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import SectionEditor from '@/components/cboard/Sections/SectionEditor.vue'
import SectionList from '@/components/cboard/Sections/SectionList.vue'
import { useSectionStore } from '@/stores/cboard/sections'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const sectionStore = useSectionStore()

onMounted(() => {
  sectionStore.load()
})
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
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #FF7A00;
}

.section-count {
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #1C1C1C;
}

/* دعم الجوال */
@media (max-width: 768px) {
  .sections-dashboard {
    padding: 1rem;
  }
}
</style>
