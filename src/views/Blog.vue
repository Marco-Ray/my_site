<template>
  <div class="blog bg-black h-screen text-white text-7xl">
    <router-link to="/">
      <i class="fa fa-times absolute right-0"></i>
    </router-link>
    <mark-down-page></mark-down-page>
  </div>
</template>

<script>
import MarkDownPage from '@/components/MarkDownPage';
export default {
  name: 'Blog',
  components: { MarkDownPage }
};
</script>

<style scoped>
</style>
