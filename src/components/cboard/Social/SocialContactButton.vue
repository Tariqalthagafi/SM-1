<template>
  <div class="contact-button-container none">
    <button
      class="main-contact-btn"
      @click="isPopoverOpen = !isPopoverOpen"
      :style="{ backgroundColor: props.colors.topIconsBackground }"
    >
      <v-icon name="fa-phone" />
    </button>

    <div v-if="isPopoverOpen" class="contact-popover">
      <h6 class="popover-title">تواصل معنا</h6>
      <div class="social-links">
        <a
          v-for="link in filteredLinks"
          :key="link.key"
          :href="getLinkUrl(link.key, link.value)"
          target="_blank"
          class="social-link-item icon-only"
          @click="isPopoverOpen = false"
          :title="link.name"
        >
          <span class="icon-wrapper white-bg">
            <img
              :src="`/icons/social/${link.icon}`"
              class="svg-icon"
              :alt="link.name"
            />
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { use_social_store } from '@/stores/cboard/social.ts'
import type { social_key } from '@/types/contexts/social.ts'

const props = defineProps<{
  position: 'bottom-center' | 'bottom-right' | 'top-right' | 'top-center' | 'none'
  colors: Record<string, string>
}>()

const socialStore = use_social_store()
const isPopoverOpen = ref(false)

onMounted(() => {
  socialStore.load()
})

// دالة آمنة للوصول إلى الرابط حسب المفتاح
function getLink(key: social_key) {
  return socialStore.fields.find(link => link.key === key)
}


// قائمة الروابط العامة فقط
const filteredLinks = computed(() => {
  return socialMap
    .map(mapItem => {
      const linkData = getLink(mapItem.key)
      if (linkData?.is_public && linkData.value) {
        return {
          ...mapItem,
          value: linkData.value
        }
      }
      return null
    })
    .filter((link): link is { key: social_key; name: string; color: string; icon: string; value: string } => link !== null)
})

// توليد الرابط المناسب حسب نوع الخدمة
function getLinkUrl(key: social_key, value: string): string {
  switch (key) {
    case 'phone':
      return `tel:${value}`
    case 'whatsapp':
      return `https://wa.me/${value.replace(/[^0-9]/g, '')}`
    case 'email':
      return `mailto:${value}`
    case 'location':
      return value.startsWith('http') ? value : `https://maps.google.com/?q=${encodeURIComponent(value)}`
    case 'website':
      return value.startsWith('http') ? value : `https://${value}`
    default:
      return value
  }
}

// تعريف المنصات المدعومة
const socialMap: { key: social_key; name: string; color: string; icon: string }[] = [
  { key: 'phone', name: 'اتصال هاتفي', color: '#34A853', icon: 'mobile-icon.svg' },
  { key: 'whatsapp', name: 'واتساب', color: '#25D366', icon: 'whatsapp-icon.svg' },
  { key: 'email', name: 'بريد إلكتروني', color: '#EA4335', icon: 'email-icon.svg' },
  { key: 'website', name: 'الموقع الإلكتروني', color: '#007bff', icon: 'website-icon.svg' },
  { key: 'location', name: 'الموقع', color: '#4285F4', icon: 'maps-icon.svg' },
  { key: 'instagram', name: 'إنستجرام', color: '#E1306C', icon: 'instagram-icon.svg' },
  { key: 'twitter', name: 'تويتر (X)', color: '#000000', icon: 'x-icon.svg' },
  { key: 'facebook', name: 'فيسبوك', color: '#1877F2', icon: 'facebook-icon.svg' },
  { key: 'snapchat', name: 'سناب شات', color: '#FFFC00', icon: 'snapchat-icon.svg' },
  { key: 'tiktok', name: 'تيك توك', color: '#000000', icon: 'tiktok-icon.svg' },
  { key: 'youtube', name: 'يوتيوب', color: '#FF0000', icon: 'youtube-icon.svg' }
]
</script>

<style scoped>
.contact-button-container {
  position: static;
  display: flex;
  align-items: center;
  justify-content: center;
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
}

.popover-title {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
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

.icon-wrapper :deep(.v-icon) {
  font-size: 1.25rem;
}

@keyframes pop-in {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.contact-button-container.none {
  position: static;
}

.svg-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  display: block;
}
</style>
