<template>
  <div class="color-editor">
    <h5>{{ t('colorsSection') }}</h5>
    <div
      v-for="(label, key, index) in colorKeys"
      :key="String(key)"
      class="color-row"
    >
      <label class="color-label">
        {{ label }}:
        <input
          type="color"
          :value="colors[key]"
          @input="updateColor(key, $event)"
        />
      </label>
      <hr v-if="index < Object.keys(colorKeys).length - 1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/translations'
import { computed, onMounted } from 'vue'
import { useColorEditorStore } from '@/stores/cboard/MenuDesign/ColorEditorStore'
import type { ColorSettings } from '@/types/contexts/MenuDesign'

const store = useColorEditorStore()
const colors = computed(() => store.colors)

onMounted(() => {
  store.loadColors()
})

const colorKeys: Record<keyof ColorSettings, string> = {
  headerBackground: 'خلفية العنوان',
  sectionBackground: 'خلفية القسم',
  cardBackground: 'خلفية البطاقة',
  titleText: 'لون عنوان المنتج',
  priceText: 'لون السعر',
  descriptionText: 'لون الوصف',
  allergenIcon: 'لون رمز الحساسية'
}

function updateColor(key: keyof ColorSettings, event: Event) {
  const target = event.target as HTMLInputElement
  store.setColor(key, target.value)
  store.saveColors()
}
</script>

<style scoped>
.color-editor {
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

hr {
  border: none;
  border-top: 1px solid #ccc;
  margin: 0.5rem 0;
}
</style>
