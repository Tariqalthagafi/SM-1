<script setup lang="ts">
import { ref } from 'vue'
import { use_social_store } from '@/stores/cboard/social.ts'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const store = use_social_store()
const key = 'instagram'
const instagram_placeholder = 'instagram.com/username'
const icon = 'instagram-icon.svg'
const input_type = 'url'

const isEditing = ref(false)
const inputValue = ref(store.get_field(key).value)

function on_focus() {
  isEditing.value = true
}

function on_blur() {
  isEditing.value = false
  store.update_value(key, inputValue.value)
}

function toggle_visibility() {
  store.toggle_visibility(key)
}
</script>

<template>
  <div class="social-field">
    <label class="field-label">
      <img
        :src="`/icons/social/${icon}`"
        :alt="`${key} icon`"
        class="field-icon"
      />
      {{ t('cboard.social.fields.instagram') }}
    </label>

    <input
      :type="input_type"
      v-model="inputValue"
      @focus="on_focus"
      @blur="on_blur"
      :class="{ editing: isEditing }"
      :placeholder="instagram_placeholder"
      :aria-label="t('cboard.social.fields.instagram')"
    />

    <div class="visibility-toggle">
      <label class="switch">
        <input
          type="checkbox"
          :checked="store.get_field(key).is_public"
          @change="toggle_visibility"
        />
        <span class="slider"></span>
      </label>
      <span class="status-label">{{ store.get_field(key).is_public ? t('cboard.social.visibility.public') : t('cboard.social.visibility.private') }}</span>
    </div>
  </div>
</template>

<style scoped>
.social-field {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 1.25rem;
  border-radius: 10px;
  color: #1c1c1c;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: box-shadow 0.3s ease;
}

.social-field:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.field-label {
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.field-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  filter: grayscale(20%);
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="url"] {
  padding: 0.6rem 0.75rem;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #1c1c1c;
  background-color: #fff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
input[type="url"]:focus {
  border-color: #ff9800;
  box-shadow: 0 0 0 2px rgba(255, 152, 0, 0.2);
  outline: none;
}

input.editing {
  border-color: #ff9800;
  box-shadow: 0 0 0 2px rgba(255, 152, 0, 0.3);
}

.visibility-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #555;
}

.switch {
  position: relative;
  display: inline-block;
  width: 42px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;
}

.slider::before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

.switch input:checked + .slider {
  background-color: #ff9800;
}

.switch input:checked + .slider::before {
  transform: translateX(18px);
}

.status-label {
  margin-inline-start: 0.75rem;
  font-size: 0.9rem;
  color: #333;
}
</style>
