<template>
  <div>
    <div v-text="firstName"></div>
    <h2>把n放大10倍:<span v-big="n"></span></h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    trySomething() {
      item = document.getElementById;
    },
  },
  beforeUnmount() {
      
  },
  unmounted() {
      
  },
  directives: {
    big(element, binding) {
      element.innerText = binding.value * 10;
    },
  },
};
</script>

<style scoped >
/* scoped是用于控制组件时的命名冲突问题 */
[v-cloak] {
  display: none;
}
</style>
