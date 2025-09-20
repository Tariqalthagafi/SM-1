<template>
  <div class="text-colors">
    <h6>🎨 تخصيص ألوان النصوص</h6>

    <div
      class="color-row"
      v-for="(label, key) in textColorKeys"
      :key="key"
    >
      <label class="color-label">
        {{ label }}:
        <input
          type="color"
          :value="colors[key as TextColorKey]"
          @input="updateColor(key as TextColorKey, $event)"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useColorEditorStore } from '@/stores/cboard/MenuDesign/ColorEditorStore'
import type { ColorSettings } from '@/types/contexts/MenuDesign'

const store = useColorEditorStore()
const colors = computed(() => store.colors)

const textColorKeys = {
  titleText: 'عنوان المنتج',
  priceText: 'السعر',
  descriptionText: 'الوصف',
  sectionTitleText: 'عنوان القسم'
} as const

type TextColorKey = keyof typeof textColorKeys

function updateColor(key: TextColorKey, event: Event) {
  const target = event.target as HTMLInputElement
  store.setColor(key, target.value)
  store.saveColors()
}
</script>

<style scoped>
.text-colors {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.color-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.color-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
}

input[type="color"] {
  width: 50px;
  height: 28px;
  border: none;
  cursor: pointer;
}
</style>
