<template>
  <div class="offer-card add-card">
    <!-- زر فتح النموذج -->
    <button class="add-button" @click="openForm">
      {{ t('cboard.offers.list.addButton') }}
    </button>

    <Transition name="expand-fade">
      <div v-if="showForm" class="add-form">
        <!-- اسم العرض -->
        <div class="form-group">
          <label>اسم العرض</label>
          <input v-model="tempOffer.title" type="text" />
          <span v-if="errors.title" class="error">{{ errors.title }}</span>
        </div>

        <!-- نوع العرض -->
        <div class="form-group">
          <label>نوع العرض</label>
          <select v-model="tempOffer.type">
            <option value="percentage">خصم نسبة</option>
            <option value="unifiedPrice">سعر موحد</option>
          </select>
          <span v-if="errors.type" class="error">{{ errors.type }}</span>
        </div>

        <!-- قيمة الخصم -->
        <div class="form-group">
          <label>القيمة</label>
          <input v-model.number="tempOffer.discount" type="number" min="1" />
          <span v-if="errors.discount" class="error">{{ errors.discount }}</span>
        </div>

        <!-- تاريخ البداية -->
        <div class="form-group">
          <label>تاريخ البداية</label>
          <input v-model="tempOffer.start_date" type="date" />
          <span v-if="errors.start_date" class="error">{{ errors.start_date }}</span>
        </div>

        <!-- تاريخ النهاية -->
        <div class="form-group">
          <label>تاريخ النهاية</label>
          <input v-model="tempOffer.end_date" type="date" />
          <span v-if="errors.end_date" class="error">{{ errors.end_date }}</span>
        </div>

        <!-- وقت البداية -->
        <div class="form-group">
          <label>وقت البداية</label>
          <input v-model="tempOffer.start_time" type="time" />
          <span v-if="errors.start_time" class="error">{{ errors.start_time }}</span>
        </div>

        <!-- وقت النهاية -->
        <div class="form-group">
          <label>وقت النهاية</label>
          <input v-model="tempOffer.end_time" type="time" />
          <span v-if="errors.end_time" class="error">{{ errors.end_time }}</span>
        </div>

        <!-- أزرار التحكم -->
        <div class="form-actions">
          <button class="save-button" @click="saveOffer">حفظ</button>
          <button class="collapse-button" @click="closeForm">إخفاء</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { Offer } from '@/types/contexts/offers1.ts'
import { useOffers } from './useOffers.ts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { addOffer } = useOffers()
const showForm = ref(false)

const tempOffer = ref<Offer>({
  id: '',
  user_id: '',
  title: '',
  type: 'percentage',
  discount: 0,
  start_date: null,
  end_date: null,
  start_time: null,
  end_time: null,
  is_active: false,
  created_at: null
})

const errors = ref<Record<string, string>>({})

function openForm() {
  if (showForm.value) return
  showForm.value = true
  nextTick(() => {
    tempOffer.value = {
      id: '',
      user_id: '',
      title: '',
      type: 'percentage',
      discount: 0,
      start_date: null,
      end_date: null,
      start_time: null,
      end_time: null,
      is_active: false,
      created_at: null
    }
    errors.value = {}
  })
}

function closeForm() {
  showForm.value = false
}

function validate(): boolean {
  errors.value = {}
  if (!tempOffer.value.title.trim()) errors.value.title = 'اسم العرض مطلوب'
  if (!tempOffer.value.type) errors.value.type = 'نوع العرض مطلوب'
  if (!tempOffer.value.discount || tempOffer.value.discount <= 0) errors.value.discount = 'القيمة مطلوبة'
  if (!tempOffer.value.start_date) errors.value.start_date = 'تاريخ البداية مطلوب'
  if (!tempOffer.value.end_date) errors.value.end_date = 'تاريخ النهاية مطلوب'
  if (!tempOffer.value.start_time) errors.value.start_time = 'وقت البداية مطلوب'
  if (!tempOffer.value.end_time) errors.value.end_time = 'وقت النهاية مطلوب'
  return Object.keys(errors.value).length === 0
}

async function saveOffer() {
  if (!validate()) return
  const newOffer: Offer = {
    ...tempOffer.value,
    id: crypto.randomUUID(),
    is_active: false,
    created_at: new Date().toISOString()
  }
  await addOffer(newOffer)
  showForm.value = false
}
</script>

<style scoped>
.offer-card.add-card {
  background-color: #FFFFFF;
  border: 1px solid #FF9318;
  border-radius: 10px;
  padding: 1rem;
}

/* زر إضافة عرض جديد */
.add-button {
  align-self: flex-start;
  padding: 0.6rem 1.2rem;
  background-color: #FF9318;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}
.add-button:hover {
  background-color: #d86e00;
}

/* النموذج */
.add-form {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* ثلاثة أعمدة */
  gap: 1.2rem 2rem;
  margin-top: 1rem;
}

/* كل مجموعة حقل */
.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.35rem;
  color: #333;
}

.form-group input,
.form-group select {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
  background-color: #fff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

/* عند التركيز */
.form-group input:focus,
.form-group select:focus {
  border-color: #FF9318;
  box-shadow: 0 0 0 2px rgba(255, 147, 24, 0.2);
  outline: none;
}

/* عند وجود خطأ */
.form-group input.error-field,
.form-group select.error-field {
  border-color: red;
}

.error {
  color: red;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

/* أزرار التحكم */
.form-actions {
  grid-column: span 3; /* الأزرار تأخذ عرض النموذج كامل */
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.save-button {
  padding: 0.6rem 1.2rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}
.save-button:hover {
  background-color: #388E3C;
}

.collapse-button {
  padding: 0.6rem 1.2rem;
  background-color: #E0E0E0;
  color: #1C1C1C;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}
.collapse-button:hover {
  background-color: #BDBDBD;
}

/* الأنيميشن */
.expand-fade-enter-active,
.expand-fade-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
  overflow: hidden;
}
.expand-fade-enter-from,
.expand-fade-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}
.expand-fade-enter-to,
.expand-fade-leave-from {
  max-height: 500px;
  opacity: 1;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .add-form {
    grid-template-columns: 1fr; /* عمود واحد للجوال */
  }
}

@media (min-width: 769px) and (max-width: 1200px) {
  .add-form {
    grid-template-columns: 1fr 1fr; /* عمودين للتابلت */
  }
}

@media (min-width: 1201px) {
  .add-form {
    grid-template-columns: 1fr 1fr 1fr; /* ثلاثة أعمدة لسطح المكتب */
  }
}


</style>
