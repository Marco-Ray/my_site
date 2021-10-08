<template>
  <div class="w-72 h-72 mx-5 my-5 border-2 border-white">
    <a :href="img.link || img.url" target="_blank" class="">
      <img
        v-show="loadFinish"
        class="w-full h-full object-cover"
        alt=""
        :src="img.url"
        @load="loadFinish = true"
      />
      <img
        v-show="!loadFinish"
        class="w-full h-full object-cover"
        alt=""
        :src="Loading"
      />
    </a>
  </div>
</template>

<script>
import Loading from '@/assets/loading.png';

export default {
  name: 'ImageItem',
  props: ['img'],
  data() {
    return {
      Loading,
      loadFinish: false
    }
  },
};
</script>

<style scoped>

</style>
