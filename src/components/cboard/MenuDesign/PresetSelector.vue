<template>
  <!-- ✅ القسم الأول: النماذج الجاهزة (دائمًا فعال) -->
  <div class="section-block">
    <ReadyPresets class="preset-row" />
  </div>
</template>

<script setup lang="ts">
import ReadyPresets from '@/components/cboard/MenuDesign/ReadyPresets.vue'
import '@/components/cboard/MenuDesign/common.css'
</script>

<style scoped>
.section-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
