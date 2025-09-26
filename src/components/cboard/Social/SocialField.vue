<template>
  <div class="social-field">
    <label :for="inputId">{{ label }}</label>
    <div class="input-row">
      <input
        :id="inputId"
        :name="inputName"
        :value="value"
        :placeholder="placeholder"
        @input="$emit('update', ($event.target as HTMLInputElement).value)"
      />

      <label class="toggle-switch">
        <input
          type="checkbox"
          :checked="isPublic"
          @change="$emit('toggle-visibility')"
        />
        <span class="slider"></span>
      </label>

      <span :class="['status', isPublic ? 'public' : 'private']">
        {{ isPublic ? 'ظاهر للجمهور' : 'مخفي عن الجمهور' }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  value: string
  placeholder?: string
  isPublic: boolean
}>()

const emit = defineEmits(['update', 'toggle-visibility'])

const inputId = computed(() =>
  props.label.replace(/\s+/g, '-').toLowerCase()
)
const inputName = inputId
</script>

<style scoped>
.social-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
  min-width: 280px;
  font-family: 'Tajawal', sans-serif;
}

label {
  font-size: 0.85rem;
  font-weight: bold;
  color: #1C1C1C;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

input {
  flex: 1;
  padding: 0.45rem 0.6rem;
  font-size: 0.85rem;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  background-color: #FFFFFF;
  color: #1C1C1C;
  min-width: 160px;
  max-width: 240px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus {
  border-color: #FF7A00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
  outline: none;
}

/* مفتاح التبديل */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 42px;
  height: 24px;
}
.toggle-switch input {
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
  border-radius: 24px;
  transition: 0.3s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 18px; width: 18px;
  left: 3px; bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: 0.3s;
}
input:checked + .slider {
  background-color: #FF7A00;
}
input:checked + .slider:before {
  transform: translateX(18px);
}

/* وصف الحالة */
.status {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
}
.public {
  background-color: #e0f7e9;
  color: #2e7d32;
}
.private {
  background-color: #fdecea;
  color: #c62828;
}
</style>
