<template>
  <div class="cboard-layout">
    <!-- Sidebar -->
    <aside v-if="!hideSidebar" class="sidebar" :class="{ collapsed: isCollapsed }">
      <div class="sidebar-header">
        <button @click="toggleSidebar" title="طي القائمة">☰</button>
        <div class="sidebar-actions"></div>
      </div>

      <nav class="sidebar-links">
        <RouterLink to="/cboard" active-class="" exact-active-class="active">
          <i class="icon">🏠</i>
          <span v-if="!isCollapsed">الرئيسية</span>
        </RouterLink>

        <RouterLink to="/cboard/sections" active-class="active">
          <i class="icon">📋</i>
          <span v-if="!isCollapsed">الاقسام</span>
        </RouterLink>

        <RouterLink to="/cboard/Products" active-class="active">
          <i class="icon">🍽️</i>
          <span v-if="!isCollapsed">المنتجات</span>
        </RouterLink>

        <RouterLink to="/cboard/Offers" active-class="active">
          <i class="icon">🎁</i>
          <span v-if="!isCollapsed">العروض</span>
        </RouterLink>

        <RouterLink to="/cboard/linker" active-class="active">
          <i class="icon">🧩</i>
          <span v-if="!isCollapsed">ربط المنتجات</span>
        </RouterLink>

        <RouterLink to="/cboard/Social" active-class="active">
          <i class="icon">📱</i>
          <span v-if="!isCollapsed">التواصل</span>
        </RouterLink>

        <RouterLink to="/cboard/templates" active-class="active">
          <i class="icon">🎨</i>
          <span v-if="!isCollapsed">الثيمات</span>
        </RouterLink>

        <RouterLink to="/cboard/MenuDesign" active-class="active">
          <i class="icon">🖌️</i>
          <span v-if="!isCollapsed">تصميم المنيو</span>
        </RouterLink>

        <RouterLink to="/cboard/MenuPreview" active-class="active">
          <i class="icon">🧾</i>
          <span v-if="!isCollapsed">معاينة المنيو</span>
        </RouterLink>

        <RouterLink to="/cboard/settings" active-class="active">
          <i class="icon">⚙️</i>
          <span v-if="!isCollapsed">الإعدادات</span>
        </RouterLink>

        <button @click="logout" title="خروج" class="icon">⏻</button>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <section class="page-content">
        <RouterView />
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const isCollapsed = ref(true)
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const router = useRouter()
const route = useRoute()

// غيّر 'menu-preview' ليطابق اسم الراوت في ملف الراوتر
const hideSidebar = computed(() => route.name === 'MenuPreview')

function logout() {
  router.push('/') // أو أي مسار رئيسي مثل "/home"
}
</script>

<style scoped>
.cboard-layout {
  display: flex;
  max-height: 100vh;
  width: 100vw;
  background-color: #f0f2f5;
  font-family: 'Segoe UI', sans-serif;
}

.sidebar {
  width: 220px;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
  padding: 1rem;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 6px rgba(0,0,0,0.05);
  overflow: hidden;
  z-index: 1;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.logo {
  font-size: 1.6rem;
  font-weight: bold;
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar-links a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: #444;
  font-weight: 500;
  padding: 0.6rem 0.75rem;
  border-radius: 6px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.sidebar-links a:hover {
  background-color: #f0f8ff;
  color: #007bff;
}

.sidebar-links a.active {
  background-color: #e6f0ff;
  color: #007bff;
}

.icon {
  font-size: 1.2rem;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  z-index: 0;
}

.topbar {
  background-color: #ffffff;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  position: relative;
  z-index: 0;
}

.page-content {
  padding: 2rem;
  background-color: #f9f9f9;
  flex: 1;
  overflow-y: auto;
  border-top: 1px solid #eee;
}

.sidebar-actions {
  display: flex;
  gap: 0.5rem;
}

.sidebar-header button {
  background-color: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.3rem;
  transition: color 0.2s ease;
}

.sidebar-header button:hover {
  color: #007bff;
}
</style>
