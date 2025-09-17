<template>
  <div class="social-page">
    <h2>📡 إعدادات التواصل والسوشيال ميديا</h2>

    <SocialGroup title="بيانات التواصل">
      <SocialField
        label="البريد الإلكتروني"
        :value="store.links.email.value"
        :isPublic="store.links.email.isPublic"
        placeholder="your@email.com"
        @update="val => store.updateLinkValue('email', val)"
        @toggle-visibility="() => store.toggleLinkVisibility('email')"
      />
      <SocialField
        label="رقم التواصل"
        :value="store.links.phone.value"
        :isPublic="store.links.phone.isPublic"
        placeholder="05xxxxxxxx"
        @update="val => store.updateLinkValue('phone', val)"
        @toggle-visibility="() => store.toggleLinkVisibility('phone')"
      />
      <SocialField
        label="الموقع الإلكتروني"
        :value="store.links.website.value"
        :isPublic="store.links.website.isPublic"
        placeholder="https://example.com"
        @update="val => store.updateLinkValue('website', val)"
        @toggle-visibility="() => store.toggleLinkVisibility('website')"
      />
    </SocialGroup>

    <SocialGroup title="منصات التواصل الاجتماعي">
      <template v-for="platform in platforms" :key="platform">
        <SocialField
          :label="labels[platform]"
          :value="store.links[platform].value"
          :isPublic="store.links[platform].isPublic"
          :placeholder="placeholders[platform]"
          @update="val => store.updateLinkValue(platform, val)"
          @toggle-visibility="() => store.toggleLinkVisibility(platform)"
        />
      </template>
    </SocialGroup>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSocialStore } from '@/stores/cboard/Social'
import SocialField from '@/components/cboard/Social/SocialField.vue'
import SocialGroup from '@/components/cboard/Social/SocialGroup.vue'
import type { SocialKey } from '@/types/contexts/Social'

const store = useSocialStore()

onMounted(() => {
  store.load()
})

const platforms: SocialKey[] = [
  'instagram',
  'twitter',
  'facebook',
  'snapchat',
  'tiktok',
  'youtube',
  'whatsapp'
]

const labels: Record<SocialKey, string> = {
  email: 'Email',
  phone: 'Phone',
  website: 'Website',
  instagram: 'Instagram',
  twitter: 'Twitter',
  facebook: 'Facebook',
  snapchat: 'Snapchat',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  whatsapp: 'WhatsApp'
}

const placeholders: Record<SocialKey, string> = {
  email: 'your@email.com',
  phone: '05xxxxxxxx',
  website: 'https://example.com',
  instagram: '@yourname',
  twitter: '@yourname',
  facebook: 'رابط الصفحة أو اسم المستخدم',
  snapchat: 'yourname',
  tiktok: '@yourname',
  youtube: 'رابط القناة أو اسم المستخدم',
  whatsapp: 'رابط أو رقم واتساب'
}
</script>

<style scoped>
.social-page {
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}

h2 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}

.social-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  margin-bottom: 2rem;
}
</style>
