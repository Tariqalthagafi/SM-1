<template>
  <div class="background-colors">
    <h6>{{ t('cboard.menuDesign.colorEditor.backgroundColors.title') }}</h6>

    <div
      class="color-row"
      v-for="(label, key) in backgroundColorKeys"
      :key="key"
    >
      <label class="color-label">
        {{ t(`cboard.menuDesign.colorEditor.backgroundColors.fields.${key}`) }}:
        <input
          type="color"
          :value="colors[key as BackgroundKey]"
          @input="updateColor(key as BackgroundKey, $event)"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { useColorEditorStore } from '@/stores/cboard/MenuDesign/ColorEditorStore'
const store = useColorEditorStore()
const colors = computed(() => store.colors)

const backgroundColorKeys = {
  menuPageBackground: 'menuPageBackground',
  topIconsBackground: 'topIconsBackground',
  sectionBackground: 'sectionBackground',
  cardBackground: 'cardBackground',
  bodyBackground: 'bodyBackground',
  productBackground: 'productBackground',
  priceBackground: 'priceBackground'
} as const

type BackgroundKey = keyof typeof backgroundColorKeys

function updateColor(key: BackgroundKey, event: Event) {
  const target = event.target as HTMLInputElement
  store.setColor(key, target.value)
  store.saveColors()
}
</script>

<style scoped>
.background-colors {
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
