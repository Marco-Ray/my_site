<template>
  <section class="container mx-auto mt-6">
    <router-link to="/">
      <i class="fa fa-times absolute text-white text-6xl top-0 right-0"></i>
    </router-link>
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload :getFiles="getFiles"
                    :updateUnfinishedFlag="updateUnfinishedFlag" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Markdown Files</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items-->
            <composition-item v-for="(file, i) in files" :key="file.docID"
                              :file="file"
                              :updateFile="updateFile"
                              :index="i"
                              :removeFile="removeFile"
                              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import store from '@/store';
import AppUpload from '@/components/Upload.vue';
import { filesCollection, auth } from '@/includes/firebase';
import CompositionItem from '@/components/CompositionItem.vue';

export default {
  name: 'Manage',
  components: {
    CompositionItem,
    AppUpload,
  },
  data() {
    return {
      files: [],
      unsavedFlag: false,
      unfinishedFlag: false,
    };
  },
  created() {
    this.getFiles();
  },
  methods: {
    updateFile(i, values) {
      this.files[i].modified_name = values.modified_name;
      this.files[i].genre = values.genre;
    },
    async getFiles() {
      const snapshots = await filesCollection
        .where('uid', '==', auth.currentUser.uid).get();

      this.files = [];

      snapshots.forEach((doc) => [
        this.files.push({
          docID: doc.id,
          ...doc.data(),
        }),
      ]);
    },
    removeFile(i) {
      this.files.splice(i, 1);
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
      const leave = confirm('The files are still uploading, leaving will cancel the tasks. Do you want to leave anyway?');
      next(leave);
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   this.$refs.upload.cancelUploads();
  //   next();
  // },
  // beforeRouteEnter(to, from, next) {
  //   if (store.state.userLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: 'home' });
  //   }
  // },
};
</script>
