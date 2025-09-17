import { createRouter, createWebHistory } from 'vue-router'

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

  // لوحة التحكم تحت مسار /cboard
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
        path: '/cboard/Sections',
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
        component: () => import('@/views/cboard/linker.vue')
      },
      {
        path: 'Social',
        name: 'Social',
        component: () => import('@/views/cboard/Social.vue'),
      },
      {
        path: '/cboard/templates',
        name: 'templates',
        component: () => import('@/views/cboard/templates.vue')
      },
            {
        path: '/cboard/MenuDesign',
        name: 'MenuDesign',
        component: () => import('@/views/cboard/MenuDesign.vue')
      },
      {
        path: '/cboard/MenuPreview',
        name: 'MenuPreview',
        component: () => import('@/views/cboard/MenuPreview.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/cboard/Settings.vue'),
      },
      {
       path: '/cboard/menupreview',
       name: 'MenuPreview',
       component: () => import('@/views/cboard/MenuPreview.vue')
      },  
      
   
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
