import { classicGold } from './definitions/classicGold.ts'
import { modernBlue } from './definitions/modernBlue.ts'
import { minimalBlack } from './definitions/minimalBlack.ts'
import { cafeBrown } from './definitions/cafeBrown.ts'
import { freshGreen } from './definitions/freshGreen.ts'
// لاحقًا نضيف باقي القوالب هنا

import type { TemplateConfig } from '@/types/contexts/templates.ts'

export const menuTemplates: Record<string, TemplateConfig> = {
  [classicGold.id]: classicGold,
  [modernBlue.id]: modernBlue,
  [minimalBlack.id]: minimalBlack,
  [cafeBrown.id]: cafeBrown,
  [freshGreen.id]: freshGreen,
}





