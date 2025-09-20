<template>
  <div class="template-editor-page">

    <div class="template-editor-container">
          <h1 class="page-title">خصص شكل المنيو بإضافة رموز بصرية ديناميكية</h1>

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
.page-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

</style>
