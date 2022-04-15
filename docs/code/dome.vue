<template>
  <div>
    <h2>{{ shwoInfo }}</h2>
    <span style="color:red"></span>
  </div>
</template>

<script>
export default {
  name: "BreadCrumb",
  data() {
    return {
      shwoInfo: "我是一个组件", 
    }
  },
};
</script>



