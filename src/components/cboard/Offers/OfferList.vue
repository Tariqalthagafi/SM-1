<template>
  <section class="offer-list">
    <!-- زر إضافة عرض جديد -->
    <button class="add-button" @click="startNewOffer">➕ إضافة عرض جديد</button>

    <!-- نموذج الإضافة -->
    <div v-if="!editingId && showNewForm" class="offer-row">
      <OfferEditor
        :edit="tempOffer"
        mode="add"
        @save="saveOffer"
        @cancel="cancelEdit"
      />
    </div>

    <!-- قائمة العروض -->
    <div
      v-for="offer in offersStore.offers"
      :key="offer.id"
      class="offer-row"
    >
      <!-- نموذج التعديل -->
      <OfferEditor
        v-if="editingId === offer.id"
        :edit="offer"
        mode="edit"
        @save="saveOffer"
        @cancel="cancelEdit"
      />

      <!-- عرض التفاصيل مع الأزرار بجانبه -->
      <template v-else>
        <OfferEditor
          :edit="offer"
          mode="view"
        />
        <div class="row-actions">
          <button @click="startEdit(offer)">✏️ </button>
          <button @click="deleteOffer(offer.id)">🗑️ </button>
          <button
  @click="toggleOfferActive(offer.id)"
  :class="offer.isActive ? 'btn-disable' : 'btn-enable'"
>
  {{ offer.isActive ? '🔕 تعطيل' : '🔔 تفعيل' }}
</button>

        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useOffersStore } from '@/stores/cboard/offers'
import type { Offer } from '@/types/contexts/Offers'

import OfferEditor from './OfferEditor.vue'

const offersStore = useOffersStore()
const editingId = ref<string | null>(null)
const showNewForm = ref(false)
const tempOffer = ref<Offer>(offersStore.createEmptyOffer())

onMounted(() => {
  offersStore.load()
})

function startNewOffer() {
  tempOffer.value = offersStore.createEmptyOffer()
  editingId.value = null
  showNewForm.value = true
}

function startEdit(offer: Offer) {
  editingId.value = offer.id
  showNewForm.value = false
}

function cancelEdit() {
  editingId.value = null
  showNewForm.value = false
  tempOffer.value = offersStore.createEmptyOffer()
}

function saveOffer(updated: Offer) {
  if (editingId.value) {
    offersStore.updateOffer(editingId.value, updated)
  } else {
    const newOffer = {
      ...updated,
      id: crypto.randomUUID()
    }
    offersStore.addOffer(newOffer)
  }
  cancelEdit()
}

function deleteOffer(id: string) {
  offersStore.deleteOffer(id)
}

function toggleOfferActive(id: string) {
  offersStore.toggleOfferActive(id)
}
</script>

<style scoped>
.offer-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* البطاقة الموحدة */
.offer-row {
  display: flex;
  justify-content: space-between; /* توزيع النموذج والأزرار */
  align-items: flex-start;
  gap: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 0.75rem;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

/* إزالة أي بطاقة داخلية من OfferEditor */
.offer-row :deep(.offer-editor) {
  border: none;
  background: transparent;
  box-shadow: none;
  padding: 0;
}

/* زر إضافة عرض */
.add-button {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
.add-button:hover {
  background-color: #005fa3;
}

/* الأزرار بجانب النموذج في صف واحد */
.row-actions {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
}

/* تنسيق الأزرار */
.row-actions button {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

/* تعديل */
.row-actions button:nth-child(1) {
  background-color: #007bff;
  color: white;
}
.row-actions button:nth-child(1):hover {
  background-color: #0056b3;
}

/* حذف */
.row-actions button:nth-child(2) {
  background-color: #dc3545;
  color: white;
}
.row-actions button:nth-child(2):hover {
  background-color: #a71d2a;
}

/* تفعيل/تعطيل ديناميكي */
.btn-disable {
  background-color: #dc3545; /* أحمر */
  color: white;
}
.btn-disable:hover {
  background-color: #a71d2a;
}

.btn-enable {
  background-color: #28a745; /* أخضر */
  color: white;
}
.btn-enable:hover {
  background-color: #218838;
}

</style>
