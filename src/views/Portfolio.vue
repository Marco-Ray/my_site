<template>
  <div class="about bg-black h-full min-h-screen flex flex-col items-center">
    <!-- Back Button-->
    <router-link to="/">
      <i class="fa fa-times absolute text-white top-5 text-7xl right-5" />
    </router-link>

    <h1 class="text-white my-14 py-6 px-28 lg:px-40 text-5xl border-b-2 border-red-500">
      Portfolio
    </h1>

    <tab-bars />

    <div class="cards_container flex flex-wrap w-10/12">
      <image-card v-for="(img,i) in imgs" :key="i"/>
    </div>
  </div>
</template>

<script>
import TabBars from '@/components/Portfolio/TabBars.vue';
import ImageCard from '@/components/Portfolio/ImageCard.vue';

export default {
  name: 'Portfolio',
  components: {
    TabBars,
    ImageCard
  },
  data() {
    return {
      imgs: [1,2,3,4,5,6,7,8,9,10]
    }
  }
}
</script>

<style scoped>

</style>
