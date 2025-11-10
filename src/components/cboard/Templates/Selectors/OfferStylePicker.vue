<template>
  <div class="offer-style-selector">
    <label for="offer-style-select">
      {{ t('cboard.templates.selectors.offerStyle.label') }}
    </label>
    <div class="row">
      <select
        id="offer-style-select"
        v-model="localSelected"
        @change="emitSelection"
        class="offer-style-dropdown"
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
      <div class="offer-preview">
        <div class="preview-box" :class="localSelected">
          <span class="product-name">
            {{ t('cboard.templates.selectors.offerStyle.sample.name') }}
          </span>

          <template v-if="localSelected === 'strikeOnly'">
            <span class="product-price">
              <span class="old">
                ~{{ t('cboard.templates.selectors.offerStyle.sample.price.old', { old: originalPrice }) }}~
              </span>
              <span class="new">
                {{ t('cboard.templates.selectors.offerStyle.sample.price.new', { new: newPrice }) }}
              </span>
            </span>
          </template>

          <template v-else-if="localSelected === 'strikeWithSaving'">
            <span class="product-savings">
              {{ t('cboard.templates.selectors.offerStyle.sample.saving', { amount: savingAmount }) }}
            </span>
            <span class="product-price">
              <span class="old">
                ~{{ t('cboard.templates.selectors.offerStyle.sample.price.old', { old: originalPrice }) }}~
              </span>
              <span class="new">
                {{ t('cboard.templates.selectors.offerStyle.sample.price.new', { new: newPrice }) }}
              </span>
            </span>
          </template>

          <template v-else-if="localSelected === 'strikeWithBadge'">
            <span class="discount-badge">
              {{ t('cboard.templates.selectors.offerStyle.sample.discount', { percent: discountPercent }) }}
            </span>
            <span class="product-price">
              <span class="old">
                ~{{ t('cboard.templates.selectors.offerStyle.sample.price.old', { old: originalPrice }) }}~
              </span>
              <span class="new">
                {{ t('cboard.templates.selectors.offerStyle.sample.price.new', { new: newPrice }) }}
              </span>
            </span>
          </template>
        </div>
        <small>{{ t('cboard.templates.selectors.offerStyle.preview') }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, withDefaults, computed } from 'vue'
import type { OfferStyle } from '@/types/contexts/templates1.ts'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = withDefaults(defineProps<{
  selected: OfferStyle
  options: { value: OfferStyle; label?: string }[]
  originalPrice: number
  newPrice: number
}>(), {
  selected: 'strikeOnly',
  options: () => [],
  originalPrice: 60,
  newPrice: 25
})

const emit = defineEmits<{
  (e: 'update:selected', value: OfferStyle): void
}>()

const localSelected = ref<OfferStyle>(
  props.options.some(opt => opt.value === props.selected)
    ? props.selected
    : props.options[0]?.value || 'strikeOnly'
)

watch(() => props.selected, (newVal) => {
  if (props.options.some(opt => opt.value === newVal)) {
    localSelected.value = newVal
  }
})

function emitSelection() {
  emit('update:selected', localSelected.value)
}

const savingAmount = computed(() => props.originalPrice - props.newPrice)
const discountPercent = computed(() =>
  Math.round((savingAmount.value / props.originalPrice) * 100)
)
</script>

<style scoped>
.offer-style-selector {
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
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.offer-style-dropdown {
  flex: 0 0 180px;
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  border-radius: 6px;
  border: 1px solid #E0E0E0;
  background-color: #FFFFFF;
  color: #1C1C1C;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.offer-style-dropdown:focus {
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
  outline: none;
}

.offer-preview {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 160px;
}

.preview-box {
  padding: 0.6rem;
  border-radius: 6px;
  text-align: center;
  font-size: 0.9rem;
  border: 1px dashed #E0E0E0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  background-color: #fff;
  color: #1C1C1C;
}

.product-name {
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.preview-box.strikeOnly .product-price,
.preview-box.strikeWithSaving .product-price,
.preview-box.strikeWithBadge .product-price,
.preview-box.strikeInline .product-price {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  justify-content: center;
}

.old {
  text-decoration: line-through;
  color: #999;
}

.new {
  font-weight: bold;
  color: #2e7d32;
}

.product-savings {
  font-size: 0.8rem;
  color: #FF7A00;
  font-weight: 500;
  margin-bottom: 0.3rem;
}

.discount-badge {
  background-color: #FF7A00;
  color: white;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
  margin-bottom: 0.3rem;
  display: inline-block;
}
</style>
