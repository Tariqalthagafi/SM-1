<template>
  <div class="top-contact-bar" ref="barRef">
    <SocialContactButton
      position="none"
      :colors="colors"
      :active="activeButton === 'social'"
      @toggle="toggle('social')"
    />
    <PaymentContactButton
      position="none"
      :colors="colors"
      :active="activeButton === 'payment'"
      @toggle="toggle('payment')"
    />
    <DeliveryContactButton
      position="none"
      :colors="colors"
      :active="activeButton === 'delivery'"
      @toggle="toggle('delivery')"
    />
    <OperatingHoursButton
      position="none"
      :colors="colors"
      :active="activeButton === 'hours'"
      @toggle="toggle('hours')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SocialContactButton from '@/components/cboard/Social/SocialContactButton.vue'
import DeliveryContactButton from '@/components/cboard/OrderInfo/DeliveryContactButton.vue'
import PaymentContactButton from '@/components/cboard/OrderInfo/PaymentContactButton.vue'
import OperatingHoursButton from '@/components/cboard/OrderInfo/OperatingHoursButton.vue'

const props = defineProps<{ colors: Record<string, string> }>()

const activeButton = ref<string | null>(null)
const barRef = ref<HTMLElement | null>(null)

function toggle(name: string) {
  activeButton.value = activeButton.value === name ? null : name
}

function handleClickOutside(event: MouseEvent) {
  if (barRef.value && !barRef.value.contains(event.target as Node)) {
    activeButton.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>


<style scoped>
.top-contact-bar {
  display: flex;
  flex-direction: row; /* ✅ أفقي */
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #eee;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}

@media (max-width: 600px) {
  .top-contact-bar {
    flex-direction: column;
    gap: 0.5rem;
  }
}

</style>
