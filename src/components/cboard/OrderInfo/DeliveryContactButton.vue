<template>
  <div class="contact-button-container none" ref="containerRef">
    <button
      class="main-contact-btn"
      @click="togglePopover"
      :style="{ backgroundColor: props.colors.topIconsBackground }"
    >
      <v-icon name="fa-truck" />
    </button>

    <div v-if="isOpen" class="contact-popover">
      <h6 class="popover-title">طرق التوصيل</h6>

      <div v-if="activeMethods.length" class="social-links">
        <div
          v-for="method in activeMethods"
          :key="method.name"
          class="social-link-item"
          :title="method.name"
          @click="isOpen = false"
        >
          <span class="icon-wrapper white-bg">
            <img
              v-if="isImage(method.icon)"
              :src="`/icons/delivery/${method.icon}`"
              class="svg-icon"
              :alt="method.name"
            />
            <span v-else class="text-icon">{{ method.icon || '🚚' }}</span>
          </span>
        </div>
      </div>

      <p v-else class="empty-message">لا توجد طرق توصيل مفعّلة</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useDeliveryMethodsStore } from '@/stores/cboard/orderInfo/deliveryMethodsStore.ts'
import { storeToRefs } from 'pinia'

const props = defineProps<{ colors: Record<string, string> }>()

const store = useDeliveryMethodsStore()
const { deliveryMethods } = storeToRefs(store)

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

function togglePopover() {
  isOpen.value = !isOpen.value
}

function handleClickOutside(event: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

function isImage(filename: string): boolean {
  return /\.(svg|png|webp)$/i.test(filename)
}

const activeMethods = computed(() =>
  deliveryMethods.value.filter(method => method.enabled && method.name)
)
</script>

<style scoped>
.contact-button-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-button-container.none {
  position: static;
}

.main-contact-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #b36e15;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;
}

.main-contact-btn:hover {
  transform: scale(1.05);
}

.main-contact-btn :deep(.v-icon) {
  font-size: 1.5rem;
  color: white;
}

.contact-popover {
  position: absolute;
  top: 65px;
  left: 50%;
  transform: translateX(-50%);
  width: 250px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  padding: 10px;
  animation: pop-in 0.3s ease-out;
  z-index: 1000;
}

.popover-title {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  text-align: center;
}

.social-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(45px, 1fr));
  gap: 10px;
}

.social-link-item {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;
}

.social-link-item:hover {
  transform: scale(1.1);
}

.icon-wrapper {
  background: white;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
}

.text-icon {
  font-size: 1.2rem;
  font-weight: bold;
  color: #34A853;
}

.empty-message {
  text-align: center;
  font-size: 0.85rem;
  color: #999;
  margin-top: 0.5rem;
}

.svg-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  display: block;
}

@keyframes pop-in {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
