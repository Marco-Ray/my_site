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
            <ul class="content hidden lg:block">
              <li>
                Programmed a request by Python to access more than 300,000 data on the server offered by Meituan Shared Bike, then performed data cleaning by using Numpy and Pandas, two famous Python libraries.
              </li>
              <li>
                In order to explore and analyze riding pattern based on riding routes during the period of resuming work and production, visualized the cleaned data on the map by Javascript and the API of Amap Location Based Services with heat map in various time scales.
              </li>
              <li>
                To also put POIs (Points of Interest) into account to make the discovered pattern more explicable, implemented Latent Dirichlet Allocation algorithm to classify city functional areas, and finally explored and analyzed some riding patterns, such as Police Pattern, Doctor Pattern, and Worker Pattern.
              </li>
              <li>
                Conclusion——During the period of resuming work and production, people prefer to commute by bicycle, which mainly refers to shared bicycle, in order to reduce the risk of close contact with others when using public traffic. And for offering great help with polices, doctors and workers, Meituan shared Bicycles played a vital role in resuming work and production against the COVID-19.
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div class="pl-10">
            <div class="index"></div>
            <p class="text-red-500">Nov 2020 - Apr 2021</p>
            <p class="text-red-500"><span class="text-xl text-white">Image Restoration Algorithm for X-Ray Non-destructive testing Images of  Lithium Battery </span> - Chengdu China</p>
            <ul class="content hidden lg:block">
              <li>
                In order to improve the accuracy of X-Ray Non-destructive testing, reproduced and simulated the Image Restoration Algorithm based on Deep Image Prior by Pytorch to restore the X-ray Deep Image of power lithium battery.
              </li>
              <li>
                Because of large scale holes in the images, introduced SDN (Spatial Dependency Network) Layer into the algorithm to establish a connection between missing pixels and known pixels at a distance, which could overcome the flaw of Deep Image Prior that missing pixels could only be reconstruct according to neighborhood pixels which are often missing in this project too, then optimized the algorithm by adusting hyperparameters and network structure to improve the peformance.
              </li>
              <li>
                Compared and analysed the performance of the algorithms under different areas of holes using PSNR, Cosine similarity and SSIM. Because of the SDN Layer, the algorithom proposed in this project could converge faster while restoring more details.
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
