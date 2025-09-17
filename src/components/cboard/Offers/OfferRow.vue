<template>
  <div class="offer-row">
    <div class="info">
      <div><strong>{{ offer.title }}</strong></div> 
      <div class="details">
        <span>
          <template v-if="offer.type === 'percentage'">
            الخصم: {{ offer.discount }}%
          </template>
          <template v-else-if="offer.type === 'unifiedPrice'">
            السعر الموحد: {{ offer.discount }} ريال
          </template>
          <template v-else>
            {{ offer.discount }} ريال
          </template>
        </span>

        <span v-if="offer.startTime || offer.endTime">
          الوقت: {{ offer.startTime || 'غير محدد' }} - {{ offer.endTime || 'غير محدد' }}
        </span>

        <span v-if="offer.startDate">من: {{ offer.startDate }}</span>
        <span v-if="offer.endDate">إلى: {{ offer.endDate }}</span>
        <span>الحالة: {{ offer.isActive ? '✅ مفعل' : '⛔ غير مفعل' }}</span>
      </div>
    </div>

    <div class="actions">
      <button @click="emit('edit', offer)">✏️ تعديل</button>
      <button @click="emit('delete', offer.id)">🗑️ حذف</button>
      <button @click="emit('toggle', offer.id)">
        {{ offer.isActive ? '🔕 تعطيل' : '🔔 تفعيل' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Offer } from '@/types/contexts/Offers'

const props = defineProps<{ offer: Offer }>()
const emit = defineEmits(['edit', 'delete', 'toggle'])
</script>

<style scoped>
.offer-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  transition: box-shadow 0.3s ease;
}
.offer-row:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.details {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.9rem;
  color: #444;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

button {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

button:nth-child(1) {
  background-color: #007bff;
  color: white;
}
button:nth-child(1):hover {
  background-color: #0056b3;
}

button:nth-child(2) {
  background-color: #dc3545;
  color: white;
}
button:nth-child(2):hover {
  background-color: #a71d2a;
}

button:nth-child(3) {
  background-color: #28a745;
  color: white;
}
button:nth-child(3):hover {
  background-color: #218838;
}
</style>
