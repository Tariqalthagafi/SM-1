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
  background-color: #fff; /* خلفية بيضاء ناعمة */
  font-family: var(--font-family);
}

.template-editor-container {
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
