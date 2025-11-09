<template>
  <div
    class="allergens-picker"
    ref="wrapper"
    tabindex="0"
    @focusout="handleFocusOut"
  >
    <div class="input-wrapper" @click="dropdownOpen = true">
      <div class="tags">
        <span v-for="tag in localValue" :key="tag" class="tag">
          {{ tag }}
          <button type="button" @click.stop="removeTag(tag)">×</button>
        </span>
        <input
          type="text"
          v-model="search"
          :placeholder="t('cboard.products.picker.placeholder')"
          @focus="dropdownOpen = true"
        />
      </div>
    </div>

    <ul v-if="dropdownOpen && filteredList.length" class="dropdown">
      <li
        v-for="item in filteredList"
        :key="item"
        @mousedown.prevent
        @click="selectItem(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t , tm } = useI18n()

const allergensList = computed(() => {
  const raw = tm('cboard.products.picker.allergens') as unknown
  return Array.isArray(raw) ? raw as string[] : []
})


const props = defineProps<{ modelValue?: string[] }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string[]): void }>()

const localValue = ref<string[]>(Array.isArray(props.modelValue) ? [...props.modelValue] : [])
const search = ref('')
const dropdownOpen = ref(false)
const wrapper = ref<HTMLElement | null>(null)

watch(
  () => props.modelValue,
  (newVal) => {
    if (JSON.stringify(newVal) !== JSON.stringify(localValue.value)) {
      localValue.value = Array.isArray(newVal) ? [...newVal] : []
    }
  },
  { immediate: true }
)

const filteredList = computed(() => {
  return allergensList.value.filter(
    (item) =>
      item.includes(search.value) && !localValue.value.includes(item)
  )
})


function selectItem(item: string) {
  if (!localValue.value.includes(item)) {
    localValue.value.push(item)
    emit('update:modelValue', [...localValue.value])
  }
  search.value = ''
  dropdownOpen.value = false
}

function removeTag(tag: string) {
  localValue.value = localValue.value.filter((t) => t !== tag)
  emit('update:modelValue', [...localValue.value])
}

function handleFocusOut() {
  setTimeout(() => {
    dropdownOpen.value = false
  }, 100)
}
</script>

<style scoped>
.allergens-picker {
  position: relative;
  width: 100%;
  outline: none;
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
  align-items: center;
}

.tag {
  background: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  white-space: nowrap;
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
  width: auto;
  min-width: 60px;
  max-width: 100%;
  flex-grow: 1;
  font-size: 0.85rem;
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
  font-size: 0.85rem;
}

.dropdown li:hover {
  background: #f5f5f5;
}
</style>
