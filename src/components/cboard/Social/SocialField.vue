<template>
  <div class="social-field">
    <label :for="inputId">{{ label }}</label>
    <div class="input-wrapper">
      <input
        :id="inputId"
        :name="inputName"
        :readonly="!isEditing"
        :value="value"
        :placeholder="placeholder"
        @input="$emit('update', ($event.target as HTMLInputElement).value)"
        :class="{ locked: !isEditing }"
      />

      <button class="edit-btn" @click="toggleEdit">
        {{ isEditing ? '💾 حفظ' : '✏️ تعديل' }}
      </button>

      <button class="visibility-btn" @click="$emit('toggle-visibility')">
        {{ isPublic ? '👁️ إخفاء' : '👁️ إظهار' }}
      </button>

      <SocialStatus :isPublic="isPublic" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SocialStatus from './SocialStatus.vue'

const props = defineProps<{
  label: string
  value: string
  placeholder?: string
  isPublic: boolean
}>()

const emit = defineEmits(['update', 'toggle-visibility'])

const isEditing = ref(false)

function toggleEdit() {
  isEditing.value = !isEditing.value
}

// توليد id و name فريد بناءً على label
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
  max-width: 320px;
  flex: 1;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: nowrap;
}

input {
  flex: 1;
  padding: 0.45rem 0.6rem;
  font-size: 0.85rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
  transition: border-color 0.2s ease;
  min-width: 160px;
  max-width: 200px;
}

input.locked {
  background-color: #f5f5f5;
  color: #777;
  cursor: not-allowed;
}

.edit-btn,
.visibility-btn {
  padding: 0.35rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: #007acc;
  color: white;
  transition: background-color 0.2s ease;
  white-space: nowrap;
}

.edit-btn:hover,
.visibility-btn:hover {
  background-color: #005fa3;
}

.social-status {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
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
