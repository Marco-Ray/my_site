<template>
  <div>
    <app-header />
    <app-content />
  </div>
</template>

<script>
// @ is an alias to /src
import AppHeader from '@/components/Header.vue';
import AppContent from '@/components/Content.vue';

export default {
  name: 'Home',
  components: {
    AppHeader, AppContent,
  },
};
</script>
