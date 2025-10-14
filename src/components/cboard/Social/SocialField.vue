<template>
  <div class="social-field">
    <label>{{ label }}</label>
    <input
      type="text"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('update', ($event.target as HTMLInputElement).value)"
    />
    <button @click="$emit('toggle-visibility')">
      {{ isPublic ? '👁️ عام' : '🔒 خاص' }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string
  isPublic: boolean
  placeholder?: string
}>()

defineEmits<{
  (e: 'update', val: string): void
  (e: 'toggle-visibility'): void
}>()
</script>

<style scoped>
.social-field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.social-field label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #1C1C1C;
}

.social-field input {
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  background-color: #FFFFFF;
  color: #1C1C1C;
  width: 100%;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.social-field input:focus {
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
  outline: none;
}

.social-field button {
  align-self: flex-start;
  background: none;
  border: none;
  font-size: 0.8rem;
  cursor: pointer;
  color: #FF7A00;
}
</style>
