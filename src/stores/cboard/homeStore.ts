import { defineStore } from 'pinia'
import { ref } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'

export const useHomeStore = defineStore('homeStore', () => {
  // 👤 بيانات المستخدم
  const username = ref('عبدالله')

  // 🆔 معرف المنيو (ثابت)
  const menuId = ref<string | null>(null)

  // 📅 بيانات الزيارة والنشاط
  const lastVisit = ref<string | null>(null)
  const activityLog = ref<string[]>([])
  const showTips = ref(true)

  // 🧮 إحصائيات الصفحة
  const productCount = ref(0)
  const categoryCount = ref(0)
  const lastUpdated = ref('غير محدد')

  // 🏷️ الهوية التجارية
  const restaurantName = ref('')
  const logoUrl = ref<string | null>(null)
  const logoBlob = ref<Blob | null>(null)
  const businessType = ref<string>('مطعم') // ✅ النشاط التجاري

  // 📌 تحميل البيانات من IndexedDB أو إنشاؤها إذا لم تكن موجودة
  async function initStore() {
    // Menu ID
    const savedMenuId = await indexedDBService.get('settings', 'menuId')
    if (savedMenuId) {
      menuId.value = savedMenuId.value
    } else {
      menuId.value = 'MENU-' + Math.floor(100000 + Math.random() * 900000)
      await indexedDBService.put('settings', { id: 'menuId', value: menuId.value })
    }

    // اسم المطعم
    const savedName = await indexedDBService.get('settings', 'restaurantName')
    if (savedName) {
      restaurantName.value = savedName.value
    }

    // الشعار
    const savedLogo = await indexedDBService.get('settings', 'logoUrl')
    if (savedLogo) {
      logoUrl.value = savedLogo.value
    }

    // النشاط التجاري
    const savedType = await indexedDBService.get('settings', 'businessType')
    if (savedType) {
      businessType.value = savedType.value
    }
  }

  // 🖼️ ضبط الشعار من ملف
  async function setLogoBlob(blob: Blob) {
    logoBlob.value = blob
    logoUrl.value = URL.createObjectURL(blob)
    await indexedDBService.put('settings', { id: 'logoUrl', value: logoUrl.value })
  }

  // 🖼️ ضبط أو إزالة الشعار
  async function setLogoUrl(url: string | null) {
    logoUrl.value = url
    await indexedDBService.put('settings', { id: 'logoUrl', value: url })
  }

  // 🏷️ ضبط اسم المطعم
  async function setRestaurantName(name: string) {
    restaurantName.value = name
    await indexedDBService.put('settings', { id: 'restaurantName', value: name })
  }

  // 🏷️ ضبط النشاط التجاري
  async function setBusinessType(type: string) {
    businessType.value = type
    await indexedDBService.put('settings', { id: 'businessType', value: type })
  }

  // 📅 تسجيل الزيارة
  function markVisit() {
    lastVisit.value = new Date().toISOString()
  }

  // 📝 تسجيل نشاط
  function logActivity(message: string) {
    activityLog.value.push(`${new Date().toISOString()} - ${message}`)
  }

  // 💡 إظهار/إخفاء النصائح
  function toggleTips() {
    showTips.value = !showTips.value
  }

  // 📊 تحديث الإحصائيات
  function updateStats({ products, categories }: { products: number; categories: number }) {
    productCount.value = products
    categoryCount.value = categories
    lastUpdated.value = new Date().toLocaleString('ar-EG')
  }

  return {
    // الحالة
    username,
    menuId,
    lastVisit,
    activityLog,
    showTips,
    productCount,
    categoryCount,
    lastUpdated,
    restaurantName,
    logoUrl,
    logoBlob,
    businessType, // ✅ مضاف

    // الدوال
    initStore,
    setRestaurantName,
    setLogoUrl,
    setLogoBlob,
    setBusinessType, // ✅ مضاف
    markVisit,
    logActivity,
    toggleTips,
    updateStats
  }
})
