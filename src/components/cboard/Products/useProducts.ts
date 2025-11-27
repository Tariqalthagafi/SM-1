// src/components/cboard/Products/useProducts.ts
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
import type { Product } from '@/types/contexts/products1.ts'

const products = ref<Product[]>([])
const userId = ref<string>('')

async function loadProducts() {
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError) {
    console.error('❌ خطأ في جلب المستخدم:', userError.message)
    return
  }

  userId.value = userData?.user?.id ?? ''

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', userId.value)

  if (error) {
    console.error('❌ خطأ في تحميل المنتجات:', error.message)
  } else {
    products.value = (data ?? []) as Product[]
  }
}

/**
 * ✅ إضافة منتج جديد بكامل الحقول
 */
async function addProduct(product: Partial<Product>) {
  const newProduct: Product = {
    id: crypto.randomUUID(),
    user_id: userId.value,
    name: product.name ?? '',
    description: product.description ?? '',
    calories: product.calories ?? 0,
    allergens: product.allergens ?? [],
    has_allergens: (product.allergens?.length ?? 0) > 0,
    image_url: product.image_url ?? '',
    image_base64: product.image_base64 ?? '',
    base_price: product.base_price ?? 0,
    final_price: product.final_price ?? product.base_price ?? 0,
    sequ: products.value.length,
    status: product.status ?? 'visible',
    section_id: product.section_id ?? null,
    section_name: product.section_name ?? null,
    selected_offer_id: product.selected_offer_id ?? null,
    selected_offer_title: product.selected_offer_title ?? null,
    
  }

  const { data, error } = await supabase
    .from('products')
    .insert(newProduct)
    .select()

  if (error) {
    console.error('❌ خطأ في الإضافة:', error.message)
  } else if (data) {
    products.value.push(...(data as Product[]))
  }
}

async function updateProduct(id: string, updates: Partial<Product>) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userId.value)
    .select()

  if (error) {
    console.error('❌ خطأ في التحديث:', error.message)
  } else if (data) {
    const idx = products.value.findIndex((p: Product) => p.id === id)
    if (idx !== -1) products.value[idx] = data[0] as Product
  }
}

async function deleteProduct(id: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
    .eq('user_id', userId.value)

  if (error) {
    console.error('❌ خطأ في الحذف:', error.message)
  } else {
    products.value = products.value.filter((p: Product) => p.id !== id)
  }
}

/**
 * ✅ رفع صورة المنتج إلى Supabase Storage
 */
async function uploadProductImage(file: File, productId: string): Promise<string | null> {
  const filePath = `${userId.value}/${productId}-${Date.now()}.png`

  const { error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file, { upsert: true })

  if (error) {
    console.error('❌ خطأ في رفع الصورة:', error.message)
    return null
  }

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath)

  return data.publicUrl
}

export function useProducts() {
  onMounted(loadProducts)
  return { products, loadProducts, addProduct, updateProduct, deleteProduct, uploadProductImage }
}
