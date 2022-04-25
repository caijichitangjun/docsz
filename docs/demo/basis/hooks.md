---
title: vue基础-自定义hooks
description: '在进行项目讲解前的vue基础讲解'
date: ''
sidebar: 'auto'
categories: 
 - vue
tags: 
 - vue
prev: ./comApi
next: ./vuedata
publish: true
---

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hooks是在vue3中新增的，本质上是一个函数，相当于vue2中[通信中的mixin](../assembly/configAndProper.md)。即将一个功能的所有相关内容汇集在一起，实现js的复用。
```
src同级目录 => 创建hooks文件夹 => usetest.js
  import ref from 'vue'
  export default function(){
    let name = ref('jeck');

    function updataName(){
      name.value = '张三'
    };

    return name;
  }

需要使用hooks的地方；
  <script>   
    import { ref } from 'vue'
    import useName from '../hooks/usetest'
    export default {
      setup(){
        let sum = ref(18);
        let name = useName()
      }
    };
  </script>
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;相当于在外部定义一个函数，将需要处理的信息放在一个独立的地方进行处理，我们作为使用者并不关心处理的过程，只需要处理的结果。 


