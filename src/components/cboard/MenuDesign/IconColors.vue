<template>
  <div class="icon-colors">
    

    <div
      class="color-row"
      v-for="(label, key) in iconColorKeys"
      :key="key"
    >
      <label class="color-label">
        {{ t(`cboard.menuDesign.colorEditor.iconColors.fields.${key}`) }}:
        <input
          type="color"
          :value="colors[key as IconColorKey]"
          @input="updateColor(key as IconColorKey, $event)"
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

const iconColorKeys = {
  allergenIcon: 'allergenIcon',
  offerLabel: 'offerLabel',
  currencyIcon: 'currencyIcon',
  expiredProductIcon: 'expiredProductIcon'
} as const

type IconColorKey = keyof typeof iconColorKeys

function updateColor(key: IconColorKey, event: Event) {
  const target = event.target as HTMLInputElement
  store.setColor(key, target.value)
  store.saveColors()
}
</script>

<style scoped>
.icon-colors {
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
