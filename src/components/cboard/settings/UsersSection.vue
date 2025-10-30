<template>
  <section class="settings-section">
    <h2>إدارة المستخدمين</h2>

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
// وهمي لأغراض العرض فقط
</script>

<style scoped>
.settings-section {
  padding: 2rem;
  max-width: 600px;
  margin: auto;
  font-family: 'Segoe UI', sans-serif;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  color: #1a1a1a;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #000000;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.invite-section,
.users-list {
  margin-bottom: 2rem;
  background-color: #fff6ec;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #ffd9b3;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 600;
  color: #1a1a1a;
}

input,
select {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f9f9f9;
  color: #1a1a1a;
}

.send-btn {
  margin-top: 0.5rem;
  padding: 0.6rem 1rem;
  background-color: #ff9318;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.send-btn:hover {
  background-color: #d86e00;
}

.user-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee;
}

.info {
  display: flex;
  flex-direction: column;
}

.status {
  font-size: 0.9rem;
  margin-top: 0.3rem;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-weight: 600;
}

.status.active {
  background-color: #fff6ec;
  color: #ff9318;
  border: 1px solid #ffd9b3;
}

.status.pending {
  background-color: #f0f0f0;
  color: #999;
  border: 1px solid #ddd;
}

.actions button {
  margin-left: 0.5rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: white;
}

.actions .suspend {
  background-color: #ffb84d;
}

.actions .delete {
  background-color: #d9534f;
}

.actions .suspend:hover {
  background-color: #e69500;
}

.actions .delete:hover {
  background-color: #c9302c;
}
</style>
