<template>
  <div class="about bg-black h-full min-h-screen flex flex-col items-center">
    <!-- Back Button-->
    <router-link to="/">
      <i class="fa fa-times absolute text-white top-5 text-7xl right-5" />
    </router-link>

    <h1 class="text-white my-14 py-6 px-28 lg:px-40 text-5xl border-b-2 border-red-500">My Blogs</h1>

    <div class="flex w-10/12 justify-between items-stretch">
      <div class="flex gap-2">
        <!--  Sort Blog By Time-->
        <select v-model="sortByTime"
                class="inline-block py-1.5 px-3 text-gray-800 border border-gray-300
                transition duration-500 focus:outline-none focus:border-black rounded">
          <option value="1">Latest</option>
          <option value="2">Oldest</option>
        </select>

        <!--  Filter Blog By Type-->
        <select v-model="filterByType"
                class="inline-block py-1.5 px-3 text-gray-800 border border-gray-300
                transition duration-500 focus:outline-none focus:border-black rounded"
        >
          <option value="All">All</option>
          <option v-for="type in types" :key="type">{{ type }}</option>
        </select>

        <router-link class="text-white" :to="{ name: 'BlogManage'}">
          <svg class="w-10 h-10 fill-current fa-spin" viewBox="0 0 1024 1024"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M512 486.4c-83.2 0-153.6-70.4-153.6-153.6 0-83.2 70.4-153.6 153.6-153.6 83.2 0 153.6 70.4 153.6 153.6 6.4 83.2-64 153.6-153.6 153.6z m0-288c-76.8 0-134.4 64-134.4 134.4s64 134.4 134.4 134.4c76.8 0 134.4-64 134.4-134.4S588.8 198.4 512 198.4z"></path>
            <path d="M518.4 332.8m-96 0a96 96 0 1 0 192 0 96 96 0 1 0-192 0Z"></path>
            <path d="M371.2 633.6h-25.6c-19.2 0-38.4-19.2-38.4-38.4V460.8c0-19.2 19.2-38.4 38.4-38.4h19.2c19.2 0 38.4 19.2 38.4 38.4v134.4c0 19.2-12.8 38.4-32 38.4z m-25.6-192c-12.8 0-19.2 6.4-19.2 19.2v134.4c0 12.8 6.4 19.2 19.2 19.2h19.2c12.8 0 19.2-6.4 19.2-19.2V460.8c0-12.8-6.4-19.2-19.2-19.2h-19.2zM678.4 633.6h-19.2c-19.2 0-38.4-19.2-38.4-38.4V460.8c0-19.2 19.2-38.4 38.4-38.4h19.2c19.2 0 38.4 19.2 38.4 38.4v134.4c0 19.2-19.2 38.4-38.4 38.4z m-25.6-192c-12.8 0-19.2 6.4-19.2 19.2v134.4c0 12.8 6.4 19.2 19.2 19.2h19.2c12.8 0 19.2-6.4 19.2-19.2V460.8c0-12.8-6.4-19.2-19.2-19.2h-19.2z"></path>
            <path d="M473.6 844.8H448c-25.6 0-51.2-19.2-51.2-51.2V435.2c0-6.4 6.4-6.4 6.4-6.4 6.4 0 6.4 6.4 6.4 6.4v358.4c0 19.2 12.8 32 32 32h25.6c19.2 0 32-12.8 32-32v-108.8c0-6.4 6.4-6.4 6.4-6.4 6.4 0 6.4 6.4 6.4 6.4v108.8c12.8 32-12.8 51.2-38.4 51.2z"></path>
            <path d="M582.4 844.8h-25.6c-25.6 0-51.2-19.2-51.2-51.2v-108.8c0-6.4 6.4-6.4 6.4-6.4l6.4 6.4v108.8c0 19.2 12.8 32 32 32H576c19.2 0 32-12.8 32-32V435.2c0-6.4 6.4-6.4 6.4-6.4 6.4 0 6.4 6.4 6.4 6.4v358.4c12.8 32-12.8 51.2-38.4 51.2z"></path>
            <path d="M556.8 576c0 19.2-12.8 32-32 32h-25.6c-12.8 0-25.6-12.8-25.6-32s12.8-32 32-32h25.6c12.8 0 25.6 12.8 25.6 32z"></path>
          </svg>
        </router-link>
      </div>

      <!--  Reset-->
      <button class="inline-block bg-red-500 py-1.5 px-3 text-gray-200 rounded
              transition duration-500 hover:bg-red-700"
              @click="reset"
      >
        Reset
      </button>
    </div>

    <!--  Blog List-->
    <transition-group tag="ol" class="gap-10 w-10/12 mb-20" name="flip"
                      enter-active-class="animate__animated animate__flipInX"
                      leave-active-class="animate__animated animate__flipOutX "
                      move-class="transition duration-1000 linear"
                      mode="out-in"
    >
      <app-blog-item v-for="(blog, index) in sortedBlogs"
                     :key="blog.docID"
                     :data-index="index"
                     :blog="blog"
                     class="my-5"
                     @filterByClick="filterByClick"
      />
    </transition-group>

    <div id="btt" class="fixed w-full bottom-5 z-10 cursor-pointer text-white text-6xl flex justify-center">
      <i v-show="pendingRequest"
         class="fa fa-spinner fa-spin"
      />
      <i v-show="!isTop"
         class="fa fa-arrow-up absolute right-5 bottom-0"
         @click.prevent="backToTop"
      />
    </div>

  </div>
