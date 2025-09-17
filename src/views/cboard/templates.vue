<template>
  <div class="template-editor-page">
    <div class="template-editor-container">
      <TemplateCustomizer />
    </div>
  </div>
</template>

<script setup lang="ts">
import TemplateCustomizer from '@/components/cboard/Templates/Customizer/TemplateCustomizer.vue'
</script>

<style scoped>
.template-editor-page {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: #f5f5f5;
}

.template-editor-container {
  width: 100%;
  max-width: 800px;
  /* ✅ أزلنا البطاقة الزائدة */
  padding: 0;
}
</style>
