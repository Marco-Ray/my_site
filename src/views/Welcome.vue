<template>
  <div class="welcome">
    <section>
      <div class="item">
        <div class="word">Welcome</div>
        <div class="word">Welcome</div>
        <router-link to="/home" class="enter" tabindex="-1">
          to Zehuan Wang's world
        </router-link>
      </div>
      <div class="dailySentence">
        <p id="hitokoto_text">
          {{ hitokoto }}
          <span :style="{'display': (hitokoto === 'Loading ...') ? 'none' : 'block'}"><br> —— {{ author }}</span>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data() {
    return {
      hitokoto: 'Loading ...',
      author: 'unknown'
    }
  },
  mounted() {
    this.getDailySentence()
  },
  methods: {
    getDailySentence() {
      this.axios.get('https://v1.hitokoto.cn?c=d&c=i&c=k')
        .then(({ data }) => {
          this.hitokoto = data.hitokoto ? data.hitokoto : 'Loading ...'
          this.author = data.from_who ? data.from_who : 'unknown'
        })
        .catch(console.error)
    }
  }
};
</script>

<style lang="scss" scoped>
.welcome {
  width: 100%;
  height: 100vh;
  background: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
}

section {
  position: relative;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  .item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .word {
      padding: 0 20px;
      color: red;
      font-style: italic;
      font-weight: bold;
      font-size: 7vw;
      top: 0;
      opacity: 1;
      transition: top 0.5s, opacity 0.5s;

      /* 切割文字效果 */
      &:nth-child(1) {
         position: absolute;
       // 上半
       clip-path: polygon(0% 0%, 100% 0%, 100% 51%, 0% 51%);
      }
      &:nth-child(2) {
         position: relative;
       // 下半
       clip-path: polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%);
      }
    }

    .enter {
      position: absolute;
      color: #fff;
      text-decoration: none;
      opacity: 0;
      transition: opacity 0.5s;
      border: 0;
      font-size: 2vw;

      &:hover {
        text-decoration: underline;
      }
    }

    // 文字上半部分上移
    &:hover .word:nth-child(1) {
      top: -40px;
      opacity: 0.5;
      transition: top 0.5s, opacity 0.5s;
    }
    // 文字下半部分下移
    &:hover .word:nth-child(2) {
      top: 40px;
      opacity: 0.5;
      transition: top 0.5s, opacity 0.5s;
    }
    &:hover .enter {
      opacity: 1;
      transition: opacity 0.5s;
    }
  }

  .dailySentence {
    width: 100%;
    position: absolute;
    bottom: -140%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-align: center;
    filter: blur(0);
    transform: scale(1);
    transition: filter 0.5s, transform 0.5s;
  }

  // 触发景深效果
  &:hover .dailySentence {
    filter: blur(2px);
    transform: scale(0.95);
    transition: filter 0.5s, transform 0.5s
  }
  // 取消景深效果
  & .dailySentence:hover {
    filter: blur(0);
    transform: scale(1);
  }
}
</style>
