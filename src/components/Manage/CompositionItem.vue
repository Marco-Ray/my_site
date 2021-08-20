<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ file.modified_name }}</h4>
      <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
              @click.prevent="deleteFile"
      >
        <i :class="icon_variant"></i>
      </button>
      <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
              @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-edit"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div class="text-white text-center font-bold p-4 mb-4"
           v-if="show_alert" :class="alert_variant">
        {{ alert_msg }}
      </div>
      <vee-form :validation-schema="schema" :initial-values="file"
                @submit="edit"
      >
        <div class="mb-3">
          <label class="inline-block mb-2">Title</label>
          <vee-field type="text" name="modified_name"
                     class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                     placeholder="Enter File Title"
                     @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage name="modified_name" class="text-red-600" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Type</label>
          <vee-field type="text" name="type"
                     class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                     placeholder="Enter Type"
                     @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage name="type" class="text-red-600" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Type</label>
          <vee-field type="text" name="compendium"
                     class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                     placeholder="Edit Compendium"
                     @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage name="compendium" class="text-red-600" />
        </div>
        <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600"
                @disable="in_submission"
        >
          Submit
        </button>
        <button type="button" class="py-1.5 px-3 rounded text-white bg-gray-600"
                @click.prevent="showForm = false" @disable="in_submission"
        >
          GoBack
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { filesCollection, storage } from '@/includes/firebase';

export default {
  name: 'compositionItem',
  props: {
    file: {
      type: Object,
      required: true,
    },
    updateFile: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    removeFile: {
      type: Function,
      required: true,
    },
    updateUnsavedFlag: {
      type: Function,
    },
  },
  data() {
    return {
      showForm: false,
      schema: {
        modified_name: 'required',
        Type: 'alpha_spaces',
      },
      in_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-500',
      alert_msg: 'Please wait! Updating file info.',
      icon_variant: 'fa fa-times',
    };
  },
  methods: {
    async edit(values) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = 'bg-blue-500';
      this.alert_msg = 'Please wait! Updating file info.';

      try {
        await filesCollection.doc(this.file.docID).update(values);
      } catch (error) {
        this.in_submission = false;
        this.alert_variant = 'bg-red-500';
        this.alert_msg = 'Something went wrong! Try again later.';
        return;
      }

      this.updateFile(this.index, values);
      this.updateUnsavedFlag(false);

      this.in_submission = false;
      this.alert_variant = 'bg-green-500';
      this.alert_msg = 'Success!';

      setTimeout(() => {
        this.show_alert = false;
        this.showForm = false;
      }, 2000);
    },
    async deleteFile() {
      this.icon_variant = 'fa fa-spinner fa-spin';
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`BlogFiles/${this.file.original_name}`);
      await fileRef.delete();

      await filesCollection.doc(this.file.docID).delete();

      this.removeFile(this.index);
    },
  },
};
</script>
