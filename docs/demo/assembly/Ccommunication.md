---
title: 组件间通信
description: 'vue-cli搭建的项目的相关内容简介'
date: ''
sidebar: 'auto'
categories: 
 - vue
tags: 
 - vue
 - assembly
prev: ./storaged
next: false
publish: true
---

## 通信配置
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;前面我们讲过ref属性、props配置、mixin混合、plugin插件、cookie本地存储，这些都可以作为数据传递的工具。在本文中我们介绍的是自定义事件、全局事件总线、消息订阅与发布。

### 自定义事件
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;自定义事件主要适用于子组件向父组件传递数据，和我们介绍过的props比较类似。  
```
  <template>
    <div>
      <el-button @click="triggerCustomEvent"></el-button>
    </div>
  </template>

  <script>
  export default {
    name: "triggerCustomEvent",
    data() {
      return {
        name:'组件内',
      }
    },
    methods:{
      triggerCustomEvent(){
        this.$emit('bindEvent',name)
        // 
      }
    }
  };
  </script>
```
```
  <template>
    <div>
      <student v-on:bindEvent="testCustomEvent"/>
      <!-- <student @bindEvent="testCustomEvent"/> -->
      <!-- bindEvent就是我们自定义的事件名 -->
    </div>
  </template>

  <script>
  import student from './student'
  export default {
    name: "testCustomEvent",
    components:[student],
    data() {
      return {

      }
    },
    methods:{
      testCustomEvent(name){
        console.log("自定义事件被触发了",name)
      }
    }
  };
  </script>
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们通过v-on:或@加自定义事件名的方式可以为子组件绑定一个自定义事件，在子组件内需要传递数据的地方触发这个自定义事件即可`this.$emit('bindEvent',name)`，当然这是可以携带参数的。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;绑定自定义事件的方法并非只能使用v-on:或@这种形式，我们还可以通过ref手动为子组件绑定事件。因为我们知道带有ref属性的标签在我们使用`this.$refs.refvalue`(refvalue代表ref属性值)后，会获取到该标签的所有内容，那么自然可以为其绑定自定义事件。如`this.$refs.refvalue.$on('bindEvent',this.testCustomEvent)`，这样绑定后在子组件内需要传递数据的地方触发这个自定义事件`this.$emit('bindEvent',name)`也可以完成一样的功能。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用ref绑定自定义事件时略显繁琐，通常对于绑定事件有条件要求，如当是人的时候绑定，是动物不绑定等时，我们才会使用这种方法，否则还是v-on:或@这种形式。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;能绑定自定义事件，自然可以解绑，方法也很简单，在子组件内`this.$off('bindEvent')`；同时解绑多个时，this.$off的参数为一个数组；没有参数时默认解绑所有的自定义事件。  

### 全局事件总线
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;全局事件总线负责的任务是实现任意两个组件间的通信，像一个对讲机一样。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果需要实现任意两个组件间的通信，那么就需要每一个组件都可以访问到全局事件总线，其次全局事件总线必须有\$off、\$emit、\$on这些Api。不知道大家记不记得我们在介绍组件的时候和大家提到过只要是Vuecomponents缔造的组件实例对象，他们的祖辈最终都指向了Vue的构造者，在Vue上为其添加一个Vue实例对象当做傀儡不就行了。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;问题随之而来，怎么拿到拿到Vue的实例对象？  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;仔细回想下，我们好像创建过Vue的实例对象，实在介绍render和createApp时，好像这两个函数所处的位置就是帮我们创建Vue的实例对象，同时，我们在介绍Vue模版和Vue组件时还想提到过this的指向问题，好像创建Vue实例对象时，其内部的this好像就指向创建的Vue实例对象。说到这里，问题就都解决了。  
```
main.js中
  new Vue({
    el:'root',
    render:h => h(App)
    beforeCreate() {
      Vue.prototype.$bus = this
      // 注意添加全局事件总线的时机，一定要在App组件挂载完绑定好全局事件总线,($bus)就是安装的全局事件总线，当然你也可以叫其他名，开心就好！
    },
  })
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">Vue3中删除了\$on、\$off等自带的自定义事件相关方法，如果仍要使用全局事件总线，需要使用mitt库来实现，本处不对其讲解，如有需要联系博主添加该内容或参考[Vue3笔记_mitt库](https://blog.csdn.net/qq_41196217/article/details/120695349)</span>

### pubsub插件
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pubsub为消息的订阅与发布，适用于任意组件间通信。
> 1. 安装pubsub:  npm i pubsub-js
> 2. 引入: 在需要的地方使用 import pubsub from 'pubsub-js'
> 3. 接收数据:A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身。
```
  methods(){  
    demo(name){    // 订阅消息后触发的事件
      
    }
  },
  mounted() {
    this.pid = pubsub.subscribe('pubsubInfo", this.demo)  //订阅消息
  }
```
> 4. 提供数据与订阅消息: pubsub.publish('pubsubInfo", name)  
> 5. 最好在beforeDestroy钩子中，用PubSub.unsubscribe(pid)去取消订阅。

