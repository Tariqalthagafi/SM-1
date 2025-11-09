<template>
  <div class="cboard-layout">
    <!-- Sidebar -->
    <aside v-if="!isPublicView" class="sidebar" :class="{ collapsed: isCollapsed }">
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
import { supabase } from '@/supabase'
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()

const isCollapsed = ref(true)
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const router = useRouter()
const route = useRoute()

const currentLang = ref('ar')

function toggleLang() {
  locale.value = locale.value === 'ar' ? 'en' : 'ar'
  document.documentElement.setAttribute('dir', locale.value === 'ar' ? 'rtl' : 'ltr')
}


onMounted(() => {
  document.documentElement.setAttribute('dir', locale.value === 'ar' ? 'rtl' : 'ltr')

  const links = document.querySelectorAll('.sidebar-link')
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const tooltip = link.querySelector('.tooltip')
      if (!tooltip) return

      tooltip.style.opacity = '1'
      tooltip.style.display = 'inline-block'

      requestAnimationFrame(() => {
        const rect = link.getBoundingClientRect()
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl'
        const tooltipWidth = tooltip.offsetWidth

        tooltip.style.top = `${rect.top + rect.height / 2}px`
        tooltip.style.transform = 'translateY(-50%)'

        if (isRTL) {
          tooltip.style.left = `${rect.left - tooltipWidth - 12}px`
        } else {
          tooltip.style.left = `${rect.right + 12}px`
        }
      })
    })

    link.addEventListener('mouseleave', () => {
      const tooltip = link.querySelector('.tooltip')
      if (tooltip) {
        tooltip.style.opacity = '0'
      }
    })
  })
})

async function logout() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('❌ فشل تسجيل الخروج:', error.message)
  } else {
    router.push('/') // ✅ إعادة المستخدم إلى الصفحة الرئيسية بعد تسجيل الخروج
  }
}

function handleAction(route) {
  if (route === '#lang') toggleLang()
  else if (route === '#logout') logout()
}

const sidebarItems = computed(() => [
  {
    name: locale.value === 'ar' ? 'English' : 'العربية',
    icon: locale.value === 'ar' ? 'En' : 'ع',
    iconType: 'text',
    route: '#lang'
  },
  { name: t('cboard.sidebar.home'), icon: 'homepage-icon.svg', iconType: 'svg', route: '/cboard' },
  { name: t('cboard.sidebar.orderInfo'), icon: 'working-icon.svg', iconType: 'svg', route: '/cboard/order-info' },
  { name: t('cboard.sidebar.social'), icon: 'socialmedia-icon.svg', iconType: 'svg', route: '/cboard/Social' },
  { name: t('cboard.sidebar.sections'), icon: 'sections-icon.svg', iconType: 'svg', route: '/cboard/sections' },
  { name: t('cboard.sidebar.products'), icon: 'products-icon.svg', iconType: 'svg', route: '/cboard/Products' },
  { name: t('cboard.sidebar.offers'), icon: 'offer-icon.svg', iconType: 'svg', route: '/cboard/Offers' },
  { name: t('cboard.sidebar.linker'), icon: 'connection-icon.svg', iconType: 'svg', route: '/cboard/linker' },
  { name: t('cboard.sidebar.templates'), icon: 'theme-icon.svg', iconType: 'svg', route: '/cboard/templates' },
  { name: t('cboard.sidebar.menuDesign'), icon: 'menudesign-icon.svg', iconType: 'svg', route: '/cboard/MenuDesign' },
  { name: t('cboard.sidebar.menuPreview'), icon: 'preview-icon.svg', iconType: 'svg', route: '/cboard/MenuPreview' },
  { name: t('cboard.sidebar.settings'), icon: 'settings-icon.svg', iconType: 'svg', route: '/cboard/settings' },
  { name: t('cboard.sidebar.logout'), icon: '⏻', iconType: 'text', route: '#logout' }
])

const isPublicView = computed(() => route.path.startsWith('/menu'))

</script>

<style scoped>
.cboard-layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #FFFFFF; /* ✅ خلفية موحدة */
  font-family: 'Segoe UI', sans-serif;
  overflow: visible;
}

.sidebar {
  width: 220px;
  background-color: #FFFFFF;
  padding: 1rem;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 6px rgba(0,0,0,0.05);
  overflow: visible;
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
  position: fixed;
  top: 0;
  left: 0;
  transform: none;
  background-color: #333;
  color: #fff;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: 1000;
  display: inline-block; /* ✅ مهم لتقييد الحجم على النص */
  width: max-content;     /* ✅ يجعل الخلفية تلتف حول النص فقط */
  max-width: 300px;       /* ✅ يمنع التمدد الزائد */
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
