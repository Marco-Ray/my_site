<template>
  <div class="about bg-black min-h-screen flex flex-col items-center">
    <!-- Back Button-->
    <router-link to="/home">
      <i class="fa fa-times absolute text-white top-5 text-7xl right-5" />
    </router-link>

    <h1 class="text-white my-14 py-6 px-28 lg:px-40 text-5xl border-b-2 border-red-500">
      Kits
    </h1>

    <div class="w-10/12 flex flex-row">
<!--      左半-->
      <div class="cards_container w-1/2 mb-20 flex flex-wrap justify-center">
        <cmp-card
          v-for="cmp in cmps"
          :key="cmp"
          :cmp="cmp"
        />
      </div>

<!--      右半-->
      <router-view class="w-1/2"></router-view>
    </div>

  </div>
</template>

<script>
import { cmps } from '@/components/Kits/autoLoad.js';
import CmpCard from '@/components/Kits/CmpCard';

export default {
  name: "Kits",
  components: {
    CmpCard,
  },
  data() {
    return {
      cmps: cmps,
    }
  }
}
</script>

<style lang="scss" scoped>
.cmp-card {
  color: white;
}
</style>
