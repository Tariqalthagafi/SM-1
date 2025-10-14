<template>
  <div class="social-page">
    <h2>📡 إعدادات التواصل والسوشيال ميديا</h2>

    <div class="social-group">
      <!-- ✅ بيانات أساسية -->
      <SocialField
        label="البريد الإلكتروني"
        :value="store.links.email.value"
        :isPublic="store.links.email.isPublic"
        placeholder="your@email.com"
        @update="(val: string) => store.updateLinkValue('email', val)"
        @toggle-visibility="() => store.toggleLinkVisibility('email')"
      />
      <SocialField
        label="رقم التواصل"
        :value="store.links.phone.value"
        :isPublic="store.links.phone.isPublic"
        placeholder="05xxxxxxxx"
        @update="(val: string) => store.updateLinkValue('phone', val)"
        @toggle-visibility="() => store.toggleLinkVisibility('phone')"
      />
      <SocialField
        label="الموقع الإلكتروني"
        :value="store.links.website.value"
        :isPublic="store.links.website.isPublic"
        placeholder="https://example.com"
        @update="(val: string) => store.updateLinkValue('website', val)"
        @toggle-visibility="() => store.toggleLinkVisibility('website')"
      />
      <SocialField
        label="الموقع الجغرافي"
        :value="store.links.location.value"
        :isPublic="store.links.location.isPublic"
        :placeholder="placeholders.location"
        @update="(val: string) => store.updateLinkValue('location', val)"
        @toggle-visibility="() => store.toggleLinkVisibility('location')"
      />

      <!-- ✅ منصات التواصل -->
      <template v-for="platform in platforms" :key="platform">
        <SocialField
          :label="labels[platform]"
          :value="store.links[platform].value"
          :isPublic="store.links[platform].isPublic"
          :placeholder="placeholders[platform]"
          @update="(val: string) => store.updateLinkValue(platform, val)"
          @toggle-visibility="() => store.toggleLinkVisibility(platform)"
        />
      </template>
    </div>
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
  whatsapp: 'WhatsApp',
  location: 'الموقع الجغرافي'
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
  whatsapp: 'رابط أو رقم واتساب',
  location: 'https://maps.google.com/?q=...'
}
</script>

<style scoped>
.social-page {
  padding: 2rem;
  background-color: #fff;
  border-radius: 0;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-family: 'Tajawal', sans-serif;
}

h2 {
  font-size: 1.6rem;
  font-weight: 600;
  color: #1C1C1C;
  border-bottom: 1px solid #E0E0E0;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

.social-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem 2rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #E0E0E0;
}


.social-field input {
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  background-color: #FFFFFF;
  color: #1C1C1C;
  width: 100%;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.social-field input:focus {
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
  outline: none;
}

</style>
