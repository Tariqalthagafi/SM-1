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
  padding: 1.5rem;
  border-radius: 12px;
  background-color: #fdfdfd;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  max-width: 500px;
  margin: auto;
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
}

.field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: #555;
}

input {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f9f9f9;
}

input[readonly] {
  cursor: not-allowed;
}

button.action {
  margin-top: 0.5rem;
  align-self: flex-start;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  background-color: #0078d4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button.action:hover {
  background-color: #005fa3;
}

.danger-zone {
  margin-top: 2rem;
  text-align: center;
}

button.danger {
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button.danger:hover {
  background-color: #c0392b;
}
</style>
