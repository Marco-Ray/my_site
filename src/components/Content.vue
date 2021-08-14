<template>
  <div id="bg" class="px-20 flex flex-col justify-center items-start">
    <div class="px-3 py-10 bg-gray-500 bg-opacity-50">
      <div class="text-7xl text-white flex flex-col lg:flex-row lg:gap-4">
        <div>
          <p >Hi! I'm</p>
        </div>
        <div>
          <p><span class="text-red-500"> Zehuan</span> Wang</p>
        </div>
      </div>
      <p class="text-white py-5 max-w-prose">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
        praesentium voluptatum deleniti atque corrupti quos dolores et quas
        molestias excepturi sint occaecati cupiditate non provident.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Content'
};
</script>

<style lang="scss" scoped>
#bg {
  width: 100%;
  height: 100vh;
  background-image: url('../assets/bg.jpg');
  background-position: top right;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
