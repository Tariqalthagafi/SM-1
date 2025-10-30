<template>
  <section class="settings-section">
    <h2>إعدادات الحساب</h2>

    <div class="field">
      <label>البريد الإلكتروني</label>
      <input type="email" value="user@example.com" readonly />
    </div>

    <div class="field">
      <label>كلمة المرور</label>
      <input type="password" value="••••••••" readonly />
      <button class="action">🔒 تغيير كلمة المرور</button>
    </div>

    <div class="danger-zone">
      <button class="danger">🗑️ حذف الحساب</button>
    </div>
  </section>
</template>

<script setup lang="ts">
// لا يوجد منطق حقيقي حالياً، كل شيء وهمي
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
</style>
