<template>
  <div>
    <app-header />
    <app-content />
  </div>
</template>

<script>
// @ is an alias to /src

import AppContent from '@/components/Content.vue';
import AppHeader from '@/components/Header.vue';

export default {
  name: 'Home',
  components: {
    AppHeader, AppContent,
  },
};
</script>
