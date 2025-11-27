<template>
  <div class="product-image-preview">
    <!-- زر معاينة الصورة -->
    <button
      v-if="validImageUrl && !hasError"
      @click="show = true"
      class="preview-btn"
    >
      {{ t('cboard.products.preview.button') }}
    </button>

    <!-- نافذة معاينة الصورة -->
    <div v-if="show" class="popup-overlay" @click.self="show = false">
      <div class="popup-box">
        <img
          :src="validImageUrl"
          :alt="altText || t('cboard.products.preview.alt')"
          @error="handleError"
        />
        <button class="close-btn" @click="show = false">✖</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps<{
  imageUrl?: string
  altText?: string
}>()

const show = ref(false)
const hasError = ref(false)

const validImageUrl = computed(() => props.imageUrl?.trim() || '')

function handleError() {
  hasError.value = true
}
</script>

<style scoped>
.product-image-preview {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.preview-btn {
  background-color: #FF7A00;
  color: #fff;
  border: none;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.preview-btn:hover {
  background-color: #e96c00;
}

/* نافذة المعاينة */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.popup-box {
  position: relative;
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  max-width: 90%;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.popup-box img {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
}

/* زر الإغلاق */
.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #FF7A00;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.close-btn:hover {
  background-color: #e96c00;
}
</style>
