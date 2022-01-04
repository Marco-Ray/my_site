<template>
  <div class="blog h-screen text-red-600 text-6xl">
    <router-link to="/blogs">
      <i class="fa fa-times absolute top-5 right-5" />
    </router-link>
    <div id="btt" class="fixed w-full bottom-5 right-5 z-10 cursor-pointer flex justify-end">
      <i v-show="!isTop"
        class="fa fa-arrow-up"
        @click.prevent="backToTop"
      />
    </div>
<!--    <mark-down-page :url="url"></mark-down-page>-->
    <mark-down-page />
  </div>
</template>

<script>
import MarkDownPage from '@/components/Blogs/MarkDownPage';
import { filesCollection } from '@/includes/firebase';

export default {
  name: 'BlogPost',
  components: { MarkDownPage },
  data() {
    return {
      isTop: true,
      url: this.$route.params.url,
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
  async beforeRouteEnter(to, from, next) {
    const docsnapshot = await filesCollection.doc(to.params.id).get();

    next((vm) => {
      if (!docsnapshot.exists) {
        vm.$router.push({ name: 'Blogs' });
      }
    });

    console.log(this.url)
  }
};
</script>

<style scoped>
@media (max-width:959px){
  #btt {
    bottom: 0;
    right: 0;
    background-color: black;
    justify-content: center;
  }
}
</style>
