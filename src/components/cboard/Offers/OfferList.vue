<template>
  <section class="offer-list">
    <!-- زر إضافة عرض جديد -->
    <button class="add-button" @click="startNewOffer">{{ t('cboard.offers.list.addButton') }}</button>

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
      <OfferEditor
        v-if="editingId === offer.id"
        :edit="offer"
        mode="edit"
        @save="saveOffer"
        @cancel="cancelEdit"
      />

      <template v-else>
        <OfferEditor :edit="offer" mode="view" />
        <div class="row-actions">
          <button @click="startEdit(offer)">{{ t('cboard.offers.list.edit') }}</button>
          <button @click="deleteOffer(offer.id)">{{ t('cboard.offers.list.delete') }}</button>
          <button
          class="toggle-switch"
         :class="{ active: offer.is_active }"
         @click="toggleOfferActive(offer.id)"
         :aria-label="offer.is_active? t('cboard.offers.list.toggle.disable'): t('cboard.offers.list.toggle.enable')">
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
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const offersStore = useOffersStore()
const editingId = ref<string | null>(null)
const showNewForm = ref(false)
const tempOffer = ref<Offer>(offersStore.createEmptyOffer())

onMounted(async () => {
  await offersStore.syncFromSupabase()
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
  font-family: 'Tajawal', sans-serif;
}

/* صف العرض */
.offer-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #E0E0E0;
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
  background-color: #FF7A00;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
.add-button:hover {
  background-color: #e96c00;
}

/* أزرار بجانب العرض */
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
  background-color: #1C1C1C;
  color: white;
}
.row-actions button:nth-child(1):hover {
  background-color: #000;
}

/* حذف */
.row-actions button:nth-child(2) {
  background-color: #f44336;
  color: white;
}
.row-actions button:nth-child(2):hover {
  background-color: #d32f2f;
}

/* تفعيل/تعطيل ديناميكي */
.btn-disable {
  background-color: #f44336;
  color: white;
}
.btn-disable:hover {
  background-color: #d32f2f;
}

.btn-enable {
  background-color: #28a745;
  color: white;
}
.btn-enable:hover {
  background-color: #218838;
}
/* زر إضافة عرض */
.add-button {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  background-color: #FF9318;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
.add-button:hover {
  background-color: #d86e00;
}

/* أزرار بجانب العرض */
.row-actions {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
}

/* تعديل */
.row-actions button:nth-child(1) {
  background-color: #1C1C1C;
  color: white;
}
.row-actions button:nth-child(1):hover {
  background-color: #000000;
}

/* حذف */
.row-actions button:nth-child(2) {
  background-color: #FF9318;
  color: white;
}
.row-actions button:nth-child(2):hover {
  background-color: #d86e00;
}

/* زر التبديل */
.toggle-switch {
  position: relative;
  width: 50px;
  height: 26px;
  background-color: #ccc;
  border-radius: 13px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: none;
}

.toggle-switch::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.toggle-switch.active {
  background-color: #FF9318;
}

.toggle-switch.active::before {
  transform: translateX(24px);
}

</style>
