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
          :class="['sidebar-link', route.path === item.route ? 'active' : '']"
        >
         <span class="icon">
  <img
    v-if="item.iconType === 'svg'"
    :src="`/icons/sidebar/${item.icon}`"
    :alt="item.name"
    class="svg-icon"
  />
  <span v-else>{{ item.icon }}</span>
</span>

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
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const isCollapsed = ref(true)
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const router = useRouter()
const route = useRoute()

const currentLang = ref('ar')

function toggleLang() {
  currentLang.value = currentLang.value === 'ar' ? 'en' : 'ar'
  document.documentElement.setAttribute('dir', currentLang.value === 'ar' ? 'rtl' : 'ltr')
}

onMounted(() => {
  document.documentElement.setAttribute('dir', currentLang.value === 'ar' ? 'rtl' : 'ltr')
})

function logout() {
  router.push('/')
}

function handleAction(route) {
  if (route === '#lang') toggleLang()
  else if (route === '#logout') logout()
}

const sidebarItems = computed(() => [
  {
    name: currentLang.value === 'ar' ? 'English' : 'العربية',
    icon: currentLang.value === 'ar' ? 'En' : 'ع',
    iconType: 'text',
    route: '#lang'
  },
  { name: 'الرئيسية', icon: 'homepage-icon.svg', iconType: 'svg', route: '/cboard' },
  { name: 'معلومات التشغيل', icon: 'working-icon.svg', iconType: 'svg', route: '/cboard/order-info' },
  { name: 'التواصل', icon: 'socialmedia-icon.svg', iconType: 'svg', route: '/cboard/Social' },
  { name: 'الاقسام', icon: 'sections-icon.svg', iconType: 'svg', route: '/cboard/sections' },
  { name: 'المنتجات', icon: 'products-icon.svg', iconType: 'svg', route: '/cboard/Products' },
  { name: 'العروض', icon: 'offer-icon.svg', iconType: 'svg', route: '/cboard/Offers' },
  { name: 'ربط المنتجات', icon: 'connection-icon.svg', iconType: 'svg', route: '/cboard/linker' },
  { name: 'الثيمات', icon: 'theme-icon.svg', iconType: 'svg', route: '/cboard/templates' },
  { name: 'تصميم المنيو', icon: 'menudesign-icon.svg', iconType: 'svg', route: '/cboard/MenuDesign' },
  { name: 'معاينة المنيو', icon: 'preview-icon.svg', iconType: 'svg', route: '/cboard/MenuPreview' },
  { name: 'الإعدادات', icon: 'settings-icon.svg', iconType: 'svg', route: '/cboard/settings' },
  { name: 'خروج', icon: '⏻', iconType: 'text', route: '#logout' }
])

</script>

<style scoped>
.cboard-layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #FFFFFF; /* ✅ خلفية موحدة */
  font-family: 'Segoe UI', sans-serif;
  overflow: hidden;
}

.sidebar {
  width: 220px;
  background-color: #FFFFFF;
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
  color: #5e5d5d;
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
  background-color: #ff9318;
  color: #000000;
}

.icon {
  font-size: 1.2rem;
}

.tooltip {
  position: absolute;
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
  flex: 1;
  overflow-y: auto;
  padding: 0; /* ✅ إزالة الحواف */
  background-color: transparent; /* ✅ إزالة الخلفية الرمادية */
  border-top: none; /* ✅ إزالة الخط الفاصل */
}

/* دعم RTL */
[dir="rtl"] .sidebar {
  border-left: 1px solid #e0e0e0;
  border-right: none;
}
[dir="rtl"] .sidebar-link {
  flex-direction: row-reverse;
}
[dir="rtl"] .tooltip {
  left: -10px;
  right: auto;
}

/* دعم LTR */
[dir="ltr"] .sidebar {
  border-right: 1px solid #e0e0e0;
  border-left: none;
}
[dir="ltr"] .sidebar-link {
  flex-direction: row;
}
[dir="ltr"] .tooltip {
  right: -10px;
  left: auto;
}
.svg-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

</style>
