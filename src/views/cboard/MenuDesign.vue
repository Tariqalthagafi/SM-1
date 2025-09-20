<template>
  <div class="menu-design-container">
    <aside class="menu-sidebar">
      <TemplateCustomizer2 />
    </aside>

    <main class="menu-preview-area">
      <TemplatePreview />
    </main>
  </div>
</template>

<script setup lang="ts">
import TemplateCustomizer2 from '@/components/cboard/MenuDesign/TemplateCustomizer2.vue'
import TemplatePreview from '@/components/cboard/MenuDesign/shapesmenu/TemplatePreview.vue'
</script>

<style scoped>
.menu-design-container {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f0f0f0;
}

.menu-sidebar {
  width: 300px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}

.menu-preview-area {
  flex: 1;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}
</style>
