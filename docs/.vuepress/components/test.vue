<template>
  <div class="test">
    <img src="../public/assets/img/hero.png" alt="">
    <!-- <img src="/assets/img/hero.png" alt=""> -->
    <TypeWriter/>
  </div>
</template>

<script>
import TypeWriter from './TypeWriter.vue'
export default {
  components: { TypeWriter },
  mounted() {
    this.init();
  },
  methods: {
    init(){
      // console.log(this.$frontmatter)
    }
  },
}
</script>

<style scoped >
.test{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
img{
  width: 100%;
  height: 100%;
}

</style>
