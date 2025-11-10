import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Product } from '@/types/contexts/products.ts'
import { indexedDBService } from '@/services/indexedDBService'
import { useOffersStore } from './offers.ts'
import { supabase } from '@/supabase'

const STORE_NAME = 'products'

function normalizeAllergens(value: unknown): string[] {
  if (Array.isArray(value)) return [...value].map(String)
  if (typeof value === 'string' && value.trim() !== '') return [value]
  return []
}

// 🔁 تحويل المفاتيح من camelCase إلى snake_case
function toSnakeCaseKeys(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key.replace(/([A-Z])/g, '_$1').toLowerCase(),
      value
    ])
  )
}

// ❌ فلترة الحقول غير المدعومة في Supabase
function filterSupabaseFields(obj: Record<string, any>): Record<string, any> {
  const excluded = ['imageBase64', 'imageBlob' , 'selectedOfferTitle']
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !excluded.includes(key))
  )
}

export const useProductsStore = defineStore('productsStore', () => {
  const products = ref<Product[]>([])
  const offersStore = useOffersStore()

  async function syncFromSupabase() {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) throw userError || new Error('لا يوجد مستخدم مسجل')

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('created_by', user.id)

    if (error) throw error

    for (const product of data) {
      await indexedDBService.put(STORE_NAME, product)
    }

    const all = await indexedDBService.getAll(STORE_NAME)
    products.value = all
      .map((p: Product) => {
        const offer = offersStore.offers.find(o => o.id === p.selected_offer_id)
        return {
          ...p,
          allergens: normalizeAllergens(p.allergens),
          final_price: offer
            ? offersStore.calculatePrice(p.base_price ?? 0, offer)
            : (p.base_price ?? 0)
        }
      })
      .sort((a, b) => a.sequ - b.sequ)
  }

  async function load() {
    const all = await indexedDBService.getAll(STORE_NAME)
    products.value = all
      .map((p: Product) => {
        const offer = offersStore.offers.find(o => o.id === p.selected_offer_id)
        return {
          ...p,
          allergens: normalizeAllergens(p.allergens),
          final_price: offer
            ? offersStore.calculatePrice(p.base_price ?? 0, offer)
            : (p.base_price ?? 0)
        }
      })
      .sort((a, b) => a.sequ - b.sequ)
  }

async function addProduct(product: Product) {
  console.log('📌 بدأ تنفيذ addProduct')

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    console.error('❌ فشل في جلب المستخدم:', userError)
    throw userError || new Error('لا يوجد مستخدم مسجل')
  }

  console.log('👤 المستخدم الحالي:', user)

  const normalized: Product = {
    ...product,
    id: product.id || crypto.randomUUID(),
    sequ: product.sequ ?? products.value.length,
    allergens: normalizeAllergens(product.allergens),
    base_price: product.base_price ?? 0,
    final_price: product.final_price ?? product.base_price ?? 0,
    selected_offer_id: product.selected_offer_id ?? undefined,
    selected_offer_title: product.selected_offer_title ?? '',
    created_by: user.id
  }

  console.log('📦 المنتج بعد التطبيع:', normalized)

  const safe = toSnakeCaseKeys(filterSupabaseFields(normalized))

  console.log('🚀 البيانات المرسلة إلى Supabase:', safe)

  const { data, error } = await supabase
    .from('products')
    .insert([safe])

  if (error) {
    console.error('❌ فشل الإدراج في Supabase:', error)
    throw error
  } else {
    console.log('✅ تم الإدراج في Supabase:', data)
  }

  await indexedDBService.put(STORE_NAME, normalized)
  products.value.push(normalized)
}


  async function updateProduct(id: string, updates: Partial<Product>) {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) throw userError || new Error('لا يوجد مستخدم مسجل')

    const index = products.value.findIndex(p => p.id === id)
    if (index === -1) return

    const existing = products.value[index]

    if (updates.selected_offer_id !== undefined) {
      const offer = offersStore.offers.find(o => o.id === updates.selected_offer_id)
      updates.selected_offer_title = offer?.title || ''
    }

    if (updates.base_price !== undefined || updates.selected_offer_id !== undefined) {
      const offer = offersStore.offers.find(
        o => o.id === (updates.selected_offer_id ?? existing.selected_offer_id)
      )
      updates.final_price = offer
        ? offersStore.calculatePrice(updates.base_price ?? existing.base_price ?? 0, offer)
        : (updates.base_price ?? existing.base_price ?? 0)
    }

    const merged: Product = {
      ...existing,
      ...updates,
      allergens: normalizeAllergens(updates.allergens ?? existing.allergens)
    }

    const safe = toSnakeCaseKeys(filterSupabaseFields(updates))

    const { error } = await supabase
      .from('products')
      .update(safe)
      .eq('id', id)
      .eq('created_by', user.id)

    if (error) throw error

    products.value[index] = merged
    await indexedDBService.put(STORE_NAME, JSON.parse(JSON.stringify(merged)))
  }

  async function deleteProduct(id: string) {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) throw userError || new Error('لا يوجد مستخدم مسجل')

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      .eq('created_by', user.id)

    if (error) throw error

    await indexedDBService.delete(STORE_NAME, id)
    products.value = products.value.filter(p => p.id !== id)
  }

  async function moveProduct(from: number, to: number) {
    if (to < 0 || to >= products.value.length) return
    const temp = products.value[from]
    products.value.splice(from, 1)
    products.value.splice(to, 0, temp)

    await Promise.all(
      products.value.map((p, i) => {
        p.sequ = i
        return indexedDBService.put(STORE_NAME, p)
      })
    )
  }

  async function saveOrder() {
    await Promise.all(
      products.value.map((p: Product, i: number) => {
        p.sequ = i
        return indexedDBService.put(STORE_NAME, p)
      })
    )
    products.value.sort((a: Product, b: Product) => a.sequ - b.sequ)
  }

  async function directSave(product: Product) {
    await indexedDBService.put(STORE_NAME, product)
  }

  async function toggleProductStatus(id: string) {
    const product = products.value.find(p => p.id === id)
    if (!product) return

    product.status = product.status === 'visible' ? 'hidden' : 'visible'
    await indexedDBService.put(STORE_NAME, product)
  }

  function getProductById(id: string): Product | undefined {
    return products.value.find(p => p.id === id)
  }

  function createEmptyProduct(): Product {
    return {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      calories: 0,
      allergens: [],
      image_base64: '',
      sequ: products.value.length,
      status: 'visible',
      base_price: 0,
      final_price: 0,
      selected_offer_id: undefined,
      selected_offer_title: ''
    }
  }

async function uploadProductImage(file: File, productId: string): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const filePath = `${productId}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    })

  if (uploadError) throw uploadError

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath)

  const imageUrl = data.publicUrl

  // ✅ تحديث المنتج في Supabase بالرابط
  await updateProduct(productId, { image_url: imageUrl })

  return imageUrl
}

  watch(
    () => offersStore.offers,
    () => {
      products.value = products.value.map(p => {
        const offer = offersStore.offers.find(o => o.id === p.selected_offer_id)
        return {
          ...p,
          final_price: offer
            ? offersStore.calculatePrice(p.base_price ?? 0, offer)
            : (p.base_price ?? 0)
        }
      })
    },
    { deep: true }
  )

  return {
    products,
    syncFromSupabase,
    load,
    addProduct,
    updateProduct,
    deleteProduct,
    moveProduct,
    saveOrder,
    directSave,
    toggleProductStatus,
    getProductById,
    createEmptyProduct,
    uploadProductImage

  }
})
