<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useCurrencyStore } from '@/stores/cboard/templates/currencyStore'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const currencyStore = useCurrencyStore()

// ✅ تحميل الخيارات من الستور
const options = computed(() => currencyStore.currencyOptions)
const localCurrency = ref(currencyStore.currencySymbol)

// ✅ تحديث العملة عند التغيير
function emitCurrency() {
  currencyStore.setCurrency(localCurrency.value)
  currencyStore.saveCurrency()
}

// ✅ تحميل الخيارات عند التهيئة
onMounted(async () => {
  await currencyStore.initCurrencyOptions()
  localCurrency.value = currencyStore.currencySymbol
})

// ✅ معاينة الصورة
const previewImage = computed(() => {
  const match = options.value.find(opt => opt.value === localCurrency.value)
  return match?.image || null
})
</script>

<template>
  <div class="customizer-section">
    <label for="currency-select" class="customizer-label">
      {{ t('cboard.templates.selectors.currency.label') }}
    </label>
    <select
      id="currency-select"
      v-model="localCurrency"
      @change="emitCurrency"
      class="dropdown-field"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label || option.value }}
      </option>
    </select>
  </div>
</template>
