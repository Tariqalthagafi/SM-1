<template>
  <div class="page-wrapper">
    <div class="order-dashboard">
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="tab-content">
        <component :is="activeTabComponent" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useOrderInfoStore } from '@/stores/cboard/orderInfo1'
import OperatingHoursEditor from '@/components/cboard/OrderInfo/OperatingHoursEditor.vue'
import DeliveryMethodsEditor from '@/components/cboard/OrderInfo/DeliveryMethodsEditor.vue'
import PaymentMethodsEditor from '@/components/cboard/OrderInfo/PaymentMethodsEditor.vue'

const store = useOrderInfoStore()
onMounted(() => {
  store.load()
})

const tabs = [
  { key: 'hours', label: 'ساعات العمل', component: OperatingHoursEditor },
  { key: 'delivery', label: 'طرق التوصيل', component: DeliveryMethodsEditor },
  { key: 'payment', label: 'طرق الدفع', component: PaymentMethodsEditor }
]

const activeTab = ref('hours')

const activeTabComponent = computed(() => {
  const tab = tabs.find(t => t.key === activeTab.value)
  return tab?.component ?? null
})
</script>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: max-content;
  padding: 2rem 1rem;
  background-color: #FFFFFF;
  overflow-x: hidden;
}

.order-dashboard {
  width: 100%;
  max-width: 1000px;
  display: grid;
  row-gap: 2rem;
  padding: 0;
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
  box-sizing: border-box;
}

/* ✅ أزرار التبويب */
.tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tabs button {
  padding: 0.6rem 1rem;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.tabs button.active {
  background-color: #FF7A00;
  color: #fff;
  border-color: #FF7A00;
}

/* ✅ محتوى التبويب */
.tab-content {
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

/* دعم الجوال */
@media (max-width: 768px) {
  .order-dashboard {
    padding: 1rem;
    border-radius: 0;
  }
}
</style>