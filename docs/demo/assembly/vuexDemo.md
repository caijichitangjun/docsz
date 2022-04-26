---
title: 状态管理器Vuex
description: 'vue-cli搭建的项目的相关内容简介'
date: ''
sidebar: 'auto'
categories: 
 - vue
tags: 
 - vue
 - Vuex
prev: ./slot
next: ./tryRouter
publish: true
---

## Vuex
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式库。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。  
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这是官网对Vuex的定义，用更通俗的话来说就是存储着任何组件都可使用的数据和方法的集合体。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用Vuex方法如下:
> 1. 在src文件夹下创建store文件夹，在store文件中创建store.js（也可以创建在你想要的位置，这个看个人习惯）  
```
  import Vue from 'vue'    
  import Vuex from 'vuex'       
  Vue.use(Vuex)         
  const actions = {  // 响应组件中用户的动作，分发任务给actions或mutations
    storeAction (context, value) {
      context.commit('storeMutation', value)
    }
  }  
  const mutations = {  // 响应组件中用户的动作或接收到actions指令，修改state中的数据
    storeMutation (state, value) {
      state.sum++
      comsole.log(value)
    }
  }  
  const state = {   // 存储数据
    sum:1,
    time:'我是字符串'
  }   
  const getters = {   // 为组件提供获取state数据的方法
    getSum(state){    // 这里的state不是使用getters时传递的数据，而是vuex的设计者为使用getters的用户提供的，用于访问state。
      return state.sum
    }
  }  
  export default new Vuex.Store({  //创建并暴露store
    actions,
    mutations,
    state,
    getters
  })   
```
> 2. 在main.js中引入创建的store.js  
```
  import store from './store/store'
  new Vue({
    el:'#app',
    render: h => h(App),
    store
  })
```
> 3. 完成1和2的设置后，this关键字就可以访问到$store，进而访问到store.js中定义的东西。  
>> + 读取数据: $store.state  
>> + 获取数据: $store.getters  
>> + 简单修改state: $store.commit('mutations中的方法名',数据)  
>> + 复杂修改state: $store.dispatch('action中的方法名',数据)  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;看完上面可能大家有些疑惑，我们直接将修改操作发送到mutations，由mutations中定义的方法完全可以完成修改state数据的需求，为什么非要加上actions用于分发任务。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;事实上，在 mutations 中混合异步调用会导致你的程序很难调试，例如，当你调用了两个包含异步回调的 mutations 来改变状态，你怎么知道什么时候回调和哪个先回调呢？因此为了避免这类困境也为了处理异步问题，需要我们为复杂的任务提供一个可缓冲的区域actions，用于分发任务到mutations。这个地方可以参照[Vuex官网](https://vuex.vuejs.org/zh/guide/mutations.html)。

## 四个map

### mapState
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`import { mapState } from './store/store'`  
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mapState的作用是帮我们获取到store.js中的数据类似于`$store.state`。示例如下：  
```
以计算属性的形式为获取的state数据命名:
  computed:{
    sum(){
      return this.$store.state.sum;
    },
    time(){
      return this.$store.state.time;
    }
  }

使用mapState：
  对象写法：
    computed:{
      ...mapState({sum:'sum',time:'time'})
    }
  数组写法：(要求计算属性名与store中定义的getters方法名相同)
    computed:{
      ...mapState(['sum','time']),
    }
```

### mapGetters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`import { mapGetters } from './store/store'`  
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mapGetters的作用是帮我们通过在store.js中定义的getters方法获取state数据，类似于`$store.getters`。示例如下：  
```
以计算属性的形式为获取的state数据命名:
  computed:{
    getSum(){
      return this.$store.getters.getSum;
    },
  }

使用mapGetters：
  对象写法：
    computed:{
      ...mapGetters({getSum:'getSum'})
    }
  数组写法：(要求计算属性名与store中定义的state数据名相同)
    computed:{
      ...mapGetters(['getSum']),
    }
```

### mapActions
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`import { mapActions } from './store/store'`  
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mapActions的作用是帮我们通过在store.js中定义在actions方法分发任务到mutations，类似于`$store.dispatch()`。示例如下：  
```
以计算属性的形式为获取的state数据命名:
  methods:{
    storeAction(){
      this.$store.dispatch('storeAction', this.text)
    }
  }

使用mapActions：
  对象写法：
    computed:{
      ...mapActions({storeAction:'storeAction'})
    }
  数组写法：(要求计算属性名与store中定义的mutations中定义的方法名相同)
    computed:{
      ...mapActions(['storeAction']),
    }
  参数传递问题：
    在调用是写在小括号里，如storeAction(this.text)
```


### mapMutations
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`import { mapMutations } from './store/store'`  
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mapMutations的作用是帮我们通过在store.js中定义在mutations的方法直接处理state中的数据，类似于`$store.commit()`。示例如下：  
```
以计算属性的形式为获取的state数据命名:
  methods:{
    storeMutation(){
      this.$store.commit('storeMutation', this.text)
    },
  }

使用mapMutations：
  对象写法：
    computed:{
      ...mapMutations({storeMutation:'storeMutation'})
    }
  数组写法：(要求计算属性名与store中定义的mutations定义的方法名相同)
    computed:{
      ...mapMutations(['storeMutation']),
    }
  参数传递问题：
    在调用是写在小括号里，如storeAction(this.text)
```

## 自定义命名空间
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在项目开发中，不可能将所有的开发人员的数据和方法代码写在一起，庞大的代码片段的维护工作就是一个难题，也有命名冲突的问题，因此需要为每位创作者提供一个自命名空间。  
```
开启自命名空间并使用：
  const countAbout = {
    namespaced:true,  //开启命名空间
    state:{
      x:1
    },
    mutations: { ... },
    actions: { ... },
    getters: { ... }  
  }
  // 省略 personAbout   
  const countAbout = { ... }
  const store = new Vuex.Store({
    modules: {
      countAbout, 
      personAbout,    
    }   
  })
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因为自命名空间的使用，在基础的store使用中也有一定的更改，如下：
```
state:
  1. this.$store.state.countAbout.sum
  2. ...mapState('countAbout', {sum:'sum'})
  3. ...mapState('countAbout', ['sum'])
getters:
  1. this.$store.getters['countAbout/getSum'] 
  2. ...mapState('countAbout', {getSum:'getSum'})
  3. ...mapState('countAbout', ['getSum'])
mutations:
  1. this.$store.commit('personAbout/storeAction',person) 
  2. ...mapState('personAbout', {storeAction:'storeAction'})
  3. ...mapState('personAbout', ['storeAction'])
actions:
  1. this.$store.dispatch('personAbout/storeMutation',person) 
  2. ...mapState('personAbout', {storeMutation:'storeMutation'})
  3. ...mapState('personAbout', ['storeMutation'])
```

