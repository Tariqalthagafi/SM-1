<template>
  <div class="customizer-section">
    <label for="offer-style-select" class="customizer-label">
      {{ t('cboard.templates.selectors.offerStyle.label') }}
    </label>
    <select
      id="offer-style-select"
      v-model="localSelected"
      @change="emitSelection"
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

    <!-- معاينة مصغرة (اختياري) -->
    <!--
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
    -->
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
