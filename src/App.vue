<template>
  <router-view v-slot="{ Component, route }">
    <transition
      :enter-active-class="route.meta.enter"
      :leave-active-class="route.meta.leave"
      mode="out-in">
      <component :is="Component" class="w-full h-full z-20"/>
    </transition>
  </router-view>
  <auth-model />
</template>

<script>
import AuthModel from '@/components/Auth.vue';

export default {
  name: 'app',
  components: {
    AuthModel,
  },
  created() {
    this.$store.dispatch('init_login');
  },
};
</script>

<style lang="scss">
#nprogress .bar {
  background: red !important; //自定义颜色
  height: 10px;
}

</style>
