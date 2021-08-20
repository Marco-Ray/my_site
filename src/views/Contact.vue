<template>
  <div class="about bg-black h-screen flex flex-col items-center">
    <!-- Back Button-->
    <router-link to="/">
      <i class="fa fa-times absolute text-white top-5 text-7xl right-5" />
    </router-link>

    <h1 class="text-white my-14 py-6 px-28 lg:px-40 text-5xl border-b-2 border-red-500">
      Contact Me
    </h1>

    <app-to-be-continue />
  </div>
</template>

<script>
import AppToBeContinue from '@/components/ToBeContinue.vue';
export default {
  name: 'Contact',
  components: {
    AppToBeContinue,
  }
}
</script>

<style scoped>

</style>
