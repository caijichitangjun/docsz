<template>
  <div class="test">
    <img src="/assets/img/hero.png" alt="">
    <TypeWriter/>
  </div>
</template>

<script>
import TypeWriter from './TypeWriter.vue'
export default {
  components: { TypeWriter },
  data() {
    return {
      
    }
  },
  created() {},
  mounted() {},
  methods: {
    
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
