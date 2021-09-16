<template>
  <div class="resume-section">
    <div class="section-title text-3xl border-gray-500 border-4">
      Research Experience
    </div>

    <div class="section-list">
      <div class="block w-1 bg-red-500 absolute h-full transform -translate-x-1/2"></div>

      <ul>
        <li>
          <div class="pl-10">
            <div class="index"></div>
            <p class="text-red-500">May - Aug 2020</p>
            <p class="text-red-500"><span class="text-xl text-white">Research on the role of Meituan shared bicycles in resuming work and production against the COVID-19</span> - Chengdu China</p>
          </div>
        </li>
        <li>
          <div class="pl-10">
            <div class="index"></div>
            <p class="text-red-500">Nov 2020 - Apr 2021</p>
            <p class="text-red-500"><span class="text-xl text-white">Image Restoration Algorithm for X-Ray Non-destructive testing Images of  Lithium Battery </span> - Chengdu China</p>
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
    width: 350px;
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
