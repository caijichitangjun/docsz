---
title: 过渡与动画
description: 'vue-cli搭建的项目的相关内容简介'
date: ''
sidebar: 'auto'
categories: 
 - vue
tags: 
 - vue
 - animation
prev: ./Ccommunication
next: ./agent
publish: true
---

### 自定义动画
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vue动画的作用，在插入、更新或移除DOM元素时，在合适的时候给元素添加样式类名。
```css
@keyframes tryAnimation {    /**效果相当于元素从远方到面前 */
  from{          
    transform: translateX(-100%);
  }
  to{
    transform: translateX(0px);
  }
}
.v-enter-active{
  animation: tryAnimation 0.5s;
}
.v-leave-active{
  animation: tryAnimation 0.5s reverse;
}
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在vue中如果需要对某些元素或标签添加动画，不必动态的更改class，而是在需要动画的内容外部添加`<transition></transition>`标签，这样vue会自动帮我们动态的更换class，而且编译时也会忽略transition标签，不会破坏dom结构。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;要使用transition标签，我们需要为其准备好可供切换的样式，命名是固定的。  
> 元素进入的样式  
> 1. v-enter：进入的起点   
> 2. v-enter-active：进入过程中  
> 3. v-enter-to：进入的终点  

> 元素离开的样式  
> 1. v-leave：离开的起点  
> 2. v-leave-active：离开过程中  
> 3. v-leave-to：离开的终点  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v-enter、v-enter-to、v-leave、v-leave-to中相当于定义的是@keyframes中的from和to的内容，v-enter-active和v-leave-active则是标识着内容是怎么离开的！比如说离开时间、离开速度等。  
> transition标签属性  
> 1. name: 为每个过度动画添加标识，此时样式命名  v  ===>  'name的value值'  
> 2. appear: 在初始时触发一次动画。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当需要定义多个动画时需要将transition标签更换为transition-group标签，并且为每一个动画添加上唯一的key值。  
<span style="color:red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 在vue3中，v-leave更名为v-leave-from，v-enter更名为v-enter-from</span>

### 集成动画库
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在npm中有一个[Animate.css动画库](https://animate.style/)。使用如下：  
> 1. 下载 npm install animate.css  
> 2. 引入：import 'animate.css'  
> 3. 使用如下  
>> 添加class：class="animate__animated animate__bounce"  
>> 选择进入动画：enter-active-class:'animate__jello'  
>> 选择离开动画：leave-active-class:'animate__bounceOutDown'  


