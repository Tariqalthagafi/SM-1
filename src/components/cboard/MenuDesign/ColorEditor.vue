<template>
  <div class="color-editor">
    <h5>{{ t('colorsSection') }}</h5>

    <!-- اختيار نوع التخصيص -->
    <div class="group-selector">
      <button
        :class="{ active: selectedGroup === 'text' }"
        @click="selectedGroup = 'text'"
      >
        🎨 النصوص
      </button>
      <button
        :class="{ active: selectedGroup === 'icons' }"
        @click="selectedGroup = 'icons'"
      >
        🧩 الرموز
      </button>
      <button
        :class="{ active: selectedGroup === 'backgrounds' }"
        @click="selectedGroup = 'backgrounds'"
      >
        🖼️ الخلفيات
      </button>
    </div>

    <!-- عرض المكون المناسب حسب الاختيار -->
    <TextColors v-if="selectedGroup === 'text'" />
    <IconColors v-if="selectedGroup === 'icons'" />
    <BackgroundColors v-if="selectedGroup === 'backgrounds'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { t } from '@/translations'

import TextColors from './TextColors.vue'
import IconColors from './IconColors.vue'
import BackgroundColors from './BackgroundColors.vue'

const selectedGroup = ref<'text' | 'icons' | 'backgrounds'>('text')
</script>

<style scoped>
.color-editor {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.group-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.group-selector button {
  padding: 0.4rem 0.8rem;
  border: 1px solid #ccc;
  background: #f9f9f9;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
}

.group-selector button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}
</style>
