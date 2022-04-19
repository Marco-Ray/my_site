<template>
  <div id="bg" class="px-20 flex flex-col justify-center gap-10 items-start">
    <Particles
      id="tsparticles"
      :options="{
        background: {
          position: '50% 50%',
          repeat: 'no-repeat',
          size: 'cover'
        },
        particles: {
          move: {
            direction: 'right',
            enable: true,
            speed: 5
          },
          number: {
            value: 0
          },
        },
        emitters: {
          autoPlay: true,
          fill: false,
          life: {
            wait: false
          },
          rate: {
            quantity: 1,
            delay: interval
          },
          shape: 'square',
          startCount: 0,
          size: {
            mode: 'percent',
            height: 100,
            width: 0
          },
          particles: {
            shape: {
              type: 'images',
              options: {
                images: {
                  src: 'https://particles.js.org/images/cyan_amongus.png',
                  width: 500,
                  height: 634
                }
              }
            },
            size: {
              value: 40
            },
            move: {
              speed: 5,
              outModes: {
                default: 'none',
                right: 'destroy'
              },
              straight: true
            },
            zIndex: {
              value: 0
            },
            rotate: {
              value: {
                min: 1,
                max: 360
              },
              animation: {
                enable: true,
                speed: 5,
                sync: false
              }
            }
          },
          position: {
            x: -30,
            y: 50,
          }
        }
      }"
    />
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
    <transition class="animate__animated animate__fadeInUp animate__delay-1s">
      <div v-if="exchange" id="exchange" class="text-xl text-white text-right hidden lg:block">
        <p>The currency value for GBP to CNY: </p>
        <p class="text-red-500">
          {{ exchange.cny }}
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import { storage } from "@/includes/firebase";

export default {
  name: 'Content',
  // created() {
  //   this.timer = setInterval(this.PReset, this.interval*1000);
  // },
  data() {
    return {
      CVURL: '',
      timer: '',
      pos_y: 25,
      hackReset: true,
      interval: 16,
      exchange: null
    }
  },
  created() {
    this.getExchange()
  },
  methods: {
    downloadCV() {
      // window.location.href = this.CVURL;
      alert('Coming soon');
    },
    getExchange() {
      this.axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/gbp/cny.json')
        .then((res) => {
          console.log(res.data)
          this.exchange = res.data
        })
    }
    // PReset() {
    //   this.pos_y = Math.floor(Math.random() * 100);
    //   this.hackReset = false
    //   this.$nextTick(() => {
    //     this.hackReset = true
    //   })
    //
    // }
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
  },
  // beforeUnmount() {
  //   clearInterval(this.timer);
  // }
};
</script>

<style lang="scss" scoped>
#bg {
  width: 100%;
  height: 100vh;
  --animate-duration: 1.2s;
}

#exchange {
  position: absolute;
  bottom: 50px;
  right: 100px;
}
</style>
