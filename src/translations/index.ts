import ar from './ar'

// تعريف كائن اللغات
const languages = {
  ar
}

// استخراج نوع المفاتيح من الكائن (هنا: "ar")
type LanguageKey = keyof typeof languages

// اللغة الحالية (مضمونة أنها من المفاتيح الموجودة)
let currentLang: LanguageKey = 'ar'

// دالة الترجمة
export function t(path: string): string {
  const keys = path.split('.')
  let result: any = languages[currentLang]
  for (const key of keys) {
    result = result?.[key]
    if (!result) return path // fallback إذا ما وجدنا الترجمة
  }
  return result
}
