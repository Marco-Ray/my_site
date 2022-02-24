<template>
  <div class="about bg-black h-screen flex flex-col items-center">
    <!-- Back Button-->
    <router-link to="/home">
      <i class="fa fa-times absolute text-white top-5 text-7xl right-5" />
    </router-link>

    <h1 class="text-white my-14 py-6 px-28 lg:px-40 text-5xl border-b-2 border-red-500">
      Kits
    </h1>

    <MNIST />
  </div>
</template>

<script>
import MNIST from "@/components/Kits/MNIST";

export default {
  name: "Kits",
  components: {
    MNIST
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>
