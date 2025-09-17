<template>
  <div class="allergens-picker">
    <!-- الحقل مع الـ Tags -->
    <div class="input-wrapper" @click="dropdownOpen = true">
      <div class="tags">
        <span v-for="tag in localValue" :key="tag" class="tag">
          {{ tag }}
          <button type="button" @click.stop="removeTag(tag)">×</button>
        </span>
        <input
          type="text"
          v-model="search"
          placeholder="اختر مسببات الحساسية"
          @focus="dropdownOpen = true"
        />
      </div>
    </div>

    <!-- القائمة المنسدلة -->
    <ul v-if="dropdownOpen && filteredList.length" class="dropdown">
      <li
        v-for="item in filteredList"
        :key="item"
        @click="selectItem(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const allergensList = [
  'الجلوتين',
  'المحار',
  'البيض',
  'السمك',
  'الفول السوداني',
  'فول الصويا',
  'الحليب',
  'المكسرات',
  'الكرفس',
  'الخردل',
  'السمسم',
  'ثاني أكسيد الكبريت والكبريتات',
  'البقوليات',
  'الرخويات'
]

// ✅ السماح بأن تكون undefined
const props = defineProps<{ modelValue?: string[] }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string[]): void }>()

// ✅ تهيئة آمنة
const localValue = ref<string[]>(Array.isArray(props.modelValue) ? props.modelValue : [])
const search = ref('')
const dropdownOpen = ref(false)

// ✅ تحديث عند تغير القيمة من الأب
watch(
  () => props.modelValue,
  (newVal) => {
    localValue.value = Array.isArray(newVal) ? newVal : []
  },
  { immediate: true }
)

// ✅ إرسال التحديث للأب
watch(localValue, (val) => {
  emit('update:modelValue', val)
})

const filteredList = computed(() => {
  return allergensList.filter(
    (item) =>
      item.includes(search.value) && !localValue.value.includes(item)
  )
})

function selectItem(item: string) {
  if (!localValue.value.includes(item)) {
    localValue.value.push(item)
  }
  search.value = ''
  dropdownOpen.value = false
}

function removeTag(tag: string) {
  localValue.value = localValue.value.filter((t) => t !== tag)
}
</script>


<style scoped>
.allergens-picker {
  position: relative;
  width: 100%;
}

.input-wrapper {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.3rem;
  background: #fff;
  cursor: text;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.tag {
  background: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
}

.tag button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.tags input {
  border: none;
  outline: none;
  flex: 1;
  min-width: 120px;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 0.2rem;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
}

.dropdown li {
  padding: 0.4rem;
  cursor: pointer;
}

.dropdown li:hover {
  background: #f5f5f5;
}
</style>
