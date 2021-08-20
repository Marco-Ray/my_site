<template>
  <div class="w-72 h-72 mx-5 my-5">
    <a :href="img.url" target="_blank" class="transition-opacity hover:opacity-30 z-10">
      <img
        class="w-full h-full object-cover"
        alt=""
        :src="img.url"
      />
    </a>
  </div>
</template>

<script>
export default {
  name: 'ImageItem',
  props: ['img'],
};
</script>

<style scoped>

</style>
