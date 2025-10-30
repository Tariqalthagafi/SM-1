// 📁 المسار: src/stores/cboard/templates/imageShapeStore.ts

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { indexedDBService } from '@/services/indexedDBService'
import type { ImageShape } from '@/types/contexts/templates'

export const useImageShapeStore = defineStore('imageShapeStore', () => {
  const imageShape = ref<ImageShape>('circle') // القيمة الافتراضية
  const imageShapeOptions = ref<{ value: ImageShape; label?: string }[]>([])

  function setImageShape(shape: ImageShape) {
    imageShape.value = shape
  }

  async function loadImageShape() {
    const saved = await indexedDBService.getSetting('imageShape')
    if (typeof saved === 'string' && imageShapeOptions.value.find(o => o.value === saved)) {
      imageShape.value = saved as ImageShape
    }
  }

  async function saveImageShape() {
    await indexedDBService.saveSetting('imageShape', imageShape.value)
  }

async function seedImageShapeOptions() {
  const existing = await indexedDBService.getOptions('imageShape')
  if (existing.length > 0) return

  const seedOptions = [
    {
      id: 'imageShape-circle',
      key: 'imageShape',
      value: 'circle',
      label: 'دائري',
      type: 'string',
      context: 'template',
      group: 'imageShape',
      is_active: true
    },
    {
      id: 'imageShape-roundedSquare',
      key: 'imageShape',
      value: 'roundedSquare',
      label: 'مربع بحواف ناعمة',
      type: 'string',
      context: 'template',
      group: 'imageShape',
      is_active: true
    },
    {
      id: 'imageShape-rectangle',
      key: 'imageShape',
      value: 'rectangle',
      label: 'مستطيل أفقي',
      type: 'string',
      context: 'template',
      group: 'imageShape',
      is_active: true
    },
    {
      id: 'imageShape-hidden',
      key: 'imageShape',
      value: 'hidden',
      label: 'بدون صورة',
      type: 'string',
      context: 'template',
      group: 'imageShape',
      is_active: true
    }
  ]

  for (const option of seedOptions) {
    await indexedDBService.saveOption(option)
  }
}


  async function initImageShapeOptions() {
    await seedImageShapeOptions()
    imageShapeOptions.value = await indexedDBService.getOptions('imageShape')
    await loadImageShape()
    if (!imageShapeOptions.value.find(o => o.value === imageShape.value)) {
      imageShape.value = imageShapeOptions.value[0]?.value || 'circle'
    }
  }

  function resetImageShape() {
    imageShape.value = 'circle'
  }

  return {
    imageShape,
    imageShapeOptions,
    setImageShape,
    loadImageShape,
    saveImageShape,
    initImageShapeOptions,
    resetImageShape
  }
})
