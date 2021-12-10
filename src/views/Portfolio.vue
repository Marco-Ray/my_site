<template>
  <div class="about bg-black h-full min-h-screen flex flex-col items-center">
    <!-- Back Button-->
    <router-link to="/">
      <i class="fa fa-times absolute text-white top-5 text-7xl right-5" />
    </router-link>

    <h1 class="text-white my-14 py-6 px-28 lg:px-40 text-5xl border-b-2 border-red-500">
      Portfolio
    </h1>

    <div class="inline-flex">
      <!--  Sort Blog By Time-->
      <select v-model="sortByTime"
              class="inline-block py-1.5 px-3 text-gray-800 border border-gray-300 m-6
                  transition duration-500 focus:outline-none focus:border-black rounded">
        <option value="1">Latest</option>
        <option value="2">Oldest</option>
      </select>

      <tab-bars @toggleAlbum="toggleAlbum" />
    </div>

    <!--    Image Container-->
    <transition-group tag="ol" class="cards_container w-246 mb-20 flex flex-wrap justify-start" name="flip"
                      enter-active-class="animate__animated animate__zoomIn"
                      move-class="transition duration-1000 linear"
                      mode="out-in"
    >
      <image-card v-for="img in sortedImages"
                  :key="img.docID"
                  :img="img"
                  :showName="showName"
      />
    </transition-group>

    <div id="btt" class="fixed w-full bottom-5 z-10 cursor-pointer text-white text-6xl flex justify-center">
      <i v-show="pendingRequest"
        class="fa fa-spinner fa-spin"
      />
      <i v-show="!isTop"
         class="absolute fa fa-arrow-up right-5 bottom-0"
         @click.prevent="backToTop"
      />
    </div>
  </div>
</template>

<script>
import TabBars from '@/components/Portfolio/TabBars.vue';
import ImageCard from '@/components/Portfolio/ImageCard.vue';
import { imagesCollection } from '@/includes/firebase';

export default {
  name: 'Portfolio',
  components: {
    TabBars,
    ImageCard
  },
  data() {
    return {
      imgs: [],
      album: 'CoCo',
      sortByTime: '1',
      isTop: true,
      maxPerPage: 9,
      pendingRequest: false,
    }
  },
  computed: {
    sortedImages() {
      return this.imgs.slice().sort((a,b) => {
        if (this.sortByTime === '1') {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }
        return new Date(a.datePosted) - new Date(b.datePosted);
      });
    },
    showName() {
      return (this.album === 'Processing') ? true : false
    }
  },
  methods: {
    toggleAlbum(val) {
      this.imgs = []
      this.album = val;
      this.getImages();
    },

    async getImages() {
      if (this.pendingRequest) {
        return;
      }

      this.pendingRequest = true;

      let snapshots;
      if (this.imgs.length) {
        const lastDoc = await imagesCollection
          .doc(this.imgs[this.imgs.length - 1].docID)
          .get();
        snapshots = await imagesCollection
          .where('album', '==', this.album)
          .orderBy('modified_name')
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
      } else {
        snapshots = await imagesCollection
          .where('album', '==', this.album)
          .orderBy('modified_name')
          .limit(this.maxPerPage)
          .get();
      }

      snapshots.forEach((document) => {
        this.imgs.push({
          ...document.data(),
          docID: document.id,
        });
      });

      this.pendingRequest = false;
    },

    handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const bottomOfWindow = Math.round(scrollTop) + clientHeight === scrollHeight;

      this.isTop = scrollTop === 0;

      if (bottomOfWindow) {
        this.getImages();
      }
    },

    backToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
  },
  created() {
    this.getImages();

    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>

<style scoped>
@media (max-width:959px){
  #btt {
    bottom: 0;
    right: 0;
    background-color: black;
    justify-content: center;
  }
}
</style>
