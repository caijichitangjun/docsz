<template>
  <div>
    <h3>{{ text }}</h3>
    <TrySlot>
      <h4 slot="NameSlot">这里的内容会作为插槽的填充内容显示在子组件范围内</h4>
    </TrySlot>
    <slot name="NameSlot">这是具名插槽，如果没有填充，会显示这行文字</slot>
  </div>
</template>

<script>
import trySlot from "./trySlot";
export default {
  name: "tryAll",
  components: { },
  props: [],
  data() {
    return {};
  },
  created() {},
  computed: {},
  watch: {},
  methods: {},
};
</script>



