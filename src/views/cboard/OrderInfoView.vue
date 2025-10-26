<template>
  <div class="order-info-editor">
    <OperatingHoursEditor />
    <DeliveryMethodsEditor />
    <PaymentMethodsEditor />
  </div>
</template>

<script setup lang="ts">
import { useOrderInfoStore } from '@/stores/cboard/OrderInfo'
import { onMounted } from 'vue'
import OperatingHoursEditor from '@/components/cboard/OrderInfo/OperatingHoursEditor.vue'
import DeliveryMethodsEditor from '@/components/cboard/OrderInfo/DeliveryMethodsEditor.vue'
import PaymentMethodsEditor from '@/components/cboard/OrderInfo/PaymentMethodsEditor.vue'

const store = useOrderInfoStore()
onMounted(() => {
  store.load()
})
</script>


<style scoped>
.order-info-editor {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  font-family: var(--font-family, 'Tajawal');
  background-color: var(--background-bg, #fff);
  color: var(--titleText-color, #000);
}
</style>
