<template>
  <div class="resume-section">
    <div class="section-title text-3xl border-gray-500 border-4">
      Awards & Honors
    </div>

    <div class="section-list">
      <div class="block w-1 bg-red-500 absolute h-full transform -translate-x-1/2"></div>

      <ul>
        <li>
          <div class="pl-10">
            <div class="index"></div>
            <p class="text-red-500">Nov 2018</p>
            <p class="text-red-500"><span class="text-xl text-white">Scholarship for excellent academic performance</span> - UESTC</p>
          </div>
        </li>
        <li>
          <div class="pl-10">
            <div class="index"></div>
            <p class="text-red-500">Nov 2019</p>
            <p class="text-red-500"><span class="text-xl text-white">Scholarship for excellent academic performance</span> - UESTC</p>
          </div>
        </li>
        <li>
          <div class="pl-10">
            <div class="index"></div>
            <p class="text-red-500">Nov 2019</p>
            <p class="text-red-500"><span class="text-xl text-white">Awarded the title of <span class="text-red-500">Excellent Individual</span> when worked as student assistant at College Students Cultural Quality Education Center</span> - UESTC</p>
          </div>
        </li>
        <li>
          <div class="pl-10">
            <div class="index"></div>
            <p class="text-red-500">Jun - Oct 2020</p>
            <p class="text-red-500"><span class="text-xl text-white"><span class="text-red-500">Silver Prize</span> in the 6th China International ‘Internet Plus’ Innovation and Entrepreneurship Competition among college students</span> - UESTC</p>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HonorTimeLine'
};
</script>

<style lang="scss" scoped>
.resume-section {
  color: white;

  .section-title {
    width: 300px;
    padding: 10px 0;
    text-align: center;
    border-radius: 3px;
  }

  .section-list {
    position: relative;
    margin-top: 30px;

    li {
      position: relative;
      margin-bottom: 50px;

      .index {
        position: absolute;
        left: -15px;
        width: 30px;
        height: 30px;
        background-color: red;
        border-radius: 50%;
      }

      p {
        margin-bottom: 5px;
        }

      .content {
        color: #909090;
      }
    }
  }
}
</style>
