<template>
  <div class="social-page">
    <h2>{{ t('cboard.social.title') }}</h2>


    <div class="social-group">
      <EmailField />
      <PhoneField />
      <WebsiteField />
      <InstagramField />
      <TwitterField />
      <FacebookField />
      <SnapchatField />
      <TiktokField />
      <YoutubeField />
      <WhatsappField />
      <LocationField />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { use_social_store } from '@/stores/cboard/social'

import EmailField from '@/components/cboard/Social/EmailField.vue'
import PhoneField from '@/components/cboard/Social/PhoneField.vue'
import WebsiteField from '@/components/cboard/Social/WebsiteField.vue'
import InstagramField from '@/components/cboard/Social/InstagramField.vue'
import TwitterField from '@/components/cboard/Social/TwitterField.vue'
import FacebookField from '@/components/cboard/Social/FacebookField.vue'
import SnapchatField from '@/components/cboard/Social/SnapchatField.vue'
import TiktokField from '@/components/cboard/Social/TiktokField.vue'
import YoutubeField from '@/components/cboard/Social/YoutubeField.vue'
import WhatsappField from '@/components/cboard/Social/WhatsappField.vue'
import LocationField from '@/components/cboard/Social/LocationField.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const store = use_social_store()

onMounted(async () => {
  await store.fetch_user_id()
  await store.load()
})
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
</style>
