<template>
  <div class="template-customizer-2">
    <h4>{{ t('تخصيص المنيو') }}</h4>

    <!-- اختيار التخطيط -->
    <LayoutEditor />

    <!-- تخصيص الألوان -->
    <ColorEditor />


  </div>
</template>

<script setup lang="ts">
import { t } from '@/translations'
import ColorEditor from './ColorEditor.vue'
import LayoutEditor from './LayoutEditor.vue'
</script>

<style scoped>
.template-customizer-2 {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
}
</style>
