<template>
  <div class="blog h-screen text-red-600 text-6xl">
    <router-link to="/">
      <i class="fa fa-times absolute right-5" />
    </router-link>
    <i v-show="!isTop"
      class="fa fa-arrow-up fixed bottom-5 right-5 z-10 cursor-pointer"
      @click.prevent="backToTop"
    />
    <mark-down-page></mark-down-page>
  </div>
</template>

<script>
import MarkDownPage from '@/components/MarkDownPage';
export default {
  name: 'Blog',
  components: { MarkDownPage },
  data() {
    return {
      isTop: true,
    }
  },
  methods: {
    handleScroll() {
      const { scrollTop } = document.documentElement;
      this.isTop = scrollTop === 0;
    },
    backToTop() {
      document.documentElement.scrollTop = 0;
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
</style>
