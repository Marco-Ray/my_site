<template>
  <div class="blog bg-black h-screen text-white text-7xl">
    <router-link to="/">
      <i class="fa fa-times"></i>
    </router-link>
    <h1>This is the blog page</h1>
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
