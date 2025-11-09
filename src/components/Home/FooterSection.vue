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
  background-color: #1C1C1C; /* أسود ناعم */
  color: #fff;
  padding: 2rem 1rem;
  font-size: 0.9rem;
  text-align: center;
  margin-top: auto;
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
