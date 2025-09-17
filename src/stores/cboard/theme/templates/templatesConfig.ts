import { classicGold } from './definitions/classicGold'
import { modernBlue } from './definitions/modernBlue'
import { minimalBlack } from './definitions/minimalBlack'
import { cafeBrown } from './definitions/cafeBrown'
import { freshGreen } from './definitions/freshGreen'
// لاحقًا نضيف باقي القوالب هنا

import type { TemplateConfig } from '@/types/contexts/templates'

export const menuTemplates: Record<string, TemplateConfig> = {
  [classicGold.id]: classicGold,
  [modernBlue.id]: modernBlue,
  [minimalBlack.id]: minimalBlack,
  [cafeBrown.id]: cafeBrown,
  [freshGreen.id]: freshGreen,
}





