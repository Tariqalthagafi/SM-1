<template>
  <div class="explorer-page">

    <!-- 🔶 الهيدر -->
    <header class="explorer-header">
      <div class="logo-text">أداة المنيو</div>

      <!-- 🔘 مكوّن الفلاتر -->
      <FiltersPanel @update:filters="applyFilters" />
    </header>

    <!-- 🟦 شبكة المنيوهات -->
    <div class="menus-grid">

      <!-- لا توجد نتائج -->
      <div v-if="filteredMenus.length === 0" class="empty-state">
        لا توجد نتائج مطابقة للفلاتر المختارة
      </div>

      <!-- بطاقات المنيوهات -->
      <div
        v-for="menu in filteredMenus"
        :key="menu.short_id"
        class="menu-card"
      >

        <!-- 🔥 صورة + معلومات -->
        <div class="menu-header">
          <img
            v-if="menu.logo_url"
            :src="menu.logo_url"
            alt="logo"
            class="menu-logo"
          />

          <div class="menu-info">
            <h3 class="menu-title">{{ menu.business_name }}</h3>
            <p class="menu-desc">{{ menu.description }}</p>
          </div>
        </div>

        <!-- ⭐ التقييم -->
        <div class="rating">
          <span class="single-star">★</span>
          <span class="rating-number">{{ menu.rating }} ({{ menu.reviews }} مراجعة)</span>
        </div>

        <!-- الوسوم -->
        <div class="menu-tags">
          <span class="tag">{{ menu.city }}</span>
          <span class="tag">{{ menu.category }}</span>
        </div>

        <!-- زر عرض المنيو -->
        <button class="view-btn">
          عرض المنيو
        </button>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import FiltersPanel from './FiltersPanel.vue'

/* -----------------------------------
   🔘 بيانات المطاعم
----------------------------------- */
const menus = ref([
  {
    short_id: 'r1',
    business_name: 'مطعم مشويات الرافدين',
    description: 'أفضل مشويات عراقية',
    category: 'grill',
    city: 'riyadh',
    rating: 4.6,
    reviews: 120,
    logo_url: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=300'
  },
  {
    short_id: 'r2',
    business_name: 'شعبيات أم عبدالله',
    description: 'أكلات شعبية سعودية',
    category: 'local',
    city: 'jeddah',
    rating: 4.2,
    reviews: 85,
    logo_url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    short_id: 'r3',
    business_name: 'كافيه روز',
    description: 'قهوة مختصة وحلويات',
    category: 'cafe',
    city: 'riyadh',
    rating: 4.8,
    reviews: 210,
    logo_url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300'
  },
  {
    short_id: 'r4',
    business_name: 'مطعم البحّار',
    description: 'مأكولات بحرية طازجة',
    category: 'seafood',
    city: 'dammam',
    rating: 4.1,
    reviews: 64,
    logo_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300'
  },
  {
    short_id: 'r5',
    business_name: 'برجر فاكتوري',
    description: 'برجر أمريكي فاخر',
    category: 'burger',
    city: 'riyadh',
    rating: 4.7,
    reviews: 150,
    logo_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300'
  },
  {
    short_id: 'r6',
    business_name: 'مطعم الشامي',
    description: 'مشويات ومقبلات شامية',
    category: 'grill',
    city: 'jeddah',
    rating: 4.3,
    reviews: 98,
    logo_url: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    short_id: 'r7',
    business_name: 'مندي البيت',
    description: 'مندي ومظبي على الحجر',
    category: 'local',
    city: 'riyadh',
    rating: 4.5,
    reviews: 140,
    logo_url: 'https://images.pexels.com/photos/247466/pexels-photo-247466.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    short_id: 'r8',
    business_name: 'مطعم السدة',
    description: 'أكلات شعبية يمنية',
    category: 'local',
    city: 'dammam',
    rating: 4.0,
    reviews: 70,
    logo_url: 'https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    short_id: 'r9',
    business_name: 'مطعم تاكو تايم',
    description: 'تاكو مكسيكي حار',
    category: 'mexican',
    city: 'jeddah',
    rating: 4.4,
    reviews: 110,
    logo_url: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=300&q=80'
  },
  {
    short_id: 'r10',
    business_name: 'مطعم سوشي هاوس',
    description: 'سوشي ياباني فاخر',
    category: 'asian',
    city: 'riyadh',
    rating: 4.9,
    reviews: 260,
    logo_url: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=300'
  }
])

