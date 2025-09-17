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
  padding: 1rem;
  border-radius: 12px;
  background-color: #fdfdfd;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* الحقول */
.form-group {
  display: flex;
  flex-direction: column;
  min-width: 180px;
  flex: 1;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.form-group input,
.form-group select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.85rem;
}

/* أزرار الحفظ والإلغاء */
.action-buttons {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  margin-left: auto;
}

.action-buttons button {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  background-color: #007bff;
  color: white;
  transition: background-color 0.2s ease;
}

.action-buttons button:hover {
  background-color: #0056b3;
}

.action-buttons button svg,
.action-buttons button span,
.action-buttons button i {
  font-size: 1em;
}
</style>
