<template>
  <div class="sections-wrapper">
    <h1 class="page-title">إدارة أقسام المنيو</h1>
    <div class="section-count">عدد الأقسام: {{ sectionStore.sections.length }}</div>

    <SectionEditor />
    <SectionList />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import SectionEditor from '@/components/cboard/Sections/SectionEditor.vue'
import SectionList from '@/components/cboard/Sections/SectionList.vue'
import { useSectionStore } from '@/stores/cboard/sections'

const sectionStore = useSectionStore()

onMounted(() => {
  sectionStore.load()
})
</script>

<style scoped>
.sections-wrapper {
  padding: 2rem;
  background-color: #f9f9f9;
}

.page-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.section-count {
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #666;
}
</style>
