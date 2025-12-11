import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/supabase'

// الصفحة العامة
import HomePage from '@/views/index.vue'

// Layout الخاص بلوحة التحكم
import CBoardLayout from '@/layouts/CBoardLayout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },

  {
    path: '/cboard',
    component: CBoardLayout,
    children: [
      {
        path: '',
        name: 'cboardHome',
        component: () => import('@/views/cboard/Home.vue'),
      },
      {
        path: 'Sections',
        name: 'Sections',
        component: () => import('@/views/cboard/Sections.vue'),
      },
      {
        path: 'Products',
        name: 'Products',
        component: () => import('@/views/cboard/Products.vue'),
      },
      {
        path: 'Offers',
        name: 'Offers',
        component: () => import('@/views/cboard/Offers.vue'),
      },
      {
        path: 'linker',
        name: 'linker',
        component: () => import('@/views/cboard/linker.vue'),
      },
      {
        path: 'Social',
        name: 'Social',
        component: () => import('@/views/cboard/social.vue'),
      },
      {
        path: 'order-info',
        name: 'OrderInfo',
        component: () => import('@/views/cboard/OrderInfoView.vue'),
      },
      {
        path: 'MenuDesign',
        name: 'MenuDesign',
        component: () => import('@/views/cboard/MenuDesign.vue'),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/cboard/Settings.vue'),
      },
    ],
  },

  // ✅ تعريف المسار العام خارج children
  {
  path: '/menu/:shortId',
  name: 'MenuPublicView',
  component: () => import('@/views/public/MenuPublicView.vue'),
  props: true,
},
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ✅ حماية صفحات لوحة التحكم فقط
router.beforeEach(async (to, from, next) => {
  const { data: { user } } = await supabase.auth.getUser()

  const isProtectedRoute = to.path.startsWith('/cboard')

  if (isProtectedRoute && !user) {
    next('/') // ❌ ممنوع الدخول بدون تسجيل
  } else {
    next() // ✅ السماح بالوصول
  }
})

export default router
