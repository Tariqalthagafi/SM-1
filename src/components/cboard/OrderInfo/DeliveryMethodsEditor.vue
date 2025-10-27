<template>
  <section class="info-section" v-if="isReady">
    <h3>طرق استلام الطلب</h3>
    <div class="methods-grid">
      <div
        class="method-card"
        v-for="method in typedDeliveryMethods"
        :key="method.name"
      >
<div class="method-icon">
  <img
    v-if="isImage(method.icon)"
    :src="`/icons/delivery/${method.icon}`"
    class="svg-icon"
    :alt="method.name"
  />
  <span v-else>{{ method.icon }}</span>
</div>
        <div class="method-name">{{ method.name }}</div>
        <label class="switch">
          <input type="checkbox" v-model="method.enabled" />
          <span class="slider"></span>
        </label>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { ref, watch, toRaw, onMounted } from 'vue'
import { useOrderInfoStore } from '@/stores/OrderInfo'
import { indexedDBService } from '@/services/indexedDBService'
import type { DeliveryMethod } from '@/types/contexts/OrderInfo'

const store = useOrderInfoStore()
const typedDeliveryMethods = store.deliveryMethods as DeliveryMethod[]
const isReady = ref(false)
function isImage(filename: string): boolean {
  return /\.(svg|png|webp)$/i.test(filename)
}

onMounted(async () => {
  const saved = await indexedDBService.getOrderMethods('default')
  const savedMap = new Map<string, boolean>(
    (saved?.methods ?? []).map((m: DeliveryMethod) => [m.name, m.enabled])
  )

  typedDeliveryMethods.forEach(method => {
    method.enabled = savedMap.get(method.name) ?? method.enabled
  })

  isReady.value = true
})

watch(typedDeliveryMethods, () => {
  indexedDBService.saveOrderMethods(toRaw(store.deliveryMethods), 'default')
}, { deep: true })

</script>


<style scoped>
.info-section h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--sectionTitle-color, #000);
  border-bottom: 1px solid var(--sectionTitle-color, #000);
  padding-bottom: 0.3rem;
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
}

.method-card {
  background: #fff;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Tajawal', sans-serif;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease;
}

.method-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.method-icon {
  font-size: 1.6rem;
}

.method-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: #1C1C1C;
  text-align: center;
}

/* ✅ زر التبديل */
.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0;
  right: 0; bottom: 0;
  background-color: #ccc;
  border-radius: 20px;
  transition: 0.3s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: 0.3s;
}

input:checked + .slider {
  background-color: #FF7A00;
}

input:checked + .slider:before {
  transform: translateX(16px);
}
.svg-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  display: block;
}

</style>
