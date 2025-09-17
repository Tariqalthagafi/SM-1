<template>
  <div class="currency-selector">
    <label for="currency-select">اختر العملة:</label>
    <div class="row">
      <select
        id="currency-select"
        v-model="localCurrency"
        @change="emitCurrency"
        class="currency-dropdown"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label || option.value }}
        </option>
      </select>

      <!-- معاينة مصغرة -->
      <div class="currency-preview">
        <span class="currency-symbol" v-if="previewImage">
          <img :src="previewImage" alt="رمز العملة" class="currency-icon" />
        </span>
        <span class="currency-symbol" v-else>
          {{ localCurrency }}
        </span>
        <small>معاينة الرمز</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, withDefaults } from 'vue'

const props = withDefaults(defineProps<{
  selected: string
  options: { value: string; label?: string; image?: string }[]
}>(), {
  selected: 'ر.س',
  options: () => []
})

const emit = defineEmits<{
  (e: 'update:selected', value: string): void
}>()

const localCurrency = ref(
  props.options.some(opt => opt.value === props.selected)
    ? props.selected
    : props.options[0]?.value || 'ر.س'
)

watch(() => props.selected, (newVal) => {
  if (props.options.some(opt => opt.value === newVal)) {
    localCurrency.value = newVal
  }
})

function emitCurrency() {
  emit('update:selected', localCurrency.value)
}

const previewImage = computed(() => {
  const match = props.options.find(opt => opt.value === localCurrency.value)
  return match?.image || null
})
</script>

<style scoped>
.currency-selector {
  padding: 1rem 0;
}

.row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.currency-dropdown {
  flex: 0 0 160px;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
}

.currency-preview {
  flex: 1;
  text-align: center;
}

.currency-symbol {
  font-size: 1.5rem;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 0.3rem;
}

.currency-icon {
  width: 32px;
  height: 32px;
  vertical-align: middle;
}
</style>
