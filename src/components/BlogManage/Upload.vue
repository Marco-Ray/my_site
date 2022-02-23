<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">
        Create New Blog
      </span>
      <i class="fa fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Create Box -->
      <div>
        <div class="text-white text-center font-bold p-4 mb-4"
             v-if="show_alert" :class="alert_variant">
          {{ alert_msg }}
        </div>
        <vee-form :validation-schema="schema"
                  @submit="create"
        >
          <!-- Title-->
          <div class="mb-3">
            <label class="inline-block mb-2">Title</label>
            <vee-field type="text" name="modified_name"
                       class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                       placeholder="Enter File Title"
                       @input="updateUnfinishedFlag(true)"
            />
            <ErrorMessage name="modified_name" class="text-red-600" />
          </div>
          <!-- Type-->
          <div class="mb-3">
            <label class="inline-block mb-2">Type</label>
            <vee-field type="text" name="type"
                       class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                       placeholder="Enter Type"
                       @input="updateUnfinishedFlag(true)"
            />
            <ErrorMessage name="type" class="text-red-600" />
          </div>
          <!-- Compendium-->
          <div class="mb-3">
            <label class="inline-block mb-2">Compendium</label>
            <vee-field type="text" name="compendium"
                       class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                       placeholder="Edit Compendium"
                       @input="updateUnfinishedFlag(true)"
            />
            <ErrorMessage name="compendium" class="text-red-600" />
          </div>
          <!-- URL-->
          <div class="mb-3">
            <label class="inline-block mb-2">URL</label>
            <vee-field type="text" name="url"
                       class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                       placeholder="Edit URL"
                       @input="updateUnfinishedFlag(true)"
            />
            <ErrorMessage name="url" class="text-red-600" />
          </div>
          <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600"
                  @disable="in_submission"
          >
            Submit
          </button>
        </vee-form>
      </div>
      <hr class="my-6" />
    </div>
  </div>
</template>

<script>
import { auth, filesCollection } from '@/includes/firebase';

export default {
  name: 'Upload',
  data() {
    return {
      schema: {
        url: 'required',
      },
      in_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-500',
      alert_msg: 'Please wait! Updating blog info.',
      icon_variant: 'fa fa-times',
    };
  },
  props: {
    getFiles: {
      type: Function,
      required: true,
    },
    updateUnfinishedFlag: {
      type: Function,
    }
  },
  methods: {
    async create(values) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = 'bg-blue-500';
      this.alert_msg = 'Please wait! Updating file info.';

      const post = {
        uid: auth.currentUser.uid,
        modified_name: values.modified_name,
        datePosted: new Date().toString(),
        type: values.type,
        compendium: values.compendium,
        url: values.url
      };

      try {
        await filesCollection.add(post);
      } catch (error) {
        this.updateUnfinishedFlag(false);
        this.in_submission = false;
        this.alert_variant = 'bg-red-500';
        this.alert_msg = 'Something went wrong! Try again later.';
        return;
      }

      this.updateUnfinishedFlag(false);
      this.in_submission = false;
      this.alert_variant = 'bg-green-500';
      this.alert_msg = 'Success!';

      setTimeout(() => {
        this.show_alert = false;
      }, 2000);

      this.getFiles();
    },
  },
  // beforeUnmount() {
  //   this.uploads.forEach((upload) => {
  //     upload.task.cancel();
  //   });
  // },
};
</script>
