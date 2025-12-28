<template>
  <div class="explorer-page">

    <!-- 🔶 الهيدر -->
    <header class="explorer-header">
      <div class="logo-text">أداة المنيو</div>

      <!-- 🔘 أزرار الفلاتر -->
      <div class="filter-buttons">

        <div
          v-for="option in filterOptions"
          :key="option.value"
          class="filter-wrapper"
        >
          <!-- الزر الرئيسي -->
          <button
            :class="['filter-btn', { active: selectedFilters.includes(option.value) }]"
            @click="toggleFilter(option.value)"
          >
            {{ option.label }}
          </button>

          <!-- الفلاتر الفرعية -->
          <div
            v-if="option.children && selectedFilters.includes(option.value)"
            class="sub-filters"
          >
            <button
              v-for="child in option.children"
              :key="child.value"
              :class="['sub-filter-btn', { active: selectedSubFilters.includes(child.value) }]"
              @click="toggleSubFilter(child.value)"
            >
              {{ child.label }}
            </button>
          </div>
        </div>

      </div>
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
        <h3 class="menu-title">{{ menu.business_name }}</h3>
        <p class="menu-desc">{{ menu.description }}</p>

        <div class="menu-tags">
          <span class="tag">{{ menu.city }}</span>
          <span class="tag">{{ menu.category }}</span>
        </div>

        <button class="view-btn">
          عرض المنيو
        </button>
      </div>

    </div>

  </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'

/* -----------------------------------
   🔘 بيانات وهمية للمطاعم (Mock Data)
----------------------------------- */
const menus = ref([
  {
    short_id: 'r1',
    business_name: 'مطعم مشويات الرافدين',
    description: 'أفضل مشويات عراقية',
    category: 'grill',
    city: 'riyadh'
  },
  {
    short_id: 'r2',
    business_name: 'شعبيات أم عبدالله',
    description: 'أكلات شعبية سعودية',
    category: 'local',
    city: 'jeddah'
  },
  {
    short_id: 'r3',
    business_name: 'كافيه روز',
    description: 'قهوة مختصة وحلويات',
    category: 'cafe',
    city: 'riyadh'
  },
  {
    short_id: 'r4',
    business_name: 'مطعم البحّار',
    description: 'مأكولات بحرية طازجة',
    category: 'seafood',
    city: 'dammam'
  },
  {
    short_id: 'r5',
    business_name: 'برجر فاكتوري',
    description: 'برجر أمريكي فاخر',
    category: 'burger',
    city: 'riyadh'
  },
  {
    short_id: 'r6',
    business_name: 'مطعم الشامي',
    description: 'مشويات ومقبلات شامية',
    category: 'grill',
    city: 'jeddah'
  },
  {
    short_id: 'r7',
    business_name: 'مندي البيت',
    description: 'مندي ومظبي على الحجر',
    category: 'local',
    city: 'riyadh'
  },
  {
    short_id: 'r8',
    business_name: 'مطعم السدة',
    description: 'أكلات شعبية يمنية',
    category: 'local',
    city: 'dammam'
  },
  {
    short_id: 'r9',
    business_name: 'مطعم تاكو تايم',
    description: 'تاكو مكسيكي حار',
    category: 'mexican',
    city: 'jeddah'
  },
  {
    short_id: 'r10',
    business_name: 'مطعم سوشي هاوس',
    description: 'سوشي ياباني فاخر',
    category: 'asian',
    city: 'riyadh'
  }
])

/* -----------------------------------
   🔘 خيارات الفلاتر
----------------------------------- */
const filterOptions = [
  { label: 'الأقرب لي', value: 'near' },

  {
    label: 'المدينة',
    value: 'city',
    children: [
      { label: 'الرياض', value: 'riyadh' },
      { label: 'جدة', value: 'jeddah' },
      { label: 'الدمام', value: 'dammam' },
    ]
  },

  { label: 'مشويات', value: 'grill' },
  { label: 'شعبيات', value: 'local' }
]

/* -----------------------------------
   🔘 الفلاتر المختارة
----------------------------------- */
const selectedFilters = ref<string[]>([])
const selectedSubFilters = ref<string[]>([])

/* -----------------------------------
   🔘 تفعيل/تعطيل الفلتر الرئيسي
----------------------------------- */
function toggleFilter(value: string) {
  if (selectedFilters.value.includes(value)) {
    selectedFilters.value = selectedFilters.value.filter(v => v !== value)
    selectedSubFilters.value = [] // حذف الفلاتر الفرعية عند الإلغاء
  } else {
    selectedFilters.value.push(value)
  }
}

/* -----------------------------------
   🔘 تفعيل/تعطيل الفلتر الفرعي
----------------------------------- */
function toggleSubFilter(value: string) {
  if (selectedSubFilters.value.includes(value)) {
    selectedSubFilters.value = selectedSubFilters.value.filter(v => v !== value)
  } else {
    selectedSubFilters.value.push(value)
  }
}

/* -----------------------------------
   🔍 فلترة النتائج حسب الاختيارات
----------------------------------- */
const filteredMenus = computed(() => {
  let list = menus.value

  // فلتر حسب التصنيف (مشويات / شعبيات)
  if (selectedFilters.value.includes('grill')) {
    list = list.filter(m => m.category === 'grill')
  }

  if (selectedFilters.value.includes('local')) {
    list = list.filter(m => m.category === 'local')
  }

  // فلتر حسب المدينة (الفلاتر الفرعية)
  if (selectedFilters.value.includes('city') && selectedSubFilters.value.length) {
    list = list.filter(m => selectedSubFilters.value.includes(m.city))
  }

  // الأقرب لي (لاحقًا نضيف GPS)
  if (selectedFilters.value.includes('near')) {
    // placeholder مؤقت
    list = list.filter(m => m.city === 'riyadh')
  }

  return list
})
</script>


<style scoped>
.explorer-page {
  padding: 1.5rem;
  font-family: 'Tajawal', sans-serif;
  background: #f9f9f9;
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
  font-size: 1.6rem;
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
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 22px;
  background: white;
  cursor: pointer;
  transition: 0.25s ease;
  font-size: 0.9rem;
  font-weight: 500;
}

.filter-btn:hover {
  background: #fff4e6;
}

.filter-btn.active {
  background: #FF7A00;
  color: white;
  border-color: #FF7A00;
  box-shadow: 0 2px 6px rgba(255, 122, 0, 0.3);
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
  background: #e8e8e8;
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
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.2rem;
}

/* بطاقة المنيو */
.menu-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: 0.25s ease;
  cursor: pointer;
}

.menu-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.menu-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.menu-desc {
  font-size: 0.85rem;
  color: #666;
  margin: 0.4rem 0 0.6rem;
}

/* الوسوم */
.menu-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
}

.tag {
  background: #f3f3f3;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  color: #555;
}

/* زر عرض المنيو */
.view-btn {
  padding: 0.5rem;
  background: #FF7A00;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: 0.2s ease;
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
</style>
