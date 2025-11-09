<template>
  <div class="product-image">
    <button v-if="validImageUrl && !hasError" @click="show = true" class="preview-btn"> {{ t('cboard.products.preview.button') }} </button>

    <div v-if="show" class="popup" @click.self="show = false">
      <img
  :src="validImageUrl"
  :alt="altText || t('cboard.products.preview.alt')"
  @error="handleError"
/>
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
.product-image {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.preview-btn {
  background: #eee;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 0.85rem;
}

.popup {
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

.popup img {
  max-width: 80%;
  max-height: 80%;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
}
</style>
