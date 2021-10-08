<template>
  <section class="container mx-auto mt-6">
    <router-link to="/portfolio">
      <i class="fa fa-times absolute text-white text-6xl top-0 right-0"></i>
    </router-link>
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <div class="bg-white list-none w-full inline-flex flex-wrap gap-3 items-center">
          <a
            v-for="tab in tabLists"
            :key="tab.id"
            href="#"
            @click.prevent="activeAlbum = tab.id"
            class="ml-5"
            :class="{ 'bg-blue-500 p-2':activeAlbum === tab.id }"
          >
            {{ tab.title }}
          </a>
        </div>
        <app-upload :getImages="getImages"
                    :updateUnfinishedFlag="updateUnfinishedFlag"
                    :album="album"
        />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Images</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items-->
            <composition-item v-for="(image, i) in images" :key="image.docID"
                              :image="image"
                              :updateImage="updateImage"
                              :index="i"
                              :removeImage="removeImage"
                              :updateUnsavedFlag="updateUnsavedFlag"
                              :album="album"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import store from '@/store';
import AppUpload from '@/components/ImageManage/Upload.vue';
import CompositionItem from '@/components/ImageManage/CompositionItem.vue';
import { imagesCollection, auth } from '@/includes/firebase';


export default {
  name: 'ImageManage',
  components: {
    CompositionItem,
    AppUpload,
  },
  data() {
    return {
      images: [],
      unsavedFlag: false,
      unfinishedFlag: false,
      activeAlbum: 1,
      tabLists: [
        { id: 0,
          title: 'CoCo' },
        { id: 1,
          title: 'Photograph' },
        { id: 2,
          title: 'Processing' }
      ]
    };
  },
  computed: {
    album() {
      return this.tabLists[this.activeAlbum].title
    }
  },
  created() {
    this.getImages();
  },
  methods: {
    updateImage(i, values) {
      this.images[i].modified_name = values.modified_name;
    },
    async getImages() {
      const snapshots = await imagesCollection
        .where('uid', '==', auth.currentUser.uid).get();

      this.images = [];

      snapshots.forEach((doc) => [
        this.images.push({
          docID: doc.id,
          ...doc.data(),
        }),
      ]);
    },
    removeImage(i) {
      this.images.splice(i, 1);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
    updateUnfinishedFlag(value) {
      this.unfinishedFlag = value;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag && !this.unfinishedFlag) {
      next();
    } else if (this.unsavedFlag) {
      // eslint-disable-next-line no-restricted-globals, no-alert
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?');
      next(leave);
    } else if (this.unfinishedFlag) {
      // eslint-disable-next-line no-restricted-globals, no-alert
      const leave = confirm('The images are still uploading, leaving will cancel the tasks. Do you want to leave anyway?');
      next(leave);
    }
  },
};
</script>
