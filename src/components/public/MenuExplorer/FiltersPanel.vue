<template>
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

      <!-- المستوى الثاني: المدن -->
      <div
        v-if="option.children && selectedFilters.includes(option.value)"
        class="sub-filters"
      >
        <div
          v-for="city in option.children"
          :key="city.value"
          class="city-wrapper"
        >
          <!-- زر المدينة -->
          <button
            :class="['sub-filter-btn', { active: selectedSubFilters.includes(city.value) }]"
            @click="toggleSubFilter(city.value)"
          >
            {{ city.label }}
          </button>

          <!-- المستوى الثالث: الأحياء -->
          <div
            v-if="Array.isArray(city.districts) && selectedSubFilters.includes(city.value)"
            class="sub-filters districts"
          >
            <button
              v-for="dist in city.districts"
              :key="dist.value"
              :class="['sub-filter-btn', { active: selectedSubFilters.includes(dist.value) }]"
              @click="toggleSubFilter(dist.value)"
            >
              {{ dist.label }}
            </button>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

/* -----------------------------------
   🟧 بيانات الفلاتر (داخل المكوّن)
----------------------------------- */
const filterOptions = [
  { label: 'الأقرب لي', value: 'near' },

{
  label: 'المدينة',
  value: 'city',
  children: [
    {
      label: 'الرياض',
      value: 'riyadh',
      districts: [
        { label: 'النرجس', value: 'narjis' },
        { label: 'الياسمين', value: 'yasmin' },
        { label: 'العقيق', value: 'aqiq' },
        { label: 'الروضة', value: 'rawdah' },
      ]
    },
    {
      label: 'جدة',
      value: 'jeddah',
      districts: [
        { label: 'الصفا', value: 'safa' },
        { label: 'الحمراء', value: 'hamra' },
      ]
    },
    {
      label: 'الدمام',
      value: 'dammam',
      districts: [
        { label: 'الشاطئ', value: 'shatee' },
        { label: 'الريان', value: 'rayyan' },
      ]
    },
    { label: 'مكة', value: 'makkah' },
    { label: 'المدينة', value: 'madinah' },
  ]
},

  {
    label: 'مطاعم',
    value: 'restaurants',
    children: [
      { label: 'مشويات', value: 'grill' },
      { label: 'برجر', value: 'burger' },
      { label: 'شعبي', value: 'local' },
      { label: 'بحري', value: 'seafood' },
      { label: 'إيطالي', value: 'italian' },
      { label: 'فطور', value: 'breakfast' },
    ]
  },

  {
    label: 'كافيهات',
    value: 'cafes',
    children: [
      { label: 'قهوة مختصة', value: 'specialty' },
      { label: 'حلويات', value: 'desserts' },
      { label: 'كروسان', value: 'croissant' },
      { label: 'قهوة عربية', value: 'arabic-coffee' },
    ]
  },

  {
    label: 'لاونجات',
    value: 'lounges',

  },

  {
    label: 'صالونات',
    value: 'salons',
    children: [
      { label: 'رجالي', value: 'men' },
      { label: 'نسائي', value: 'women' },
      { label: 'أطفال', value: 'kids' },
    ]
  },

  {
    label: 'عيادات',
    value: 'clinics',
    children: [
      { label: 'أسنان', value: 'dentist' },
      { label: 'جلدية', value: 'derma' },
      { label: 'تجميل', value: 'cosmetic' },
      { label: 'عيون', value: 'eyes' },
    ]
  },

  {
    label: 'مغاسل',
    value: 'laundry',
    children: [
      { label: 'سيارات', value: 'cars' },
      { label: 'ملابس', value: 'clothes' },
      { label: 'سجاد', value: 'carpets' },
    ]
  },

  {
    label: 'ورود وهدايا',
    value: 'flowers',

  },

  {
    label: 'حيوانات أليفة',
    value: 'pets',
    children: [
      { label: 'عيادات', value: 'pet-clinic' },
      { label: 'مستلزمات', value: 'supplies' },
      { label: 'طعام', value: 'food' },
      { label: 'تدريب', value: 'training' },
    ]
  }
]

/* -----------------------------------
   🟧 الفلاتر المختارة
----------------------------------- */
const selectedFilters = ref<string[]>([])
const selectedSubFilters = ref<string[]>([])

/* -----------------------------------
   🟧 إرسال التغييرات للأب
----------------------------------- */
const emit = defineEmits(['update:filters'])

watch([selectedFilters, selectedSubFilters], () => {
  emit('update:filters', {
    main: selectedFilters.value,
    sub: selectedSubFilters.value
  })
})

/* -----------------------------------
   🟧 تفعيل/تعطيل الفلتر الرئيسي
----------------------------------- */
function toggleFilter(value: string) {
  if (selectedFilters.value.includes(value)) {
    selectedFilters.value = selectedFilters.value.filter(v => v !== value)
    selectedSubFilters.value = []
  } else {
    selectedFilters.value.push(value)
  }
}

/* -----------------------------------
   🟧 تفعيل/تعطيل الفلتر الفرعي
----------------------------------- */
function toggleSubFilter(value: string) {
  if (selectedSubFilters.value.includes(value)) {
    selectedSubFilters.value = selectedSubFilters.value.filter(v => v !== value)
  } else {
    selectedSubFilters.value.push(value)
  }
}
</script>

<style scoped>
/* الحاوية العامة */
.filter-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0.5rem 0;
}

/* كل مجموعة (فلتر رئيسي + فرعي) */
.filter-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

/* زر الفلتر الرئيسي */
.filter-btn {
  padding: 0.55rem 1.1rem;
  border: 1px solid #ddd;
  border-radius: 22px;
  background: white;
  cursor: pointer;
  transition: 0.25s ease;
  font-size: 0.9rem;
  font-weight: 600;
  color: #444;
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

/* الفلاتر الفرعية */
.sub-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding-left: 0.3rem;
}

/* زر الفلتر الفرعي */
.sub-filter-btn {
  padding: 0.35rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 14px;
  background: #f2f2f2;
  font-size: 0.8rem;
  cursor: pointer;
  transition: 0.2s ease;
  color: #555;
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
</style>

