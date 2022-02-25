<template>
  <div class="cover-container w-72 h-72 mx-5 my-5 border-2 border-white text-red-500 cursor-pointer"
  >
    {{ cmp }}
  </div>
</template>

<script>
export default {
  name: 'CmpCard',
  props: {
    cmp: String
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.cover-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 30px;
  text-align: center;
}
</style>
