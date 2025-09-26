<template>
  <div class="offer-editor">
    <!-- اسم العرض -->
    <div class="form-group">
      <label>اسم العرض</label>
      <template v-if="isView">
        <span>{{ localOffer.title || '—' }}</span>
      </template>
      <template v-else>
        <input v-model="localOffer.title" required />
      </template>
    </div>

    <!-- نوع الخصم -->
    <div class="form-group">
      <label>نوع العرض</label>
      <template v-if="isView">
        <span>
          {{ localOffer.type === 'percentage' ? 'نسبة مئوية' : 'سعر موحد' }}
        </span>
      </template>
      <template v-else>
        <select v-model="localOffer.type">
          <option value="percentage">نسبة مئوية</option>
          <option value="unifiedPrice">سعر موحد</option>
        </select>
      </template>
    </div>

    <!-- قيمة الخصم أو السعر الموحد -->
    <div class="form-group">
      <label>
        {{ localOffer.type === 'percentage' ? 'قيمة الخصم' : 'السعر الموحد' }}
      </label>
      <template v-if="isView">
        <span>
          {{ localOffer.discount }}
          {{ localOffer.type === 'percentage' ? '%' : 'ريال' }}
        </span>
      </template>
      <template v-else>
        <input v-model.number="localOffer.discount" type="number" min="0" />
      </template>
    </div>

    <!-- تاريخ البداية -->
    <div class="form-group">
      <label>تاريخ البداية</label>
      <template v-if="isView">
        <span>{{ localOffer.startDate || '—' }}</span>
      </template>
      <template v-else>
        <input v-model="localOffer.startDate" type="date" />
      </template>
    </div>

    <!-- تاريخ النهاية -->
    <div class="form-group">
      <label>تاريخ النهاية</label>
      <template v-if="isView">
        <span>{{ localOffer.endDate || '—' }}</span>
      </template>
      <template v-else>
        <input v-model="localOffer.endDate" type="date" />
      </template>
    </div>

    <!-- وقت البداية -->
    <div class="form-group">
      <label>وقت البداية</label>
      <template v-if="isView">
        <span>{{ localOffer.startTime || '—' }}</span>
      </template>
      <template v-else>
        <input v-model="localOffer.startTime" type="time" />
      </template>
    </div>

    <!-- وقت النهاية -->
    <div class="form-group">
      <label>وقت النهاية</label>
      <template v-if="isView">
        <span>{{ localOffer.endTime || '—' }}</span>
      </template>
      <template v-else>
        <input v-model="localOffer.endTime" type="time" />
      </template>
    </div>

    <!-- أزرار الحفظ والإلغاء -->
    <div class="action-buttons" v-if="!isView">
      <button @click="emit('save', { ...localOffer })">💾 حفظ</button>
      <button @click="emit('cancel')">❌ إلغاء</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Offer } from '@/types/contexts/Offers'

const props = defineProps<{
  edit: Offer
  mode: 'view' | 'edit' | 'add'
}>()
const emit = defineEmits(['save', 'cancel'])

const localOffer = ref<Offer>({ ...props.edit })
const isView = computed(() => props.mode === 'view')

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
  background-color: transparent; /* إزالة الخلفية */
  box-shadow: none;              /* إزالة الظل */
  border-radius: 0;
  font-family: 'Tajawal', sans-serif;
}

/* الحقول */
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

/* العرض فقط */
.form-group span {
  font-size: 0.85rem;
  color: #333;
  padding: 0.4rem 0.6rem;
  background-color: #f9f9f9;
  border-radius: 6px;
  border: 1px solid #E0E0E0;
}

/* أزرار الحفظ والإلغاء */
.action-buttons {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.5rem;
}

.action-buttons button {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  background-color: #FF7A00;
  color: white;
}
.action-buttons button:hover {
  background-color: #e96c00;
}

</style>
