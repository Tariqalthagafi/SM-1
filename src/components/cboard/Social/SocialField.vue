<template>
  <div class="social-field">
    <label>{{ label }}</label>
    <input
      type="text"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('update', ($event.target as HTMLInputElement).value)"
    />

    <div class="visibility-toggle">
      <span class="status-label">{{ isPublic ? 'عام' : 'خاص' }}</span>
      <label class="switch">
        <input type="checkbox" :checked="isPublic" @change="$emit('toggle-visibility')" />
        <span class="slider"></span>
      </label>
    </div>
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
  gap: 0.5rem;
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

.visibility-toggle {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.status-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: #1C1C1C;
}

/* زر التبديل */
.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0;
  right: 0; bottom: 0;
  background-color: #ccc;
  border-radius: 20px;
  transition: 0.3s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: 0.3s;
}

input:checked + .slider {
  background-color: #FF7A00;
}

input:checked + .slider:before {
  transform: translateX(16px);
}
</style>
