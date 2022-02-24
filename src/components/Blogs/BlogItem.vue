<template>
  <div class="blog-item w-full px-8 py-4 mx-auto bg-white rounded-lg shadow-md" @click="readBlog()">
    <div class="flex items-center justify-between">
      <span class="text-sm font-light text-gray-600 dark:text-gray-400">
        {{ blog.datePosted }}
      </span>
      <p class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
         @click.stop="filterByClick"
      >
        {{ blog.type }}
      </p>
    </div>

    <div class="mt-2">
      <div class="text-2xl font-bold text-gray-700 dark:text-white">
        {{ blog.modified_name }}
      </div>
      <p class="mt-2 text-gray-600 dark:text-gray-300"
         :class="{ 'truncate': !readMore }"
      >
        {{ blog.compendium }}
      </p>
    </div>

    <div class="flex items-center justify-between mt-4">
      <div @click.stop="toggleCompendium">
        <p class="text-red-600 dark:text-red-400 hover:underline cursor-pointer">
          {{ readMoreText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogItem',
  props: ['blog'],
  emits: ['filterByClick'],
  data() {
    return {
      readMore: false,
      readMoreText: 'Read the whole compendium',
    };
  },
  methods: {
    toggleCompendium() {
      this.readMore = !this.readMore;
      if (this.readMore) {
        this.readMoreText = 'Hidden'
      } else {
        this.readMoreText = 'Read the whole compendium'
      }
    },
    filterByClick() {
      this.$emit('filterByClick', this.blog.type);
    },
    readBlog() {
      // this.$router.push({ name: 'BlogPost', params: { id: this.blog.docID, url: this.blog.url } })
      window.open(this.blog.url, '_blank')
    }
  },
};
</script>

<style lang="scss" scoped>
.blog-item {
  cursor: pointer;
  user-select: none;
}
</style>
