<template>
  <div class="offer-editor">
    <!-- اسم العرض -->
    <div class="form-group">
      <label>{{ t('cboard.offers.editor.fields.title') }}</label>
      <input
        v-model="localOffer.title"
        :readonly="readonly"
        required
        @focus="emit('focus')"
        @blur="emit('blur')"
        @input="emit('update', localOffer)"  
      />
    </div>

    <!-- نوع الخصم -->
    <div class="form-group">
      <label>{{ t('cboard.offers.editor.fields.type') }}</label>
      <select
        v-model="localOffer.type"
        :disabled="readonly"
        @focus="emit('focus')"
        @blur="emit('blur')"
        @change="emit('update', localOffer)"  
      >
        <option value="percentage">{{ t('cboard.offers.editor.types.percentage') }}</option>
        <option value="unifiedPrice">{{ t('cboard.offers.editor.types.unifiedPrice') }}</option>
      </select>
    </div>

    <!-- قيمة الخصم أو السعر الموحد -->
    <div class="form-group">
      <label>
        {{ localOffer.type === 'percentage'
          ? t('cboard.offers.editor.fields.discountValue')
          : t('cboard.offers.editor.fields.unifiedPrice') }}
      </label>
      <input
        v-model.number="localOffer.discount"
        type="number"
        min="0"
        :readonly="readonly"
        @focus="emit('focus')"
        @blur="emit('blur')"
        @input="emit('update', localOffer)"  
      />
    </div>

    <!-- تاريخ البداية -->
    <div class="form-group">
      <label>{{ t('cboard.offers.editor.fields.startDate') }}</label>
      <input
        v-model="localOffer.start_date"
        type="date"
        :readonly="readonly"
        @focus="emit('focus')"
        @blur="emit('blur')"
        @change="emit('update', localOffer)" 
      />
    </div>

    <!-- تاريخ النهاية -->
    <div class="form-group">
      <label>{{ t('cboard.offers.editor.fields.endDate') }}</label>
      <input
        v-model="localOffer.end_date"
        type="date"
        :readonly="readonly"
        @focus="emit('focus')"
        @blur="emit('blur')"
        @change="emit('update', localOffer)" 
      />
    </div>

    <!-- وقت البداية -->
    <div class="form-group">
      <label>{{ t('cboard.offers.editor.fields.startTime') }}</label>
      <input
        v-model="localOffer.start_time"
        type="time"
        :readonly="readonly"
        @focus="emit('focus')"
        @blur="emit('blur')"
        @change="emit('update', localOffer)" 
      />
    </div>

    <!-- وقت النهاية -->
    <div class="form-group">
      <label>{{ t('cboard.offers.editor.fields.endTime') }}</label>
      <input
        v-model="localOffer.end_time"
        type="time"
        :readonly="readonly"
        @focus="emit('focus')"
        @blur="emit('blur')"
        @change="emit('update', localOffer)" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Offer } from '@/types/contexts/offers1.ts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  edit: Offer
  readonly?: boolean
}>()

const emit = defineEmits<{
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'update', offer: Offer): void
}>()

const localOffer = ref<Offer>({ ...props.edit })

// ✅ تحديث القيم عند تغيير الـ props من الأب
watch(() => props.edit, (newVal) => {
  localOffer.value = { ...newVal }
})
</script>


<style scoped>
.offer-editor {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.5rem 0;
  background-color: transparent;
  box-shadow: none;
  border-radius: 0;
  font-family: 'Tajawal', sans-serif;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 180px;
}

.form-group label {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
  color: #1C1C1C;
}

.form-group input,
.form-group select {
  padding: 0.4rem 0.6rem;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  background-color: #FFFFFF;
  font-size: 0.85rem;
  color: #1C1C1C;
}

.form-group input[readonly],
.form-group select:disabled {
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

</style>
