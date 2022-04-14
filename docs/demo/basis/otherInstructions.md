---
title: vue基础-vue其他指令
description: '在进行项目讲解前的vue基础讲解'
date: ''
sidebar: 'auto'
categories: 
 - vue
tags: 
 - vue
prev: ./listRendering
next: ./lifeCycle
publish: true
---

## 其他指令
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在前面几篇文章中，我们稍微讲解了v-bind、v-show、v-if、v-else、v-for等指令，这些都是使用很平凡的指令，在这篇文章中，我们介绍的就是那些使用或许不是那么多的指令。

###  v-text
```
  <template>
    <div>
        <div v-text="firstName">你好</div>   ---> 张三
        <div>你好啊！{{firstName}}</div>     ---> 你好啊！张三
    </div>
    <!-- 这两个的效果是一样的 -->
  </template>
  <script>
  export default {
    data() {
      return {
        firstName:'张三',
      }
    },
  }
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 作用:向其所在的节点中渲染文本内容。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 与插值语法的区别:v-text会替换掉节点中的内容，{{xx}}则不会。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 如果firstName是一个含标签的字符串，v-text指令也同样不会将其视为标签，而是作为普通的字符输出。    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. 总结成一句话是，用处不大，了解即可。  

### v-html
```
  <template>
    <div>
        <div v-html="str"></div>   ---> 张三(h3格式下的)
    </div>
    <!-- 这两个的效果是一样的 -->
  </template>
  <script>
  export default {
    data() {
      return {
        str:'<h3>张三</h3>',
      }
    },
  }
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该指令于v-text指令效果类似，只不过v-html解析时，遇到字符串内含有标签，v-html也能将其是做一个标签。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该指令有[安全问题](https://www.bilibili.com/video/BV1Zy4y1K7SH?p=41)，不推荐使用。  

### v-cloak
```
  <template>
    <div>
        <div v-cloak>{{str}}</div>   ---> 张三(h3格式下的)
    </div>
    <!-- 这两个的效果是一样的 -->
  </template>
  <script>
  export default {
    data() {
      return {
        str:'123',
      }
    },
  }
  <style scoped >   
  /* scoped是用于控制组件时的命名冲突问题 */
  /* [v-cloak]是选中所有标签中带有v-cloak的 */
  [v-cloak]{
    display: none;
  }
  </style>
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v-cloak指令会在vue介入容器时被删除，没有属性值。其主要解决的是在非项目开发中使用vue时，由于使用在线引入的vue.js请求时间过长，导致页面上展示时全是花括号{。  

### v-once
```
  <template>
    <div>
        <div v-once>{{str}}</div>   ---> 张三
    </div>
    <!-- 这两个的效果是一样的 -->
  </template>
  <script>
  export default {
    data() {
      return {
        str:'张三',
      }
    },
  }
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.v-once所在节点在初次动态渲染后,就视为静态内容了。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。

### v-pre
```
  <template>
    <div>
        <div v-once>{{str}}</div>   ---> {{str}}
    </div>
    <!-- 这两个的效果是一样的 -->
  </template>
  <script>
  export default {
    data() {
      return {
        str:'张三',
      }
    },
  }
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.跳过其所在节点的编译过程。v-once是只生效一次，而v-pre一次都不生效。    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.跳过没有指令语法、插值语法的节点，会加快编译速度。  

## 自定义指令
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在vue中，我们除了可以使用其为我们设置好的指令，我们也可以去设置我们自己喜欢的指令，设计指令有两种方式，函数式和对象式。  

### 函数式
```
  <template>
    <div>
      <div v-text="firstName"></div>
      <h2>把n放大10倍:<span v-big="n"></span></h2>
      // 显示的是把n放大10倍:10
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        n:1,
      };
    },
    directives:{
      // 指令与元素绑定成功时和所在位置被重新解析时调用
      big(element,binding){
        element.innerText = binding.value * 10
      }
    }
  }
</script>
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;函数可以接到两个参数，第一个参数是写有我们书写的v-big的标签的真实dom节点，例如此时接收到的就是整个span标签，第二个参数binding，意为将标签与指令绑定，会获取到我们写有自建指令的内容，我们通常使用的多的是value属性，代表着指令中绑定的值。

### 对象式
```
  directives:{
    big:{
      bind(element,binding){     // 指令与元素绑定成功时调用
        element.innerText = binding.value * 10
      }
      inseted(element,binding){    //指令所在元素插入页面时调用
        element.focus()
      }
      update(element,binding){    //所在位置被重新解析时调用
        element.innerText = binding.value * 10
      }
    }
  }
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们自然可以发现，对象式比指令式的写法复杂，而且在对象式内bind和update的内容是一样的，这样做的目的就是为了处理一些获取焦点时，函数式无法掌握好正确的时机的问题。    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大家思考这样一个问题，假如我们在函数式中也写了`element.focus()`来获取焦点，当指令与标签绑定时，因为我们写了获取焦点的代码，但此时模版并没有解析完全，页面也没有出现，我们去为谁获取焦点呢！对象式就是为了解决这样的问题，在刚开始绑定的只处理数据相关的问题，只有在放入页面时才处理获取焦点的问题。