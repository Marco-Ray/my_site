<template>
  <app-header />
  <app-content />
</template>

<script>
import AppHeader from '@/components/Header.vue';
import AppContent from '@/components/Content.vue';

export default {
  name: 'app',
  components: {
    AppHeader, AppContent,
  }
};
</script>

<style lang="scss">
</style>
