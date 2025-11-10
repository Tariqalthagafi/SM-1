// 📁 src/types/contexts/colorPresets.ts

export type ColorPreset = {
  primary: string
  secondary: string
  background: string
  text: string
}

export const colorPresets = {
  صحراوي: {
    primary: '#C2B280',       // بيج رملي
    secondary: '#8B6F47',     // بني دافئ
    background: '#F5F0E1',    // خلفية فاتحة ترابية
    text: '#3E2F1C'           // بني غامق للنص
  },
  بحري: {
    primary: '#0077B6',       // أزرق عميق
    secondary: '#00B4D8',     // تركواز منعش
    background: '#CAF0F8',    // خلفية مائية فاتحة
    text: '#03045E'           // أزرق داكن للنص
  },
  عصري: {
    primary: '#FF6B6B',       // وردي حيوي
    secondary: '#FFE66D',     // أصفر مشرق
    background: '#F7FFF7',    // خلفية بيضاء ناعمة
    text: '#1A535C'           // أزرق رمادي للنص
  },
  كلاسيكي: {
    primary: '#4B3F72',       // بنفسجي ملكي
    secondary: '#D2B4DE',     // بنفسجي فاتح
    background: '#FDFEFE',    // أبيض نقي
    text: '#2C3E50'           // رمادي غامق للنص
  },
  خشبي: {
    primary: '#6F4E37',       // بني قهوة
    secondary: '#A47551',     // بني فاتح
    background: '#FAF3E0',    // خلفية كريمية
    text: '#3E2C23'           // بني داكن للنص
  },
   'مخصص 1': {
    primary: '#FF7A00',
    secondary: '#999999',
    background: '#FFFFFF',
    text: '#000000'
  },
  'مخصص 2': {
    primary: '#00A8E8',
    secondary: '#007EA7',
    background: '#F0F8FF',
    text: '#002B5B'
  },
  'مخصص 3': {
    primary: '#FFB703',
    secondary: '#FB8500',
    background: '#FFF8E1',
    text: '#333333'
  },
  'مخصص 4': {
    primary: '#6A4C93',
    secondary: '#9D4EDD',
    background: '#F3F0FF',
    text: '#2B2D42'
  },
  'مخصص 5': {
    primary: '#2EC4B6',
    secondary: '#CBF3F0',
    background: '#E0FBFC',
    text: '#1B1B1E'
  },
  'مخصص 6': {
    primary: '#EF476F',
    secondary: '#FFD166',
    background: '#FFF1F1',
    text: '#2F2F2F'
  },
  'مخصص 7': {
    primary: '#118AB2',
    secondary: '#06D6A0',
    background: '#E8F9F1',
    text: '#073B4C'
  },
  'مخصص 8': {
    primary: '#F72585',
    secondary: '#B5179E',
    background: '#FDE2FF',
    text: '#3A0CA3'
  },
  'مخصص 9': {
    primary: '#FF9F1C',
    secondary: '#FFBF69',
    background: '#FFF3E0',
    text: '#2E2E2E'
  },
  'مخصص 10': {
    primary: '#8338EC',
    secondary: '#3A86FF',
    background: '#E0E0FF',
    text: '#1A1A1A'
  },
} as const

export type ColorPresetName = keyof typeof colorPresets
