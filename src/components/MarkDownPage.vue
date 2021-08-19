<template>
  <v-md-preview :text="temp"></v-md-preview>
</template>

<script>
export default {
  name: 'MarkDownPage',
  data() {
    return {
      temp: ''
    }
  },
  props: ['url'],
  methods: {
    transform() {
      const url = 'https://firebasestorage.googleapis.com/v0/b/my-site-c1432.appspot.com/o/BlogFiles%2FDCGAN.md?alt=media&token=083468e4-0ec1-4cf9-87a1-0256474f4bb0';
      this.axios.get(url).then((res) => {
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
