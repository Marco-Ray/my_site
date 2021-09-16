<template>
  <div class="resume-section">
    <div class="section-title text-3xl border-gray-500 border-4">
      Selective Coursework
    </div>

    <div class="section-list">
      <div class="block w-1 bg-red-500 absolute h-full transform -translate-x-1/2"></div>

      <ul>
        <li>
          <div class="pl-10">
            <div class="index"></div>
            <p class="text-red-500">Jul - Aug 2020</p>
            <p class="text-red-500"><span class="text-xl text-white">A Playing Cards Detector with Calc24 Based on Deep Learning</span> - Chengdu China</p>
            <ul class="content hidden lg:block">
              <li>
                Collected 722 pictures taken manually with different background conditions, then labelled them via LabelImg and enlarged the dataset to 1352 pics by implementing data augmentation, e.g. rotation, exposure adjustment, histogram equalization.
              </li>
              <li>
                Built a GPU deep learning environment with TensorFlow Object Detection API.
              </li>
              <li>
                Established a Faster R-CNN-based object detector to real-time recognize playing card’s positions and ranks.
              </li>
              <li>
                Implemented a 24 game algorithm to recognize the pictures with 24-point calculation conclusions and output the calculation expression.
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div class="pl-10">
            <div class="index"></div>
            <p class="text-red-500">Sep - Oct 2020</p>
            <p class="text-red-500"><span class="text-xl text-white">A face detector implemented by three different ways</span> - Chengdu China</p>
            <ul class="content hidden lg:block">
              <li>
                Collected 3450 postive samples of face and 9000 negative samples.
              </li>
              <li>
                Implemented a Gaussian skin color normalized probability model to detect face using the matlab library facepartdetect as baseline.
              </li>
              <li>
                Using the matlab library facepartdetect as baseline, trained an Adaboost model by OpenCV to detect face, including the process of image pre-processing.
              </li>
            </ul>
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
