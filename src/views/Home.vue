<template>
  <div>
    <app-header />
    <app-content />
    <auth-model />
  </div>
</template>

<script>
// @ is an alias to /src
import AppHeader from '@/components/Header.vue';
import AppContent from '@/components/Content.vue';
import AuthModel from '@/components/Auth.vue';

export default {
  name: 'Home',
  components: {
    AppHeader, AppContent, AuthModel,
  },
  created() {
    this.$store.dispatch('init_login');
  },
};
</script>
