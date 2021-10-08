<template>
  <div id="bg" class="px-20 flex flex-col justify-center gap-10 items-start">
    <transition class="animate__animated animate__fadeInRight">
      <div class="p-10 bg-gray-500 bg-opacity-50 rounded-sm">
        <transition class="animate__animated animate__fadeInRight">
          <div>
            <div class="text-7xl text-white flex flex-col lg:flex-row lg:gap-4">
              <div>
                <p >Hi! I'm</p>
              </div>
              <div>
                <p><span class="text-red-500"> Zehuan</span> Wang</p>
              </div>
            </div>
            <div class="text-white text-lg pt-6 max-w-prose m-0">
              <p>
                Do not go gentle into that good night,
                <br />
                Old age should burn and rave at close of day;
                <br />
                Rage, rage against the dying of the light.
              </p>
              <div class="flex justify-end">
                <div class="text-white">-- Dylan Thomas</div>
              </div>
            </div>

          </div>
        </transition>
      </div>
    </transition>
    <transition class="animate__animated animate__fadeInUp animate__delay-1s">
      <button class="px-5 py-2 bg-red-500 text-white rounded-sm" @click="downloadCV">Download CV</button>
    </transition>
  </div>
</template>

<script>
import { storage } from "@/includes/firebase";

export default {
  name: 'Content',
  data() {
    return {
      CVURL: ''
    }
  },
  created() {
    // this.getCVURL();
  },
  methods: {
    downloadCV() {
      // window.location.href = this.CVURL;
      alert('Coming soon');
    },
    // async getCVURL() {
    //   const storageRef = storage.ref();
    //   storageRef.child('CV/CV-Zehuan_Wang-20210923.doc').getDownloadURL()
    //     .then((url) => {
    //       this.CVURL = url;
    //     })
    //     .catch((error) => {
    //       return error
    //     });
    // }
  }
};
</script>

<style lang="scss" scoped>
#bg {
  width: 100%;
  height: 100vh;
  --animate-duration: 1.2s;
}
</style>
