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
//.left-slide-enter-from, .right-slide-leave-to{
//  //opacity: 0;
//  transform: translateX(100%);
//}
//.left-slide-leave-to, .right-slide-enter-from{
//  //opacity: 0;
//  transform: translateX(-100%);
//}
//
//.left-slide-enter-active, .left-slide-leave-active,
//.right-slide-enter-active, .right-slide-leave-active{
//  transition: transform ease 0.7s;
//}

</style>
