<template>
  <div class="resume-section">
    <div class="section-title text-3xl border-gray-500 border-4">
      Programming Skills
    </div>

    <div class="progress-bar wow animate__fadeInLeft">
      <div v-for="skill in skills" :key="skill.name">
        <h1 class="pt-2 sm:pt-5 text-white pt-5 ">{{ skill.name }} <span class="text-s text-red-500">{{ skill.degree }}</span></h1>
        <div class="mt-2 h-4 relative w-full rounded-full overflow-hidden">
          <div class=" w-full h-full bg-gray-200 absolute"></div>
          <div class=" h-full bg-red-500 absolute" :style="{width: skill.degree}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgrammingSkills',
  data() {
    return {
      skills: {
        Python: { name: 'Python', degree: '70%' },
        CPP: { name: 'C++', degree: '60%'},
        Vue: { name: 'HTML/CSS/JS/Vue', degree: '50%' },
        Java: { name: 'Java', degree: '30%' },
        Matlab: { name: 'Matlab', degree: '30%' },
        Pytorch_TF: { name: 'Pytorch/TensorFlow', degree: '30%'}
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.resume-section {
  color: white;

  .section-title {
    width: 350px;
    padding: 10px 0;
    text-align: center;
    border-radius: 3px;
  }

  .progress-bar {
    margin-bottom: 50px;
  }
}

</style>
