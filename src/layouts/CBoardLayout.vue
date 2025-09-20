<template>
  <div class="cboard-layout">
    <!-- Sidebar -->
    <aside v-if="!hideSidebar" class="sidebar" :class="{ collapsed: isCollapsed }">
      <div class="sidebar-header">
        <button @click="toggleSidebar" title="طي القائمة">☰</button>
        <div class="sidebar-actions"></div>
      </div>

      <nav class="sidebar-links">
        <component
          v-for="item in sidebarItems"
          :key="item.name"
          :is="item.route.startsWith('#') ? 'button' : 'RouterLink'"
          :to="!item.route.startsWith('#') ? item.route : undefined"
          @click="handleAction(item.route)"
          class="sidebar-link"
        >
          <i class="icon">{{ item.icon }}</i>
          <span v-if="!isCollapsed">{{ item.name }}</span>
          <span v-else class="tooltip">{{ item.name }}</span>
        </component>
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


// اللغة الحالية (شكليًا فقط)
const currentLang = ref('ar')
function toggleLang() {
  currentLang.value = currentLang.value === 'ar' ? 'en' : 'ar'
}

// تسجيل الخروج
function logout() {
  router.push('/')
}

// التعامل مع العناصر الوظيفية
function handleAction(route) {
  if (route === '#lang') toggleLang()
  else if (route === '#logout') logout()
}

// القائمة الجانبية كـ computed لتحديث اللغة ديناميكيًا
const sidebarItems = computed(() => [
  { name: 'الرئيسية', icon: '🏠', route: '/cboard' },
  { name: 'الاقسام', icon: '📋', route: '/cboard/sections' },
  { name: 'المنتجات', icon: '🍽️', route: '/cboard/Products' },
  { name: 'العروض', icon: '🎁', route: '/cboard/Offers' },
  { name: 'ربط المنتجات', icon: '🧩', route: '/cboard/linker' },
  { name: 'التواصل', icon: '📱', route: '/cboard/Social' },
  { name: 'الثيمات', icon: '🎨', route: '/cboard/templates' },
  { name: 'تصميم المنيو', icon: '🖌️', route: '/cboard/MenuDesign' },
  { name: 'معاينة المنيو', icon: '🧾', route: '/cboard/MenuPreview' },
  { name: 'الإعدادات', icon: '⚙️', route: '/cboard/settings' },
  {
    name: currentLang.value === 'ar' ? 'English' : 'العربية',
    icon: currentLang.value === 'ar' ? 'En' : 'ع',
    route: '#lang'
  },
  { name: 'خروج', icon: '⏻', route: '#logout' }
])
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

.sidebar-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: #444;
  font-weight: 500;
  padding: 0.6rem 0.75rem;
  border-radius: 6px;
  transition: background-color 0.2s ease, color 0.2s ease;
  background: none;
  border: none;
  cursor: pointer;
}

.sidebar-link:hover {
  background-color: #f0f8ff;
  color: #007bff;
}

.sidebar-link.active {
  background-color: #e6f0ff;
  color: #007bff;
}

.icon {
  font-size: 1.2rem;
}

.tooltip {
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #333;
  color: #fff;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: 10;
}

.sidebar-link:hover .tooltip {
  opacity: 1;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  z-index: 0;
}

.page-content {
  padding: 2rem;
  background-color: #f9f9f9;
  flex: 1;
  overflow-y: auto;
  border-top: 1px solid #eee;
}
</style>
