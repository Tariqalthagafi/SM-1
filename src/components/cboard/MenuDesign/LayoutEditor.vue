<template>
  <div class="layout-editor">
    <h5>{{ t('اختيار النموذج') }}</h5>
    <select v-model="selectedLayout">
      <option
        v-for="layout in layoutOptions"
        :key="layout.value"
        :value="layout.value"
      >
        {{ layout.label || t(`layouts.${layout.value}`) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/translations'
import { computed, onMounted } from 'vue'
import { useLayoutEditorStore } from '@/stores/cboard/MenuDesign/LayoutEditor'
import type { MenuLayout } from '@/types/contexts/MenuDesign'

const store = useLayoutEditorStore()

onMounted(() => {
  store.loadLayout()
})

const selectedLayout = computed({
  get: () => store.layout,
  set: (val: MenuLayout) => {
    store.setLayout(val)
    store.saveLayout()
  }
})

const layoutOptions: { value: MenuLayout; label?: string }[] = [
  { value: 'vertical', label: 'عمودي' },
  { value: 'grid', label: 'شبكي' },
  { value: 'cards', label: 'بطاقات' },
  { value: 'sectioned', label: 'عرض بالقسم' }
]
</script>

<style scoped>
.layout-editor {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

select {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
}
</style>
