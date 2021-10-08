<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">
        Upload
      </span>
      <i class="fa fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
          class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed
                border-gray-400 text-gray-400 transition duration-500 hover:text-white
                hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="upload($event)"
      >
        <h5>DropBox</h5>
      </div>
      <input type="file" multiple @change="upload($event)" />
      <hr class="my-6" />
      <!-- Clean Button-->
      <button :disabled="upload_in_submission"
              @click.prevent="cleanTasks"
              class="block w-full border border-gray-300 text-white bg-blue-400 transition
              hover:bg-blue-600 rounded"
      >Clean</button>
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.text_class">
          <i :class="upload.icon"></i> {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div class="transition-all progress-bar"
               :class="upload.variant"
               :style="{ width: upload.current_progress + '%' }"
          ></div>
        </div>
      </div>
      <div class="text-red-400 text-center font-bold mb-4 bg-red-500"
           v-if="upload_show_alert">
        upload failure
      </div>
    </div>
  </div>
</template>

<script>
import { storage, auth, imagesCollection } from '@/includes/firebase';

export default {
  name: 'Upload',
  data() {
    return {
      is_dragover: false,
      uploads: [],
      upload_show_alert: false,
      tasksUploading: 0,
    };
  },
  props: {
    getImages: {
      type: Function,
      required: true,
    },
    updateUnfinishedFlag: {
      type: Function,
    },
    album: {
      type: String,
      required: true,
    }
  },
  computed: {
    upload_in_submission() {
      this.updateUnfinishedFlag(this.tasksUploading !== 0);
      return (this.tasksUploading !== 0);
    },
  },
  methods: {
    upload($event) {
      this.is_dragover = false;

      const files = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files];

      this.tasksUploading = files.length;

      files.forEach((file) => {
        if (file.type !== 'image/jpeg' && file.type !== 'image/gif') {
          return;
        }

        if (!navigator.onLine) {
          this.uploads.push({
            task: {},
            current_progress: 100,
            name: file.name,
            variant: 'bg-red-400',
            icon: 'fa fa-times',
            text_class: 'text-red-400',
          });
          this.tasksUploading = 0;
          return;
        }

        const storageRef = storage.ref(); // music-4aefa.appspot.com
        const imageRef = storageRef.child(`Images/${this.album}/${file.name}`);
        const task = imageRef.put(file);

        const uploadIndex = this.uploads.push({
          task,
          current_progress: 0,
          name: file.name,
          variant: 'bg-blue-400',
          icon: 'fa fa-spinner fa-spin',
          text_class: '',
        }) - 1;

        task.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.uploads[uploadIndex].current_progress = progress;
        }, () => {
          this.uploads[uploadIndex].variant = 'bg-red-400';
          this.uploads[uploadIndex].icon = 'fa fa-times';
          this.uploads[uploadIndex].text_class = 'text-red-400';

          this.tasksUploading -= 1;
          this.upload_show_alert = true;
        }, async () => {
          let image;
          if (this.album !== 'Processing') {
            image = {
              uid: auth.currentUser.uid,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              album: this.album,
              datePosted: new Date().toString(),
            };
          } else {
            image = {
              uid: auth.currentUser.uid,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              album: this.album,
              datePosted: new Date().toString(),
              link: 'XXX',
            };
          }

          image.url = await task.snapshot.ref.getDownloadURL();
          await imagesCollection.add(image);
          this.getImages();

          this.uploads[uploadIndex].variant = 'bg-green-400';
          this.uploads[uploadIndex].icon = 'fa fa-check';
          this.uploads[uploadIndex].text_class = 'text-green-400';

          this.tasksUploading -= 1;
        });
      });
    },
    // cancelUploads() {
    //   this.uploads.forEach((upload) => {
    //     upload.task.cancel();
    //   });
    // },
    cleanTasks() {
      this.uploads = [];
    },
  },
  // beforeUnmount() {
  //   this.uploads.forEach((upload) => {
  //     upload.task.cancel();
  //   });
  // },
};
</script>
