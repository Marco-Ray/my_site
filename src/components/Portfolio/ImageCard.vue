<template>
  <div class="cover-container w-72 h-72 mx-5 my-5 border-2 border-white">
    <a :href="img.link || img.url" target="_blank">
      <div v-if="showName" class="img-name-bg">
        <div class="img-name transform -translate-x-1/2 -translate-y-1/2">{{ img.modified_name }}</div>
      </div>
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
  props: ['img', 'showName'],
  data() {
    return {
      Loading,
      loadFinish: false
    }
  },
};
</script>

<style lang="scss" scoped>
.cover-container {
  position: relative;
  .img-name-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 30px;
    color: transparent;

    .img-name {
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }

  &:hover {
    .img-name-bg {
      z-index: 10;
      background-color: rgba(0,0,0,0.42);
      color: #EF4444;
    }
  }
}
</style>
