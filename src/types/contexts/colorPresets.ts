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
  }
} as const

export type ColorPresetName = keyof typeof colorPresets
