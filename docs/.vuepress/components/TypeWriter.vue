<template>
  <div class="typer">
    <span class="auther">{{ auther }}</span>
    <div class="typer-content">
      <!-- 动态变化的内容-->
      <p class="typer-dynamic">
        <span class="cut">
          <span v-for="(letter, index) in words" :key="index">{{
            letter
          }}</span>
        </span>
        <!-- 模拟光标-->
        <span class="typer-cursor"></span>
      </p>
    </div>
    <router-link class="route" to="/tag">启程↗️🚢</router-link>
  </div>
</template>


<script>
export default {
  name:'TypeWriter',
  data() {
    return {
      auther: 'QianXiao',
      words: [], //字母数组push，pop的载体
      strs: ["风吹过面颊，是否能回想起...","曾经向往着长大，如今却只剩回忆","作为一条咸鱼，也想翻下身子","浅笑的个人空间欢迎你"],  //文字的汇集区
      order: 0,  //表示当前是第几句话
      str: "风吹过面颊，是否能回想起...", //str初始化
      letters: [], //str分解后的字母数组
    };
  },
  watch: {
    //监听order值的变化，改变str的内容
    order() {
      this.str = this.strs[this.order]
    },
  },
  mounted() {
    //页面初次加载后调用begin()开始动画
    this.begin();
  },
  methods: {
    //开始输入的效果动画
    begin() {
      this.letters = this.str.split("");
      for (var i = 0; i < this.letters.length; i++) {
        setTimeout(this.write(i), i * 100);
      }
    },
    //开始删除的效果动画
    back() {
      let L = this.letters.length;
      for (var i = 0; i < L; i++) {
        setTimeout(this.wipe(i), i * 50);
      }
    },
    //输入字母
    write(i) {
      return () => {
        let L = this.letters.length;
        this.words.push(this.letters[i]);
        let that = this;
        /*如果输入完毕，在2s后开始删除*/
        if (i == L - 1) {
          setTimeout(function () {
            that.back();
          }, 2000);
        }
      };
    },
    //擦掉(删除)字母
    wipe(i) {
      return () => {
        this.words.pop(this.letters[i]);
        /*如果删除完毕，在300ms后开始输入*/
        if (this.words.length == 0) {
          this.order = (this.order + 1) % 4;
          let that = this;
          setTimeout(function () {
            that.begin();
          }, 300);
        }
      };
    },
  },
};
</script>


<style scoped>
.typer {
  margin-top: 2%;
  box-sizing: border-box;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
}
.typer .typer-content {
  font-weight: bold;
  font-size: 22px;
  display: flex;
  flex-direction: row;
  letter-spacing: 2px;
}
.typer-dynamic {
  position: relative;
}
.cut {
  color: #e84d49;
}
.typer-cursor {
  position: absolute;
  height: 100%;
  width: 3px;
  top: 0;
  right: -10px;
  background-color: #e84d49;
  animation: flash 1.5s linear infinite;
}
.auther{
  font-size: 40px;
}
.study{
  background-color: transparent; /* Green */
  border: none;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 26px;
}
.route{
  font-size: 26px;
  color: rgb(96, 235, 182);
}
</style>

