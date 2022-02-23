<template>
  <div class="blog h-screen text-red-600 text-6xl">
    <div id="btt" class="fixed w-full bottom-5 right-5 z-10 cursor-pointer flex justify-end">
      <i v-show="!isTop"
        class="fa fa-arrow-up"
        @click.prevent="backToTop"
      />
    </div>
    <mark-down-page :url="url" />
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
      url: 'https://firebasestorage.googleapis.com/v0/b/my-site-c1432.appspot.com/o/BlogFiles%2FWebsite%20Description.md?alt=media&token=e4032945-f799-4ad1-8b8f-9508538b6bc7' || sessionStorage.getItem('blogUrl'),
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
    sessionStorage.setItem('blogUrl', this.url)
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
