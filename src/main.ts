import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { i18n } from './i18n' // ✅ أضف هذا

// أدوات Vercel
import { injectSpeedInsights } from '@vercel/speed-insights'
import { inject } from "@vercel/analytics"
inject()
injectSpeedInsights()

// أيقونات
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { MdConnectwithoutcontact } from 'oh-vue-icons/icons/md'
import {
  FaPhone, FaWhatsapp, FaEnvelope, FaGlobe, FaMapMarkerAlt,
  FaInstagram, FaTwitter, FaFacebook, FaSnapchatGhost, FaTiktok,
  FaYoutube, FaConnectdevelop, FaCreditCard, FaTruck
} from 'oh-vue-icons/icons'

addIcons(
  FaPhone, FaWhatsapp, FaEnvelope, FaGlobe, FaMapMarkerAlt,
  FaInstagram, FaTwitter, FaFacebook, FaSnapchatGhost, FaTiktok,
  FaYoutube, MdConnectwithoutcontact, FaConnectdevelop, FaCreditCard, FaTruck
)

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(i18n) // ✅ فعل الترجمة

app.component('v-icon', OhVueIcon)

app.mount('#app')