/* -----------------------------------
   🔘 الفلاتر القادمة من FiltersPanel
----------------------------------- */
const selectedMain = ref<string[]>([])
const selectedSub = ref<string[]>([])

function applyFilters(filters: any) {
  selectedMain.value = filters.main
  selectedSub.value = filters.sub
}

/* -----------------------------------
   🔍 فلترة النتائج
----------------------------------- */
const filteredMenus = computed(() => {
  let list = menus.value

  // فلتر حسب التصنيف
  if (selectedMain.value.includes('grill')) {
    list = list.filter(m => m.category === 'grill')
  }

  if (selectedMain.value.includes('local')) {
    list = list.filter(m => m.category === 'local')
  }

  // فلتر حسب المدينة
  if (selectedMain.value.includes('city') && selectedSub.value.length) {
    list = list.filter(m => selectedSub.value.includes(m.city))
  }

  // الأقرب لي
  if (selectedMain.value.includes('near')) {
    list = list.filter(m => m.city === 'riyadh')
  }

  return list
})
</script>


<style scoped>
.explorer-page {
  padding: 1.5rem;
  font-family: 'Tajawal', sans-serif;
  background: #fafafa;
  min-height: 100vh;
}

/* ------------------------------
   🔶 الهيدر
------------------------------ */
.explorer-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid #e5e5e5;
}

.logo-text {
  font-size: 1.7rem;
  font-weight: 700;
  color: #FF7A00;
  letter-spacing: 0.5px;
}

/* ------------------------------
   🔶 الفلاتر الرئيسية
------------------------------ */
.filter-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.filter-btn {
  padding: 0.55rem 1.1rem;
  border: 1px solid #ddd;
  border-radius: 22px;
  background: white;
  cursor: pointer;
  transition: 0.25s ease;
  font-size: 0.9rem;
  font-weight: 600;
}

.filter-btn:hover {
  background: #fff2e0;
}

.filter-btn.active {
  background: #FF7A00;
  color: white;
  border-color: #FF7A00;
  box-shadow: 0 2px 8px rgba(255, 122, 0, 0.35);
}

/* ------------------------------
   🔶 الفلاتر الفرعية
------------------------------ */
.sub-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding-left: 0.3rem;
}

.sub-filter-btn {
  padding: 0.35rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 14px;
  background: #f2f2f2;
  font-size: 0.8rem;
  cursor: pointer;
  transition: 0.2s ease;
}

.sub-filter-btn:hover {
  background: #e6e6e6;
}

.sub-filter-btn.active {
  background: #FF7A00;
  color: white;
  border-color: #FF7A00;
  box-shadow: 0 2px 6px rgba(255, 122, 0, 0.3);
}

/* ------------------------------
   🔶 شبكة المنيوهات
------------------------------ */
.menus-grid {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 1.4rem;
}

/* بطاقة المنيو */
.menu-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: 0.25s ease;
  cursor: pointer;
}

.menu-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}

/* ------------------------------
   🔶 صورة + معلومات
------------------------------ */
.menu-header {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.menu-logo {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
  border: 1px solid #eee;
}

.menu-info {
  flex: 1;
}

.menu-title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #333;
}

.menu-desc {
  font-size: 0.85rem;
  color: #666;
  margin-top: 0.25rem;
}

/* ------------------------------
   ⭐ التقييم
------------------------------ */
.rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0.6rem 0;
}

.star {
  font-size: 1.1rem;
  color: #ddd;
}

.star.filled {
  color: #FFB400;
}

.rating-number {
  font-size: 0.85rem;
  color: #444;
  margin-left: 0.3rem;
}

/* ------------------------------
   🔶 الوسوم
------------------------------ */
.menu-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
}

.tag {
  background: #f3f3f3;
  padding: 0.3rem 0.7rem;
  border-radius: 12px;
  font-size: 0.75rem;
  color: #555;
}

/* ------------------------------
   🔶 زر عرض المنيو
------------------------------ */
.view-btn {
  padding: 0.55rem;
  background: #FF7A00;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.2s ease;
  width: 100%;
  font-weight: 600;
}

.view-btn:hover {
  background: #e56d00;
}

/* ------------------------------
   🔶 حالة عدم وجود نتائج
------------------------------ */
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  color: #777;
  font-size: 1rem;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0.6rem 0;
}

.single-star {
  font-size: 1.2rem;
  color: #FFB400;
  font-weight: bold;
}

.rating-number {
  font-size: 0.85rem;
  color: #444;
}

</style>
