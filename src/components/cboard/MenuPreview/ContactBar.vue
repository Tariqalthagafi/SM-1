<template>
  <div class="top-contact-bar">
    <SocialContactButton position="none" />
    <PaymentContactButton position="none" />
    <DeliveryContactButton position="none" />
  </div>
</template>

<script setup lang="ts">
import SocialContactButton from '@/components/cboard/Social/SocialContactButton.vue'
import DeliveryContactButton from '@/components/cboard/OrderInfo/DeliveryContactButton.vue'
import PaymentContactButton from '@/components/cboard/OrderInfo/PaymentContactButton.vue'
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
