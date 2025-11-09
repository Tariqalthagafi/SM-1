<template>
  <div class="settings-page">
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
</template>

<script setup lang="ts">
import AccountSection from '@/components/cboard/settings/AccountSection.vue'
// import UsersSection from '@/components/cboard/settings/UsersSection.vue' 
import DomainSection from '@/components/cboard/settings/DomainSection.vue'


</script>

<style scoped>

</style>
