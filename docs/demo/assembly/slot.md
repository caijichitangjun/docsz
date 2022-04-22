---
title: 插槽
description: 'vue-cli搭建的项目的相关内容简介'
date: ''
sidebar: 'auto'
categories: 
 - vue
tags: 
 - vue
prev: ./agent
next: ./vuexDemo
publish: true
---

## 插槽
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**什么是插槽？**  
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在vue中，我们将网页分成各种组件，方便同事的复用和维护。但在开发过程中，往往会有这样的情况，有些组件结构很相似，只是某一个功能可能有点小差别，因此在组件划分时，因为某些原因可能会划分为两个不同的组件，但实质上我们希望的是将其作为一个组件来进行复用，在这种情况下，我们就可以使用到插槽。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;以通俗的语言来理解是，在组件内部预留出一个位置，在调用组件的地方以不同的功能填充，如果没有需要填充的内容，则显示默认的内容。

### 默认插槽
```
子组件：
  <template>
    <div>
      <slot>这是默认插槽，如果没有填充，会显示这行文字</slot>
    </div>
  </template>

  <script>
  export default {
    name: "trySlot",
  };
  </script>
父组件：
  <template>
    <div>
      <h3>{{text}}</h3>
      <TrySlot>
        <h4>这里的内容会作为插槽的填充内容显示在子组件范围内</h4>
      </TrySlot>
    </div>
  </template>

  <script>
  import trySlot from "./trySlot";
  export default {
    name: "tryAll",
    components:{trySlot},
    data() {
      return {
        text:"这里是父组件"
      };
    },
  };
  </script>
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;假设插槽有设定好的样式，无论是写在父组件内还是写在子组件内都会生效，即父组件会带着插槽所需要的一切去往子组件。

### 具名插槽
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当我们有多个需要插入的功能时，就需要为插槽命名，指定功能插入的位置。
```
子组件：
  <slot name="NameSlot">这是具名插槽，如果没有填充，会显示这行文字</slot>

父组件：
  <TrySlot>
    <h4 slot="NameSlot">这里的内容会作为插槽的填充内容显示在子组件范围内</h4>
  </TrySlot>
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当有一大段的功能代码需要放在插槽某一位置上时，如果不想多次写`slot="NameSlot"`，可以使用`template`标签来对放在同一位置的插槽内容进行包裹，此时`slot="NameSlot"`有第二种写法`v-slot:NameSlot`，此种写法仅适用于`template`标签。
```
父组件：
  <TrySlot>
    <template v-slot:NameSlot>
      <h4>功能1</h4>
      <h4>功能2</h4>
      <h4>功能3</h4>
      <h4>功能4</h4>
    </template>
  </TrySlot>
```

### 作用域插槽
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一般作用于数据在子组件内部，但外部的父组件插槽插入内容时需要使用子组件的数据值。
```
子组件：
  <slot :slotData="slotData">这是具名插槽，如果没有填充，会显示这行文字</slot>

父组件:
  <TrySlot>
    <template scope="getSlotData">
      <h4>{{getSlotData.slotData}}</h4>
    </template>
  </TrySlot>
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在子组件内将父组件需要的值以绑定的形式传递给父组件，父组件在接收时，插槽的内部第一层必须为`template`标签，用于接收所有子组件传递的数据，数据为对象形式。

