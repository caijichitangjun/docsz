---
title: vue基础-生命周期
description: '在进行项目讲解前的vue基础讲解'
date: ''
sidebar: 'auto'
categories: 
 - vue
tags: 
 - vue
prev: ./otherInstructions
next: ../assembly/assembly
publish: true
---

## 生命周期
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**什么是生命周期？**  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;以我们自己举例，受精卵形成的那一刻是我们生命的开始，身体最后一个器官停止运动后是我们生命的结束，这就可以视为一个生命周期。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在vue中，我们new一个Vue的实例时就代表vue的生命开始了，我们关闭页面时就代表vue的生命结束了。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当然在vue项目中，我们使用的往往不是直白的vue实例对象，我们使用的是一个组件，那么组件的生命在它被调用时开始，在切换为下一个组件时终止。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当然在生命周期中，我们很多时候往往在意的不是新生和终结这两个时间节点，我们在意的是，它一生干了什么？在vue项目中我们关注的有8个时刻，被称为生命周期钩子，代表着整个周期内的关键节点的所作所为。  

### 8大生命周期钩子（vue2）
> 1. beforeCreate:Vue实例创建前  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这时Vue实例还没创建呢！自然无法通过VM访问到data中数据、methods中方法  
> 2. created:Vue实例创建后  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这时Vue实例已经创建，可以通过VM访问到data中数据、methods中方法  
> 3. beforeMount:dom挂载到页面前  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页面呈现的是未经Vue编译的DOM结构。而且此时所有对DOM的操作，最终都不奏效。  
> 4. mounted:dom挂载到页面后  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页面呈现的是已经经Vue编译的DOM结构。此时可以操作dom，如开启定时器、发送网络请求等  
> 5. beforeUpdate:页面更新前  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;此时页面还未更新，因此页面上展示的内容还是未更改的数据。  
> 6. updated:页面更新后  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;此时页面已经更新，因此页面上展示的内容还是更改的数据。  
> 7. beforeDestroy:销毁前  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这是所有的内容都是可用的，一般用于关闭定时器，解绑自定义事件等。一般不推荐此时操作元素，因为其就要被销毁了，还折腾它干嘛！  
> 8. destroyed:销毁后  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;人都牺牲了，就别折腾它了！  

![生命周期演示图](../imgs/basis/lifeCycle2.png)

### 两个新的生命周期钩子及vue3的变化
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为什么要引入这两个生命周期钩子？  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在我们引入route路由时，页面通过路由跳转时，beforeDestroy会有点小问题。因为我们仅仅是跳转了界面，更换了显示内容，原内容仍然被保存着并没有被销毁，所以原先写在beforeDestroy的内容并没有被执行，所以就要用到新的生命周期钩子
> 1. activated:路由组件激活时  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过路由跳转进入该路由界面时，此时原本写在mounted的打开定时器等操作就可以写在activated中实现。  
> 2. deactivated:路由组件失活时  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过路由跳转离开该路由界面时，此时原本写在beforeDestroy的内容都可以写在activated中实现。  
> 3. beforeDestroy:销毁前  ===> beforeUnmount:卸载前   
> 4. destroyed:销毁后  ===> unmounted:卸载后

![生命周期演示图vue3](../imgs/basis/lifecycle3.svg)
