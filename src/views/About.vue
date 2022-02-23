<template>
  <div class="about bg-black h-screen flex flex-col items-center">
    <!-- Back Button-->
    <router-link to="/home">
      <i class="fa fa-times absolute text-white top-5 text-7xl right-5" />
    </router-link>

    <h1 class="text-white my-14 py-6 px-28 lg:px-40 text-5xl border-b-2 border-red-500">
      About
    </h1>

    <blog-post />
  </div>
</template>

<script>
import BlogPost from "@/views/BlogPost";

export default {
  name: 'About',
  components: {
    BlogPost
  }
}
</script>
