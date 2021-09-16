<template>
  <div class="about bg-black h-full flex flex-col items-center">
    <!-- Back Button-->
    <router-link to="/">
      <i class="fa fa-times absolute text-white top-5 text-7xl right-5" />
    </router-link>

    <h1 class="text-white my-14 py-6 px-28 lg:px-40 text-5xl border-b-2 border-red-500">
      My Resume
    </h1>

    <div class="resume-content w-8/12 grid grid-cols-1 lg:grid-cols-2 gap-9">
      <edu-time-line />
      <honor-time-line />
      <research-time-line />
      <coursework-time-line />
      <programming-skills />
      <other-skills />
    </div>
  </div>
</template>

<script>
import EduTimeLine from '@/components/Resume/EduTimeLine.vue';
import HonorTimeLine from '@/components/Resume/HonorTimeLine.vue';
import ResearchTimeLine from '@/components/Resume/ResearchTimeLine.vue';
import CourseworkTimeLine from '@/components/Resume/CourseworkTimeLine.vue';
import ProgrammingSkills from '@/components/Resume/ProgrammingSkills.vue';
import OtherSkills from '@/components/Resume/OtherSkills.vue';

export default {
  name: 'Resume',
  components: {
    ProgrammingSkills,
    HonorTimeLine,
    EduTimeLine,
    ResearchTimeLine,
    CourseworkTimeLine,
    OtherSkills
  }
}
</script>

<style scoped>
.resume-content {
  margin-bottom: 20rem;
}
</style>
