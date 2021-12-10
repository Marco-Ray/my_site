<template>
  <div class="resume-section">
    <div class="section-title text-3xl border-gray-500 border-4">
      Selective Coursework
    </div>

<!--    wowjs已经在父组件中加载-->
    <div class="section-list wow animate__fadeInRight">
      <div class="block w-1 bg-red-500 absolute h-full transform -translate-x-1/2"></div>

      <ul>
        <li>
          <div class="pl-10">
            <div class="index"></div>
            <p class="text-red-500">Jul - Aug 2020</p>
            <p class="text-red-500"><span class="text-xl text-white">A Playing Cards Detector with Calc24 Based on Deep Learning</span> - Chengdu China</p>
<!--            <ul class="content hidden lg:block">-->
<!--            </ul>-->
          </div>
        </li>
        <li>
          <div class="pl-10">
            <div class="index"></div>
            <p class="text-red-500">Sep - Oct 2020</p>
            <p class="text-red-500"><span class="text-xl text-white">A face detector implemented by three different ways</span> - Chengdu China</p>
<!--            <ul class="content hidden lg:block">-->
<!--            </ul>-->
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
        margin-left: 15px;

        li {
          list-style: disc;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
