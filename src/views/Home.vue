<template>
  <div>
    <app-header />
    <app-content />
  </div>
</template>

<script>
// @ is an alias to /src
import AppHeader from '@/components/Home/Header.vue';
import AppContent from '@/components/Home/Content.vue';


export default {
  name: 'Home',
  components: {
    AppHeader, AppContent,
  },
};
</script>
