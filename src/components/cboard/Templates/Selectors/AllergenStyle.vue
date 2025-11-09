<template>
  <div class="allergen-style-selector">
    <label for="allergen-style-select"> {{ t('cboard.templates.selectors.allergenStyle.label') }} </label>
    <div class="row">
      <select
        id="allergen-style-select"
        v-model="localStyle"
        @change="emitStyle"
        class="allergen-style-dropdown"
      >
        <option
          v-for="option in props.options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label || option.value }}
        </option>
      </select>

      <!-- معاينة مصغرة - أصبحت الآن تعتمد على دوال من الـ store -->
      <div class="allergen-preview">
        <span
          class="allergen-icon"
          :class="localStyle"
          :style="allergenStyleStore.getIconStyle(localStyle)" 
        >
          {{ allergenStyleStore.getIconSymbol(localStyle) }}
        </span>
        <small>{{ t('cboard.templates.selectors.allergenStyle.preview') }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, withDefaults } from 'vue'
import type { AllergenIconStyle } from '@/types/contexts/templates'
import { useAllergenStyleStore } from '@/stores/cboard/templates/allergenStyleStore'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const allergenStyleStore = useAllergenStyleStore()

const props = withDefaults(defineProps<{
  selected: AllergenIconStyle
  options: { value: AllergenIconStyle; label?: string }[]
}>(), {
  selected: 'boxedA',
  options: () => []
})

const emit = defineEmits<{
  (e: 'update:selected', value: AllergenIconStyle): void
}>()

// هذا المنطق لإدارة الحالة المحلية لا يزال ضروريًا وممتازًا
const localStyle = ref<AllergenIconStyle>(props.selected)

watch(() => props.selected, (newVal) => {
  localStyle.value = newVal
})

function emitStyle() {
  emit('update:selected', localStyle.value)
}

// ❌❌❌ تم حذف الدوال المكررة من هنا ❌❌❌
// function getIconSymbol(...) { ... }
// function getIconStyle(...) { ... }

</script>

<style scoped>
/* ... الأنماط تبقى كما هي ... */
.allergen-style-selector {
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

.allergen-style-dropdown {
  flex: 0 0 180px;
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  border-radius: 6px;
  border: 1px solid #E0E0E0;
  background-color: #FFFFFF;
  color: #1C1C1C;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.allergen-style-dropdown:focus {
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
  outline: none;
}

.allergen-preview {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
}

.allergen-icon {
  font-size: 1.5rem;
  display: inline-block;
  margin-bottom: 0.3rem;
}
</style>
