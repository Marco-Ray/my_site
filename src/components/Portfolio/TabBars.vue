<template>
  <nav class="shadow">
    <div class="container flex items-center justify-center p-6 mx-auto text-white capitalize">
      <a href="#"
         class="border-b-2 border-transparent px-3 sm:mx-6"
         :class="{ 'border-red-500 text-red-500': tabActive===1, 'hover:text-red-500': tabActive!==1 }"
         @click.prevent="tabActive=1"
      >
        CoCo
      </a>

      <a href="#"
         class="border-b-2 border-transparent px-3 sm:mx-6"
         :class="{ 'border-red-500 text-red-500': tabActive===2, 'hover:text-red-500': tabActive!==2 }"
         @click.prevent="tabActive=2"
      >
        Photograph
      </a>

      <a href="#" class="border-b-2 border-transparent mx-1.5 sm:mx-6">
        <router-link :to="{ name: 'ImageManage' }">
          <svg class="w-10 h-10 fill-current fa-spin" viewBox="0 0 1024 1024"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M678.4 396.8c0-89.6-76.8-160-166.4-160-89.6 0-160 70.4-166.4 160-83.2 12.8-128 44.8-128 76.8C217.6 544 371.2 576 512 576c140.8 0 294.4-32 294.4-96 0-38.4-44.8-70.4-128-83.2z m-179.2-128H512c70.4 0 128 57.6 128 128 0 25.6-57.6 44.8-128 44.8-44.8 0-83.2-6.4-108.8-19.2 6.4-83.2 64-134.4 96-153.6z m-44.8 12.8c-32 25.6-57.6 70.4-64 128-6.4 0-6.4-6.4-6.4-12.8 0-44.8 25.6-89.6 70.4-115.2zM512 556.8c-166.4 0-281.6-44.8-281.6-83.2 0-25.6 44.8-51.2 115.2-64 12.8 51.2 96 64 166.4 64s153.6-19.2 166.4-64c70.4 12.8 115.2 38.4 115.2 64 0 44.8-115.2 83.2-281.6 83.2z"></path>
            <path d="M332.8 454.4c-25.6 0-38.4 12.8-38.4 25.6s19.2 25.6 38.4 25.6c25.6 0 38.4-12.8 38.4-25.6 0-19.2-12.8-25.6-38.4-25.6z m0 32c-12.8 0-25.6-6.4-25.6-6.4s6.4-6.4 25.6-6.4c12.8 0 25.6 6.4 25.6 6.4s-12.8 6.4-25.6 6.4zM512 486.4c-25.6 0-38.4 12.8-38.4 25.6s19.2 25.6 38.4 25.6c25.6 0 38.4-12.8 38.4-25.6s-12.8-25.6-38.4-25.6z m0 38.4c-12.8 0-25.6-6.4-25.6-12.8 0 0 6.4-6.4 25.6-6.4 12.8 0 25.6 6.4 25.6 6.4 0 6.4-12.8 12.8-25.6 12.8zM697.6 454.4c-25.6 0-38.4 12.8-38.4 25.6s19.2 25.6 38.4 25.6c25.6 0 38.4-12.8 38.4-25.6 6.4-19.2-12.8-25.6-38.4-25.6z m0 32c-12.8 0-25.6-6.4-25.6-6.4s6.4-6.4 25.6-6.4c12.8 0 25.6 6.4 25.6 6.4s-6.4 6.4-25.6 6.4zM326.4 614.4c-6.4 0-12.8 6.4-12.8 6.4v102.4c0 6.4 6.4 6.4 6.4 6.4 6.4 0 6.4-6.4 6.4-6.4V620.8c6.4 0 0-6.4 0-6.4zM512 646.4c-6.4 0-6.4 6.4-6.4 6.4v128c0 6.4 6.4 6.4 6.4 6.4 6.4 0 6.4-6.4 6.4-6.4v-128c6.4 0 0-6.4-6.4-6.4zM710.4 614.4c-6.4 0-6.4 6.4-6.4 6.4v102.4c0 6.4 6.4 6.4 6.4 6.4 6.4 0 6.4-6.4 6.4-6.4V620.8l-6.4-6.4z"></path>
          </svg>
        </router-link>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TabBars',
  data() {
    return {
      tabActive: 1,
    }
  },
  watch: {
    tabActive(newVal) {
      if (newVal===1) {
        this.$emit('toggleAlbum', 'CoCo')
      } else {
        this.$emit('toggleAlbum', 'Photograph')
      }

    }
  }
};
</script>

<style scoped>

</style>
