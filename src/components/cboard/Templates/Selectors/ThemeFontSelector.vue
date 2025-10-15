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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: 'Tajawal', sans-serif;
}

label {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
  color: #FF7A00;
  font-family: 'Tajawal', sans-serif;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.font-dropdown {
  flex: 0 0 200px;
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  border-radius: 6px;
  border: 1px solid #E0E0E0;
  background-color: #FFFFFF;
  color: #1C1C1C;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.font-dropdown:focus {
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
  outline: none;
}

.font-preview {
  flex: 1;
  padding: 0.6rem;
  background-color: #FFFFFF;
  border-radius: 6px;
  border: 1px dashed #E0E0E0;
  text-align: center;
  font-size: 1.2rem;
  color: #1C1C1C;
}

</style>
