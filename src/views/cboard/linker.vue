<template>
  <div class="page-wrapper">
    <div class="linker-dashboard">
      <h2 class="page-title">{{ t('cboard.linker.title') }}</h2>

      <div v-if="products.length">
        <ProductlinkerRow
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>

      <div v-else class="empty-state">
        {{ t('cboard.linker.empty') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductlinkerRow from '@/components/cboard/linker/ProductlinkerRow.vue'
import { useI18n } from 'vue-i18n'
import { supabase } from '@/supabase'

const { t } = useI18n()

// ✅ المنتجات تجلب مباشرة من Supabase
const products = ref<any[]>([])

onMounted(async () => {
  // ✅ اجلب المستخدم الحالي من Supabase Auth
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    console.error('لم يتم العثور على المستخدم', userError)
    return
  }

  // ✅ فلترة المنتجات حسب user_id
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', user.id)   // فقط المنتجات الخاصة بالمستخدم الحالي

  if (error) {
    console.error(error)
    return
  }
  products.value = data || []
})

</script>


<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: max-content;
  padding: 2rem 1rem;
  background-color: #FFFFFF;
  overflow-x: hidden;
}

.linker-dashboard {
  width: 100%;
  max-width: 1000px;
  display: grid;
  row-gap: 1.5rem;
  padding: 0;
  background-color: transparent;
  box-sizing: border-box;
  font-family: 'Tajawal', sans-serif;
}

.page-title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #1C1C1C;
  border-bottom: 1px solid #E0E0E0;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

/* حالة عدم وجود منتجات */
.empty-state {
  padding: 1rem;
  color: #999;
  font-size: 0.9rem;
  font-style: italic;
  border: 1px dashed #ccc;
  border-radius: 6px;
  background-color: #fdfdfd;
  text-align: center;
}

/* صف المنتج */
.product-linker-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #E0E0E0;
}

/* دعم الجوال */
@media (max-width: 768px) {
  .linker-dashboard {
    padding: 1rem;
  }
}
</style>
