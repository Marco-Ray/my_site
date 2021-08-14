<template>
  <div id="bg">
    This is the area of main content
  </div>
</template>

<script>
export default {
  name: 'Content'
};
</script>

<style lang="scss" scoped>
#bg {
  width: 100%;
  height: 100vh;
  background-image: url('../assets/bg.jpg');
  background-position: top right;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
