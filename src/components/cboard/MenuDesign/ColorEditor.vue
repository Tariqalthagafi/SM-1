<template>
  <div class="color-editor">

    <!-- ✅ Tabs لاختيار المجموعة -->
    <div class="group-tabs">
      <button
        v-for="tab in groups"
        :key="tab.key"
        :class="{ active: selectedGroup === tab.key }"
        @click="selectedGroup = tab.key"
      >
        <img :src="tab.icon" :alt="tab.label" class="group-icon" />
        {{ tab.label }}
      </button>
    </div>

    <!-- ✅ عرض المكون المناسب حسب الاختيار -->
    <div class="group-content">
      <TextColors v-if="selectedGroup === 'text'" />
      <IconColors v-if="selectedGroup === 'icons'" />
      <BackgroundColors v-if="selectedGroup === 'backgrounds'" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import TextColors from './TextColors.vue'
import IconColors from './IconColors.vue'
import BackgroundColors from './BackgroundColors.vue'

/* ✅ تعريف نوع صارم للمفاتيح */
type GroupKey = 'text' | 'icons' | 'backgrounds'

const selectedGroup = ref<GroupKey>('text')

// ✅ تعريف Tabs باستخدام النوع GroupKey
const groups: { key: GroupKey; label: string; icon: string }[] = [
  { key: 'text', label: t('cboard.menuDesign.colorEditor.groups.text'), icon: '/icons/menudesign/text-color-icon.svg' },
  { key: 'icons', label: t('cboard.menuDesign.colorEditor.groups.icons'), icon: '/icons/menudesign/shapes-color-icon.svg' },
  { key: 'backgrounds', label: t('cboard.menuDesign.colorEditor.groups.backgrounds'), icon: '/icons/menudesign/background-color-icon.svg' }
]
</script>

<style scoped>
.color-editor {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: 'Tajawal', sans-serif;
}

/* ✅ Tabs */
.group-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee; /* خط خفيف أسفل الصف */
}

.group-tabs button {
  flex: 1;
  padding: 0.5rem 0.4rem;
  border: none;
  background: transparent; /* ✅ بدون خلفية */
  color: #000000;          /* النصوص باللون الأسود */
  font-size: 0.8rem;       /* ✅ أصغر نسبياً */
  font-weight: 600;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;  /* ✅ رمز فوق النص */
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: color 0.2s ease;
}

.group-tabs button.active {
  color: #000000;
}

.group-tabs button.active::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #FF7A00; /* ✅ خط برتقالي أسفل التاب المختار */
}

.group-tabs button:hover {
  color: #000000;
}

.group-icon {
  width: 18px;   /* ✅ أصغر نسبياً */
  height: 18px;
  margin-bottom: 0.3rem; /* مسافة صغيرة بين الرمز والنص */
}

/* ✅ محتوى المجموعة */
.group-content {
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
}
</style>
