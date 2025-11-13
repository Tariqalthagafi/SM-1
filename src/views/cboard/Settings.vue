<template>
  <div class="page-wrapper">
    <div class="settings-dashboard">
      <section class="settings-section">
        <AccountSection />
      </section>

      <section class="settings-section">
        <DomainSection />
      </section>

      <!--
      <section class="settings-section">
        <UsersSection />
      </section>
      -->
    </div>
  </div>
</template>


<script setup lang="ts">
import AccountSection from '@/components/cboard/settings/AccountSection.vue'
// import UsersSection from '@/components/cboard/settings/UsersSection.vue' 
import DomainSection from '@/components/cboard/settings/DomainSection.vue'


</script>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: max-content;
  padding: 2rem 1rem;
  background-color: #FFFFFF;
  overflow-x: hidden;
}

.settings-dashboard {
  width: 100%;
  max-width: 1000px;
  display: grid;
  row-gap: 2rem;
  padding: 0;
  background-color: transparent;
  box-sizing: border-box;
  font-family: 'Tajawal', sans-serif;
}

.settings-section {
  border-bottom: 1px solid #E0E0E0;
  padding-bottom: 1rem;
}

/* دعم الجوال */
@media (max-width: 768px) {
  .settings-dashboard {
    padding: 1rem;
  }
}
</style>

