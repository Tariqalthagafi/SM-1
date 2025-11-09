<template>
  <section class="settings-section">
    <h2>{{ t('cboard.home.membership.title') }}</h2>

    <div class="fields-row">
      <div class="field">
        <label>{{ t('cboard.home.membership.accountIdLabel') }}</label>
        <code>
          <p class="account-id">
            <span class="id-value">{{ membership.menuId }}</span>
          </p>
        </code>
      </div>

      <div class="field">
        <label>{{ t('cboard.home.membership.planLabel') }}</label>
        <span :class="['status', membership.isActive ? 'active' : 'inactive']">
          {{ membership.isActive ? t('cboard.home.membership.paid') : t('cboard.home.membership.free') }}
        </span>
      </div>

      <div class="field" v-if="!membership.isActive">
        <label>&nbsp;</label>
        <button class="activate-btn" @click="activate">{{ t('cboard.home.membership.subscribeButton') }}</button>
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

onMounted(() => {
  membership.loadStatus()
})

function activate() {
  membership.activate()
}
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

.status.active {
  background-color: #fff6ec;
  color: #ff9318;
  border: 1px solid #ffd9b3;
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
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.activate-btn:hover {
  background-color: #d86e00;
}

@media (max-width: 768px) {
  .settings-section .fields-row {
    flex-direction: column;
  }
}
</style>
