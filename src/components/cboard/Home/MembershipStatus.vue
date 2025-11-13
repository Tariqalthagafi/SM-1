<template>
  <section class="settings-section">
    

    <div class="fields-row">
      <!-- رقم الحساب -->
      <div class="field">
        <label>{{ t('cboard.home.membership.accountIdLabel') }}</label>
        <code>
          <p class="account-id">
            <span class="id-value">{{ membership.menuId }}</span>
          </p>
        </code>
      </div>

      <!-- حالة الباقة: مجانية -->
      <div class="field">
        <label>{{ t('cboard.home.membership.planLabel') }}</label>
        <span class="status inactive">
          {{ t('cboard.home.membership.free') }}
        </span>
      </div>

      <!-- زر الاشتراك (غير نشط حالياً) -->
<div class="field">
  <label>&nbsp;</label>
  <button class="activate-btn" @click="noop">
    {{ t('cboard.home.membership.subscribeButton') }}
  </button>
</div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMembershipStore } from '@/stores/cboard/home/membershipStore'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const membership = useMembershipStore()

function noop() {
  // لا شيء يحدث عند الضغط
}

onMounted(() => {
  membership.loadMenuId()
})
</script>

<style scoped>
.settings-section {
  padding: 0;
  background-color: transparent;
  box-shadow: none;
  border-radius: 0;
  font-family: 'Tajawal', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.settings-section .fields-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: flex-start;
}

.field {
  flex: 1;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: bold;
  color: #1C1C1C;
  font-size: 1rem;
}

code {
  background-color: #fff6ec;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #ff9318;
  border: 1px solid #ffd9b3;
  text-align: start;
}

.account-id {
  margin: 0;
  font-weight: 500;
}

.id-value {
  font-weight: bold;
}

.status {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  text-align: center;
}

.status.inactive {
  background-color: #f0f0f0;
  color: #999;
  border: 1px solid #ddd;
}

.activate-btn {
  align-self: flex-start;
  padding: 0.6rem 1.2rem;
  background-color: #ff9318;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer; /* ✅ بدل not-allowed */
  font-size: 1rem;
  transition: background-color 0.3s ease;
  opacity: 1; /* ✅ بدل 0.6 */
}

@media (max-width: 768px) {
  .settings-section .fields-row {
    flex-direction: column;
  }
}
</style>
