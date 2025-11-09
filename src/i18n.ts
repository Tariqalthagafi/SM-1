import { createI18n } from 'vue-i18n'
import ar from './data/ar.json'
import en from './data/en.json'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'ar',
  fallbackLocale: 'en',
  messages: {
    ar,
    en
  },
  messageResolver: undefined,
  modifiers: {}
})
