---
title: vue基础-事件监听
description: '在进行项目讲解前的vue基础讲解'
date: ''
sidebar: 'auto'
categories: 
 - vue
tags: 
 - vue
 - binding
prev: ./vuedata
next: ./calcuAndMonitor
publish: true
---

## 事件处理

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;前文我们介绍了在vue中的数据绑定，也简单介绍了数据绑定的原理。这本文中我们要介绍的是vue的事件监听。
```html
<!-- 基本写法： -->
  <template>
    <div>
      <el-button v-on:click="trySomething">点击</el-button>  //v-on:click --> @click
    </div>
  </template>
```
```js
  // js-->methods
  methods: {
    trySomething(){
      console.log("我触发了一个点击事件")
      return "你好"
    }
  },
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这里我们展示是点击事件的写法，以及简写形式。在项目开发中仅仅只有点击事件我们无法完成很多复杂的任务，例如说hover触发、更改value值触发等，因此我们需要使用与功能匹配的时间修饰符。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当然如果你使用了类似于[element-ui](https://element.eleme.cn/#/zh-CN/component/installation)的组件库，每一个组件它都会为你提供很多的方法供你使用。

### 事件使用
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在html和js中如果需要调用某个函数，trySomething和trySomething()在没有参数的情况下是一样的，有参数的话自然选择后一种。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当函数有返回值且想要将返回值显示在页面上，则可以```<div style="color:green">{{ trySomething() } }</div>```，显示效果为<span style="color:green">你好</span>。<span style="color:red">注意：这里必须携带(),否则会将整个函数作为插入的内容展示</span> 。**[ 我是实在没想到，写在md代码区内也会被解析，所以这里的格式有点问题，右边的双花括号间多了个空格，不便之处还请见谅 ]**

### 事件修饰符

`@click.prevent/stop/... = "trySomething"`
> 事件修饰符
> 1. prevent:阻止默认事件（常用）;比如阻止a标签的跳转
> 2. stop:阻止事件冒泡（常用）;
> 3. once:事件只触发一次（常用）;
> 4. capture:使用事件的捕获模式;
> 5. self:只有event.target是当前操作的元素是才触发事件;
> 6. passive:事件的默认行为立即执行，无需等待事件回调执行完毕;

### 键盘事件

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;事件修饰符大多是用于解决事件的捕获与触发的问题，如果我们希望在键盘按下某些键，例如enter、Q、W等时触发事件时，就需要使用到键盘事件了。

`@keyup/keydown.enter/delete/... = "trySomething"`
> 键盘事件
> 1. keyup/keydown：分别为键盘抬起和按下
> 2. 事件修饰符
>> 回车 ==> enter  
>> 删除 ==> delete （这里有两个键，删除del和回退[加号和等号旁]都可以触发，）  
>> 退出 ==> esc  
>> 空格 ==> space  
>> 制表符 ==> tab  （这个键有点特殊，必须和keydown配合）  
>> 上 ==> up  
>> 下 ==> down  
>> 左 ==> left  
>> 右 ==> right  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;假设上面的9个事件修饰符不满足你的要求，在vue2中可以自己指定。我们知道键盘的每一个键都有自己的键名和键值。因此我们可以使用@keyup/keydown.+键名的方法绑定该键的键盘事件，<span style="color:red">注意：当键名为两个或以上单词时，这时需要首字母小写，且单词间以'-'连接</span>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;键有键值和键名，键名可以作为键盘事件的修饰，自然键值也可以作为键盘事件的修饰。<span style="color:red">注意：在vue3中此功能已被废弃，因为兼容问题</span>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;键值除了作为键盘事件的修饰，也可以用于自定义键名。`Vue.config.keyCodes.自定义键名 = 键值`<span style="color:red"> 注意：在vue3中此功能也已被废弃，因为兼容问题且究其根本还是使用了键值</span>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在上文的介绍中我们知道有一个键有点奇怪—tab,原因是，tab键原本就有修改焦点的作用，当使用keyup时，未等键抬起，焦点已经转移且新获取焦点的元素没有绑定键盘事件，自然事件就会‘失效’，和这个类似的键还有四个:ctrl、Alt、Shift、meta/win,有两种解决方法。  

> 特殊的键盘按键
> 1. 配合keyup使用时，需要按下修饰键的同时，再按下其他键，随后释放其他键，这时定义事件才会正常触发
> 2. 配合keydown使用时，正常触发。


