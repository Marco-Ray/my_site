<template>
  <v-md-preview :text="markdown"></v-md-preview>
</template>

<script>
export default {
  name: 'MarkDownPage',
  data() {
    return {
      markdown: '# 标题'
    }
  }
};
</script>

<style scoped>

</style>
