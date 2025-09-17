<template>
  <div class="sections-wrapper">
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
