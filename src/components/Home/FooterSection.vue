<template>
  <footer class="footer">
    <div class="footer-content">
      <p>{{ t('home.footer.copyright') }}</p>

      <nav class="footer-links">

      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.footer {
  background-color: #1C1C1C;
  color: #fff;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  text-align: center;
  margin-top: auto;
  height: auto;          /* لا يوجد ارتفاع ثابت */
  line-height: 1;        /* أقل ارتفاع للنص */
}


.footer-content {
  max-width: 600px;      /* تقليل العرض الأقصى */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;           /* تقليل المسافة بين العناصر */
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.footer-links a {
  color: #FF7A00; /* برتقالي */
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #fff;
}
</style>
