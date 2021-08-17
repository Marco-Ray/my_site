<template>
  <div class="blog h-screen text-red-600 text-6xl">
    <router-link to="/">
      <i class="fa fa-times absolute right-5" />
    </router-link>
    <div id="btt" class="fixed w-full bottom-5 right-5 z-10 cursor-pointer flex justify-end">
      <i v-show="!isTop"
        class="fa fa-arrow-up"
        @click.prevent="backToTop"
      />
    </div>
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
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
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
@media (max-width:959px){
  #btt {
    bottom: 0px;
    right: 0px;
    background-color: black;
    justify-content: center;
  }
}
</style>
