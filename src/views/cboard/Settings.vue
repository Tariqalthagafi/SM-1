<template>
  <div class="settings-page">
    <AccountSection />
    <UsersSection />
    <DomainSection />
    <MembershipStatus />
  </div>
</template>

<script setup lang="ts">
import AccountSection from '@/components/cboard/settings/AccountSection.vue'
import UsersSection from '@/components/cboard/settings/UsersSection.vue'
import DomainSection from '@/components/cboard/settings/DomainSection.vue'
import MembershipStatus from '@/components/cboard/settings/MembershipStatus.vue'

</script>
