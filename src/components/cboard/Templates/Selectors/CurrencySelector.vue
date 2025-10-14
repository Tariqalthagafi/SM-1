<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useCurrencyStore } from '@/stores/cboard/templates/currencyStore'

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


<style scoped>
.currency-selector {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: 'Tajawal', sans-serif;
}

label {
  font-size: 0.85rem;
  font-weight: bold;
  color: #1C1C1C;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.currency-dropdown {
  flex: 0 0 180px;
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  border-radius: 6px;
  border: 1px solid #E0E0E0;
  background-color: #FFFFFF;
  color: #1C1C1C;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.currency-dropdown:focus {
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
  outline: none;
}

.currency-preview {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
}

.currency-symbol {
  font-size: 1.5rem;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 0.3rem;
  color: #1C1C1C;
}

.currency-icon {
  width: 32px;
  height: 32px;
  vertical-align: middle;
}

</style>
