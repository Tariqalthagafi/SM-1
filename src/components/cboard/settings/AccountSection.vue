<template>
  <section class="settings-section">
    <h2>{{ t('cboard.settings.account.title') }}</h2>

<div class="field email-field">
  <label>{{ t('cboard.settings.account.emailLabel') }}</label>
  <div class="input-with-icon">
    <img src="/icons/login/google-icon.svg" alt="Google" class="google-icon" />
    <input type="email" :value="email" readonly />
  </div>
</div>


  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const email = ref('')

onMounted(async () => {
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    console.error('❌ فشل جلب المستخدم:', error.message)
  } else if (user) {
    email.value = user.email || ''
  }
})
</script>

<style scoped>
.settings-section {
  padding: 2rem;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  margin: auto;
  font-family: 'Segoe UI', sans-serif;
  color: #1a1a1a;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #000000;
  text-align: center;
}

.field {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

input {
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f9f9f9;
  color: #1a1a1a;
}

input[readonly] {
  cursor: not-allowed;
  background-color: #f5f5f5;
}

button.action {
  margin-top: 0.6rem;
  align-self: flex-start;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  background-color: #ff9318;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button.action:hover {
  background-color: #d86e00;
}

.danger-zone {
  margin-top: 2rem;
  text-align: center;
}

button.danger {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background-color: #d86e00;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button.danger:hover {
  background-color: #a94f00;
}
.input-with-icon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
}

.input-with-icon input {
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #1a1a1a;
  flex: 1;
}

.input-with-icon input:focus {
  outline: none;
}

.google-icon {
  width: 20px;
  height: 20px;
}

</style>
