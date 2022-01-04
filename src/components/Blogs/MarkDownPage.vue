<template>
  <v-md-preview :text="temp" class="h-screen"></v-md-preview>
</template>

<script>
export default {
  name: 'MarkDownPage',
  data() {
    return {
      temp: '',
    }
  },
  props: ['url'],
  methods: {
    transform() {
      this.axios.get(this.url).then((res) => {
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
@import "../../assets/mystyle.css";
</style>
