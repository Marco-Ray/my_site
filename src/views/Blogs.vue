<template>
  <div class="about bg-black h-screen flex flex-col items-center">
    <!-- Back Button-->
    <router-link to="/">
      <i class="fa fa-times absolute text-white top-5 text-7xl right-5" />
    </router-link>

    <h1 class="text-white my-14 py-6 px-28 lg:px-40 text-5xl border-b-2 border-red-500">My Blogs</h1>

    <div class="flex w-10/12 justify-between items-stretch">
      <div class="flex gap-2">
        <!--  Sort Blog By Time-->
        <select v-model="sortByTime"
                class="inline-block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300
                transition duration-500 focus:outline-none focus:border-black rounded">
          <option value="1">Latest</option>
          <option value="2">Oldest</option>
        </select>

        <!--  Filter Blog By Type-->
        <select v-model="filterByType"
                class="inline-block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300
                transition duration-500 focus:outline-none focus:border-black rounded"
        >
          <option value="1">All</option>
          <option value="2">Tech</option>
          <option value="3">Art</option>
        </select>
      </div>

      <!--  Reset-->
      <button class="inline-block bg-red-500 mt-4 py-1.5 px-3 text-gray-200 rounded
              transition duration-500 hover:bg-red-700"
              @click="reset"
      >
        Reset
      </button>
    </div>

    <!--  Blog List-->
    <transition-group tag="ol" class="gap-10 w-10/12" name="flip"
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

    <div id="btt" class="fixed w-full bottom-5 right-5 z-10 cursor-pointer text-white text-6xl flex justify-end">
      <i v-show="!isTop"
         class="fa fa-arrow-up"
         @click.prevent="backToTop"
      />
    </div>

  </div>
</template>

<script>
import AppBlogItem from '@/components/BlogItem.vue';
import { filesCollection } from '@/includes/firebase';
// import jsonFiles from '../../public/md_files.json';


export default {
  name: 'Blogs',
  components: {
    AppBlogItem,
  },
  data() {
    return {
      blogs: [],
      blogs_filtered: [],
      filterByType: '1',
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
          return new Date(b.date) - new Date(a.date);
        }
        return new Date(a.date) - new Date(b.date);
      });
    },
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
      this.filterByType = '1';
    },
    filterByClick(val) {
      this.filterByType = val;
    },
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

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
  async created() {
    this.getFiles();

    window.addEventListener('scroll', this.handleScroll);
  },
  mounted() {
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  watch: {
    filterByType:{
      handler(newVal) {
        this.blogs_filtered = this.blogs.filter(blog => {
            if (newVal === '2') {
              return blog.type === 'Tech';
            } else if (newVal === '3') {
              return blog.type === 'Art';
            }
            return blog.type;
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
