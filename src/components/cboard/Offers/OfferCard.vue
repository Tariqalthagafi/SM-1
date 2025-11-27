<template>
  <div class="offer-card">
    <OfferEditor
  :edit="localOffer"
  :readonly="!isEditing"
  mode="view"
  @focus="startEditing"
  @blur="saveOffer"
  @update="handleUpdate"
/>


    <div class="row-actions">
      <div class="action-buttons">
        <!-- زر تعديل -->
        <button @click="startEditing">
          {{ t('cboard.offers.list.edit') }}
        </button>
<div v-if="showWarning" class="warning-overlay">
  <div class="warning-dialog">
    <p>⚠️ لا يمكن تعديل العرض وهو مفعل</p>
    <button class="close-btn" @click="showWarning = false">إغلاق</button>
  </div>
</div>
        <!-- زر حفظ -->
        <button v-if="isEditing" @click="saveOffer">
         حفظ التعديل
        </button>

        <!-- زر حذف -->
        <button @click="showConfirm = true">
  {{ t('cboard.offers.list.delete') }}
</button>
<div v-if="showConfirm" class="confirm-overlay">
  <div class="confirm-dialog">
    <p>هل أنت متأكد أنك تريد حذف هذا العرض؟</p>
    <div class="dialog-actions">
      <button class="confirm-btn" @click="confirmDelete">تأكيد</button>
      <button class="cancel-btn" @click="showConfirm = false">إلغاء</button>
    </div>
  </div>
</div>
        <!-- زر تفعيل/إلغاء -->
        <button
          class="toggle-switch"
          :class="{ active: localOffer.is_active }"
          @click="toggleActive"
          :aria-label="localOffer.is_active
            ? t('cboard.offers.list.toggle.disable')
            : t('cboard.offers.list.toggle.enable')"
        >
          
        </button>

        <!-- الحالة -->
        <div
          class="status-label"
          :class="{ active: localOffer.is_active, inactive: !localOffer.is_active }"
        >
          {{ localOffer.is_active ? 'مفعل' : 'غير مفعل' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import OfferEditor from './OfferEditor.vue'
import type { Offer } from '@/types/contexts/offers1.ts'
import { useOffers } from './useOffers.ts'

const props = defineProps<{ offer: Offer }>()
const emit = defineEmits<{ (e: 'updated'): void }>()

const { t } = useI18n()
const { updateOffer, deleteOffer: deleteFromSupabase, toggleOfferActive } = useOffers()

const localOffer = ref<Offer>({ ...props.offer })
const isEditing = ref(false)

const showConfirm = ref(false)
const showWarning = ref(false)

async function confirmDelete() {
  await deleteFromSupabase(localOffer.value.id)
  showConfirm.value = false
  emit('updated')
}

function startEditing() {
  if (localOffer.value.is_active) {
    showWarning.value = true   // ✅ بدل alert
    return
  }
  isEditing.value = true
}

async function saveOffer() {
  await updateOffer(localOffer.value.id, localOffer.value)
  isEditing.value = false
  emit('updated') // لإخبار الأب أن العرض تم تحديثه
}

function handleUpdate(updated: Offer) {
  localOffer.value = updated
}


async function toggleActive() {
  const newStatus = !localOffer.value.is_active
  await toggleOfferActive(localOffer.value.id)
  localOffer.value.is_active = newStatus   // تحديث محلي فوري
  emit('updated')
}

</script>

<style scoped>
.offer-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
}
.offer-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* ✅ صف الأزرار */
.row-actions {
  display: flex;
  justify-content: flex-end;
}

.action-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
}

/* ✅ أزرار حذف وتبديل */
.action-buttons button {
  padding: 0.5rem 0.9rem;
  font-size: 1.25rem;
  background-color: #FFFFFF;
  border: none;
  color: #1C1C1C;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}
.action-buttons button:hover {
  background-color: #F5F5F5;
}

/* ✅ زر التبديل */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.toggle-switch::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ccc;
  border-radius: 28px;
  transition: background-color 0.4s;
}

.toggle-switch::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.4s;
  z-index: 1;
}

.toggle-switch.active::before {
  background-color: #FF9318;
}

.toggle-switch.active::after {
  transform: translateX(20px);
}

.status-label {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  width: fit-content;
  align-self: flex-start;
  margin-bottom: -0.5rem;
}

.status-label.active {
  background-color: #E6F7E6;
  color: #2E7D32;
}

.status-label.inactive {
  background-color: #FFF3E0;
  color: #FF9318;
}
.confirm-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6); /* خلفية سوداء شفافة */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.confirm-dialog {
  background: #FFFFFF; /* خلفية بيضاء للصندوق */
  border: 2px solid #FF9318; /* إطار برتقالي */
  border-radius: 12px;
  padding: 1.5rem;
  width: 320px;
  text-align: center;
  font-family: 'Tajawal', sans-serif;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.confirm-dialog p {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #1C1C1C; /* النص أسود */
}

.dialog-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.confirm-btn {
  flex: 1;
  background-color: #FF9318; /* زر تأكيد برتقالي */
  color: #FFFFFF;            /* نص أبيض */
  border: none;
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}
.confirm-btn:hover {
  background-color: #e67e00; /* برتقالي أغمق عند المرور */
}

.cancel-btn {
  flex: 1;
  background-color: #1C1C1C; /* زر إلغاء أسود */
  color: #FFFFFF;            /* نص أبيض */
  border: none;
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}
.cancel-btn:hover {
  background-color: #000000; /* أسود داكن عند المرور */
}

.warning-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.6); /* خلفية سوداء شفافة */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

.warning-dialog {
  background: #FFFFFF; /* خلفية بيضاء */
  border: 2px solid #FF9318; /* إطار برتقالي */
  border-radius: 12px;
  padding: 1.5rem;
  width: 300px;
  text-align: center;
  font-family: 'Tajawal', sans-serif;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.warning-dialog p {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1C1C1C; /* نص أسود */
}

.close-btn {
  background-color: #FF9318; /* برتقالي */
  color: #FFFFFF;            /* نص أبيض */
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}
.close-btn:hover {
  background-color: #e67e00; /* برتقالي أغمق عند المرور */
}

/* دعم الجوال */
@media (max-width: 768px) {
  .offer-card {
    padding: 0.75rem;
  }
}
</style>
