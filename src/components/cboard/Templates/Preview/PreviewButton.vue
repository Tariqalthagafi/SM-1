<template>
  <div class="preview-button">
    <button @click="goToPreview" :disabled="disabled">
      معاينة المنيو
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const { disabled } = defineProps<{
  disabled?: boolean
}>()


const router = useRouter()

function goToPreview() {
  if (!disabled) {
    router.push({ name: 'MenuPreview' })
  }
}
</script>

<style scoped>


button:hover:enabled {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
