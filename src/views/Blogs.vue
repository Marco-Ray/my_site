<template>
  <div class="about bg-black h-screen flex flex-col items-center">
    <!-- Back Button-->
    <router-link to="/">
      <i class="fa fa-times absolute text-white top-5 text-7xl right-5" />
    </router-link>

    <h1 class="text-white my-20 text-5xl">My Blogs</h1>

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
                transition duration-500 focus:outline-none focus:border-black rounded">
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
    <transition-group tag="ol" class="gap-10 w-10/12"
                      enter-active-class="animate__animated animate__flipInX"
                      leave-active-class="animate__animated animate__flipOutX absolute"
                      move-class="transition-transform duration-1000 linear"
                      mode="out-in"
    >
      <app-blog-item v-for="(blog, index) in sortedBlogs"
                     :key="blog.title"
                     :data-index="index"
                     :blog="blog"
                     class="my-5"
      />
    </transition-group>
  </div>
</template>

<script>
import AppBlogItem from '@/components/BlogItem.vue';
import jsonFiles from '../../public/md_files.json';

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
    getFiles() {
      this.blogs = jsonFiles.files;
      this.blogs_filtered = this.blogs;
    },
    reset() {
      this.sortByTime = '1';
      this.filterByType = '1';
    }
  },
  mounted() {
    this.getFiles()
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

</style>
