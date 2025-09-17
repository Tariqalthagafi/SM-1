import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Product } from '@/types/contexts/Products'
import { indexedDBService } from '@/services/indexedDBService'
import { useOffersStore } from './offers'

const STORE_NAME = 'products'

// 🔹 دالة لتطبيع allergens إلى string[] عادية
function normalizeAllergens(value: unknown): string[] {
  if (Array.isArray(value)) return [...value].map(String)
  if (typeof value === 'string' && value.trim() !== '') return [value]
  return []
}

export const useProductsStore = defineStore('productsStore', () => {
  const products = ref<Product[]>([])
  const offersStore = useOffersStore()

  // 📌 تحميل المنتجات مع تطبيع allergens + إعادة حساب finalPrice
  async function load() {
    const all = await indexedDBService.getAll(STORE_NAME)
    products.value = all
      .map((p: Product) => {
        const offer = offersStore.offers.find(o => o.id === p.selectedOfferId)
        return {
          ...p,
          allergens: normalizeAllergens(p.allergens),
          finalPrice: offer
            ? offersStore.calculatePrice(p.basePrice ?? 0, offer)
            : (p.basePrice ?? 0)
        }
      })
      .sort((a, b) => a.order - b.order)
  }

  // 📌 إضافة منتج جديد
  async function addProduct(product: Product) {
    const normalized: Product = {
      ...product,
      id: product.id || crypto.randomUUID(),
      order: product.order ?? products.value.length,
      allergens: normalizeAllergens(product.allergens),
      basePrice: product.basePrice ?? 0,
      finalPrice: product.finalPrice ?? product.basePrice ?? 0,
      selectedOfferId: product.selectedOfferId ?? undefined,
      selectedOfferTitle: product.selectedOfferTitle ?? ''
    }
    await indexedDBService.put(STORE_NAME, normalized)
    products.value.push(normalized)
  }

  // 📌 تحديث منتج (دمج التغييرات + حساب السعر النهائي + حفظ اسم العرض)
  async function updateProduct(id: string, updates: Partial<Product>) {
    const index = products.value.findIndex(p => p.id === id)
    if (index === -1) return

    const existing = products.value[index]

    // إذا تغير العرض → نخزن اسمه
    if (updates.selectedOfferId !== undefined) {
      const offer = offersStore.offers.find(o => o.id === updates.selectedOfferId)
      updates.selectedOfferTitle = offer?.title || ''
    }

    // إذا تغير السعر الأساسي أو العرض → نحسب السعر النهائي
    if (updates.basePrice !== undefined || updates.selectedOfferId !== undefined) {
      const offer = offersStore.offers.find(
        o => o.id === (updates.selectedOfferId ?? existing.selectedOfferId)
      )
      updates.finalPrice = offer
        ? offersStore.calculatePrice(updates.basePrice ?? existing.basePrice ?? 0, offer)
        : (updates.basePrice ?? existing.basePrice ?? 0)
    }

    const merged: Product = {
      ...existing,
      ...updates,
      allergens: normalizeAllergens(updates.allergens ?? existing.allergens)
    }

    products.value[index] = merged
    await indexedDBService.put(STORE_NAME, JSON.parse(JSON.stringify(merged)))
  }

  // 📌 حذف منتج
  async function deleteProduct(id: string) {
    await indexedDBService.delete(STORE_NAME, id)
    products.value = products.value.filter(p => p.id !== id)
  }

  // 📌 إعادة ترتيب المنتجات
  async function moveProduct(from: number, to: number) {
    if (to < 0 || to >= products.value.length) return
    const temp = products.value[from]
    products.value.splice(from, 1)
    products.value.splice(to, 0, temp)

    await Promise.all(
      products.value.map((p, i) => {
        p.order = i
        return indexedDBService.put(STORE_NAME, p)
      })
    )
  }

  // 📌 حفظ الترتيب الجديد بعد السحب والإفلات
  async function saveOrder() {
    await Promise.all(
      products.value.map((p: Product, i: number) => {
        p.order = i
        return indexedDBService.put(STORE_NAME, p)
      })
    )
    products.value.sort((a: Product, b: Product) => a.order - b.order)
  }

  // 📌 حفظ منتج بدون إعادة تحميل
  async function directSave(product: Product) {
    await indexedDBService.put(STORE_NAME, product)
  }

  // 📌 تبديل حالة المنتج
  async function toggleProductStatus(id: string) {
    const product = products.value.find(p => p.id === id)
    if (!product) return

    product.status = product.status === 'visible' ? 'hidden' : 'visible'
    await indexedDBService.put(STORE_NAME, product)
  }

  // 📌 جلب منتج حسب ID
  function getProductById(id: string): Product | undefined {
    return products.value.find(p => p.id === id)
  }

  // 📌 إنشاء منتج فارغ
  function createEmptyProduct(): Product {
    return {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      calories: 0,
      allergens: [],
      imageBlob: undefined,
      order: products.value.length,
      status: 'visible',
      basePrice: 0,
      finalPrice: 0,
      selectedOfferId: undefined,
      selectedOfferTitle: ''
    }
  }

  // 📌 إعادة حساب finalPrice عند تغير العروض
  watch(
    () => offersStore.offers,
    () => {
      products.value = products.value.map(p => {
        const offer = offersStore.offers.find(o => o.id === p.selectedOfferId)
        return {
          ...p,
          finalPrice: offer
            ? offersStore.calculatePrice(p.basePrice ?? 0, offer)
            : (p.basePrice ?? 0)
        }
      })
    },
    { deep: true }
  )

  return {
    products,
    load,
    addProduct,
    updateProduct,
    deleteProduct,
    moveProduct,
    saveOrder,
    directSave,
    toggleProductStatus,
    getProductById,
    createEmptyProduct
  }
})
