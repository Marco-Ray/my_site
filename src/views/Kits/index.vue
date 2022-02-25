<template>
  <div class="about bg-black min-h-screen flex flex-col items-center">
    <!-- Back Button-->
    <router-link to="/home">
      <i class="fa fa-times absolute text-white top-5 text-7xl right-5" />
    </router-link>

    <h1 class="text-white my-14 py-6 px-28 lg:px-40 text-5xl border-b-2 border-red-500">
      Kits
    </h1>

    <div class="w-10/12 flex flex-col justify-center">
      <div v-if="showKit" class="kit-window w-full flex flex-col">
        <router-view></router-view>
        <i class="undo-icon fa fa-undo text-white text-center text-7xl cursor-pointer" @click="showKit = false"></i>
      </div>

      <div v-else class="cards_container w-full mb-20 flex flex-wrap justify-center">
        <cmp-card
          v-for="cmp in cmps"
          :key="cmp"
          :cmp="cmp"
          @click="openKit(cmp)"
        />
      </div>
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
      showKit: false,
      cmps: cmps,
    }
  },
  methods: {
    openKit(cmp) {
      this.$router.push({ name: cmp })
      this.showKit = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.cmp-card {
  color: white;
}

.kit-window {
  height: calc(100vh - 50px);
}

.undo-icon {
  margin: 20px 0;
}
</style>
