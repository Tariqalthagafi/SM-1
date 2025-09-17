<template>
  <div class="font-selector">
    <label for="font-select">اختر الخط:</label>
    <div class="row">
      <select
        id="font-select"
        v-model="localFont"
        @change="emitFont"
        class="font-dropdown"
      >
        <option
          v-for="font in fonts"
          :key="font.value"
          :value="font.value"
          :style="{ fontFamily: font.value }"
        >
          {{ font.label || font.value }}
        </option>
      </select>

      <!-- معاينة مصغرة -->
      <div class="font-preview" :style="{ fontFamily: localFont }">
        عنوان تجريبي بهذا الخط
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'

const props = withDefaults(defineProps<{
  selectedFont: string
}>(), {
  selectedFont: ''
})

const emit = defineEmits<{
  (e: 'update:selectedFont', font: string): void
}>()

const fonts = ref<{ value: string; label?: string }[]>([])
const localFont = ref('')

// تحميل الخطوط من template_options
onMounted(async () => {
  fonts.value = await indexedDBService.getOptions('fontFamily')

  const defaultFont = fonts.value.find(f => f.value === props.selectedFont)
    ? props.selectedFont
    : fonts.value[0]?.value || ''

  localFont.value = defaultFont
})

// مزامنة مع التحديث الخارجي
watch(() => props.selectedFont, (newFont) => {
  if (fonts.value.find(f => f.value === newFont)) {
    localFont.value = newFont
  }
})

function emitFont() {
  emit('update:selectedFont', localFont.value)
}
</script>

<style scoped>
.font-selector {
  padding: 1rem 0;
}

.row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.font-dropdown {
  flex: 0 0 200px;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-family: inherit;
}

.font-preview {
  flex: 1;
  padding: 0.6rem;
  background: #f9f9f9;
  border-radius: 6px;
  border: 1px dashed #ccc;
  text-align: center;
  font-size: 1.2rem;
}
</style>
