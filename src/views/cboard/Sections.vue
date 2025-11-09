<template>
  <div class="sections-wrapper">
    <h1 class="page-title">{{ t('cboard.sections.title') }}</h1>
    <div class="section-count"> {{ t('cboard.sections.count', { count: sectionStore.sections.length }) }} </div>

    <SectionEditor />
    <SectionList />
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
.sections-wrapper {
  padding: 2rem;
  background-color: transparent; /* ✅ إزالة الخلفية الرمادية */
}

.page-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #FF7A00; /* ✅ برتقالي للتمييز */
  font-family: 'Tajawal', sans-serif;
}

.section-count {
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #1C1C1C; /* ✅ توحيد النصوص بالأسود */
  font-family: 'Tajawal', sans-serif;
}

</style>
