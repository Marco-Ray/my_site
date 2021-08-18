<template>
  <v-md-preview :text="temp"></v-md-preview>
</template>

<script>
import marked from 'marked';

export default {
  name: 'MarkDownPage',
  data() {
    return {
      temp: ''
    }
  },
  props: ['file_path'],
  methods: {
    transform() {
      this.axios.get(this.file_path).then((res) => {
        this.temp = res.data;
      });
    },
  },
  mounted() {
    this.transform()
  }
};
</script>

<style scoped>
@import "../assets/mystyle.css";
</style>
