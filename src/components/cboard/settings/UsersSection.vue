<template>
  <section class="settings-section">
    <h2>إدارة المستخدمين</h2>

    <!-- دعوة مستخدم جديد -->
    <div class="invite-section">
      <h3>دعوة مستخدم جديد</h3>
      <div class="form-group">
        <label>البريد الإلكتروني</label>
        <input type="email" placeholder="user@example.com" />
      </div>
      <div class="form-group">
        <label>نوع الصلاحية</label>
        <select>
          <option>مالك الحساب</option>
          <option>مشرف</option>
        </select>
      </div>
      <button class="send-btn">📨 إرسال الدعوة</button>
    </div>

    <!-- قائمة المستخدمين -->
    <div class="users-list">
      <h3>قائمة المستخدمين</h3>
      <div class="user-card">
        <div class="info">
          <strong>admin@example.com</strong>
          <span class="status active">نشط</span>
        </div>
        <div class="actions">
          <button class="suspend">تعليق</button>
          <button class="delete">حذف</button>
        </div>
      </div>

      <div class="user-card">
        <div class="info">
          <strong>guest@example.com</strong>
          <span class="status pending">معلق</span>
        </div>
        <div class="actions">
          <button class="suspend">تعليق</button>
          <button class="delete">حذف</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// كل شيء وهمي حالياً لأغراض العرض فقط
</script>

<style scoped>
.settings-section {
  padding: 2rem;
  max-width: 600px;
  margin: auto;
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #444;
}

.invite-section,
.users-list {
  margin-bottom: 2rem;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 600;
  color: #555;
}

input,
select {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.send-btn {
  margin-top: 0.5rem;
  padding: 0.6rem 1rem;
  background-color: #0078d4;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.send-btn:hover {
  background-color: #005fa3;
}

.user-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  border-bottom: 1px solid #ddd;
}

.info {
  display: flex;
  flex-direction: column;
}

.status {
  font-size: 0.9rem;
  margin-top: 0.2rem;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  width: fit-content;
}

.status.active {
  background-color: #d4edda;
  color: #155724;
}

.status.pending {
  background-color: #fff3cd;
  color: #856404;
}

.actions button {
  margin-left: 0.5rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.actions .suspend {
  background-color: #f0ad4e;
  color: white;
}

.actions .delete {
  background-color: #d9534f;
  color: white;
}

.actions .suspend:hover {
  background-color: #ec971f;
}

.actions .delete:hover {
  background-color: #c9302c;
}
</style>