</template>

<script>
import AppBlogItem from '@/components/Blogs/BlogItem.vue';
import { filesCollection } from '@/includes/firebase';

export default {
  name: 'Blogs',
  components: {
    AppBlogItem,
  },
  data() {
    return {
      blogs: [],
      blogs_filtered: [],
      filterByType: 'All',
      sortByTime: '1',
      isTop: true,
      maxPerPage: 10,
      pendingRequest: false,
    }
  },
  computed: {
    sortedBlogs() {
      return this.blogs_filtered.slice().sort((a,b) => {
        if (this.sortByTime === '1') {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }
        return new Date(a.datePosted) - new Date(b.datePosted);
      });
    },
    types() {
      const typeList = [];
      this.blogs.forEach((blog) => {
        typeList.push(blog.type)
      });
      let x = new Set(typeList);
      return [...x]
    }
  },
  methods: {
    async getFiles() {
      if (this.pendingRequest) {
        return;
      }

      this.pendingRequest = true;

      let snapshots;
      if (this.blogs.length) {
        const lastDoc = await filesCollection
          .doc(this.blogs[this.blogs.length - 1].docID)
          .get();
        snapshots = await filesCollection
          .orderBy('modified_name')
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
      } else {
        snapshots = await filesCollection
          .orderBy('modified_name')
          .limit(this.maxPerPage)
          .get();
      }

      snapshots.forEach((document) => {
        this.blogs.push({
          ...document.data(),
          docID: document.id,
        });
      });

      this.pendingRequest = false;

      this.blogs_filtered = this.blogs;
    },
    reset() {
      this.sortByTime = '1';
      this.filterByType = 'All';
    },
    filterByClick(val) {
      this.filterByType = val;
    },
    handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const bottomOfWindow = Math.round(scrollTop) + clientHeight === scrollHeight;

      this.isTop = scrollTop === 0;

      if (bottomOfWindow) {
        this.getFiles();
      }
    },
    backToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  },
  created() {
    this.getFiles();

    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  watch: {
    filterByType:{
      handler(newVal) {
        this.blogs_filtered = this.blogs.filter(blog => {
          return (newVal === 'All') ? true : (blog.type === newVal)
        });
      },
      immediate: true
    }
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
