<template>
  <div class="preset-ready">
    <label for="ready-preset" class="label-unified">اختيار نموذج جاهز</label>
    <div class="preset-row">
      <select
        id="ready-preset"
        v-model="selectedReadyPreset"
        @change="applyReadyPreset(selectedReadyPreset)"
        class="dropdown-unified"
      >
        <option disabled value="">اختر نموذج جاهز</option>
        <option
          v-for="preset in readyPresets"
          :key="preset.id"
          :value="preset.id"
        >
          {{ preset.name }}
        </option>
      </select>

      <!-- زر تعيين كافتراضي -->
      <button @click="setAsDefault" class="button-unified button-default">
        تعيين كافتراضي
      </button>
      <div v-if="defaultReadyPreset" class="default-hint">
        النموذج الافتراضي الحالي: {{ defaultReadyPreset }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { readyPresets, type ReadyPreset } from '@/stores/cboard/MenuDesign/readyPresets.ts'
import { useLayoutEditorStore } from '@/stores/cboard/MenuDesign/LayoutEditor.ts'
import { useColorEditorStore } from '@/stores/cboard/MenuDesign/ColorEditorStore.ts'
import { supabase } from '@/supabase'   // ✅ خدمة Supabase

// ✅ النوع مضبوط بحيث يقبل فقط معرفات النماذج أو فارغ
const selectedReadyPreset = ref<ReadyPreset['id'] | ''>('')
const defaultReadyPreset = ref<ReadyPreset['id'] | null>(null)

const layoutStore = useLayoutEditorStore()
const colorStore = useColorEditorStore()

function applyReadyPreset(id: ReadyPreset['id'] | '') {
  if (!id) return
  const preset = readyPresets.find(p => p.id === id)
  if (!preset) return
  layoutStore.setLayout(preset.layout)   // يطبق التخطيط مباشرة
  colorStore.setColors(preset.colors)    // يطبق الألوان مباشرة
}

async function setAsDefault() {
  if (!selectedReadyPreset.value) return

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from('menu_settings')
    .upsert({
      user_id: user.id,
      ready_preset: selectedReadyPreset.value,
      updated_at: new Date()
    })

  defaultReadyPreset.value = selectedReadyPreset.value
}

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data } = await supabase
    .from('menu_settings')
    .select('ready_preset')
    .eq('user_id', user.id)
    .single()

  if (data?.ready_preset) {
    selectedReadyPreset.value = data.ready_preset as ReadyPreset['id']
    defaultReadyPreset.value = selectedReadyPreset.value
    applyReadyPreset(selectedReadyPreset.value)
  }
})
</script>

<style scoped>
.preset-ready {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.preset-row {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
}

.button-default {
  background: #e0f0ff;
  color: #0056b3;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  transition: background 0.2s ease, transform 0.2s ease;
}

.button-default:hover {
  background: #cce5ff;
  transform: scale(1.02);
}

.default-hint {
  font-size: 0.85rem;
  color: #555;
}
</style>
