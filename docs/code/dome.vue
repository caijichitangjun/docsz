<template>
  <div>
    <el-button @click="triggerCustomEvent"></el-button>
  </div>
</template>

<script>
export default {
  name: "BreadCrumb",
  data() {
    return {
      name:'组件内',
    }
  },
  methods:{
    triggerCustomEvent(){
      this.$emit('testCustomEvent',name)
    }
  }
};
</script>



