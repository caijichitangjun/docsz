---
title: vue文件格式
description: 'vue文件的格式是怎样的？'
date: ''
sidebar: 'left'
categories: 
 - vue
tags: 
 - vue
prev: ./vueDownload
next: ./vueBasis
publish: true
---

## 使用须知

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;相信在这里大家,大家已经下载好了vue的相关工具，下面让我们开始学习vue文件的基本格式吧！（其实和我们学过的html、css、js文件并无不同，只是将他们糅合在一起）

```
<template>
    <div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    created() {},
    mounted() {},
    methods: {},
}
</script>
<style scoped >

</style>
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上面的代码段，大家如果写过vue文件（可跳过此段内容），应该会比较熟悉了，没写过也没关系，我会给你讲解文件大致内容。
><template\/> 标签内包含的是我们学过的html代码，我们书写的标签、静态文字等都放在这里。

><script\/> 标签中包含的是我们定义的属性（变量）、事件、外部文件引入等，通常我们将属性编写在date中，以return返回，将事件方法写在下面的created、mounted、methods等内部，当然为了代码的可维护以及代码功能的完善，我们通常会把不同功能的代码放在不同的对象或函数内，这些书写以后再说。

><style\/>标签的内部书写的是css、less、sass等代码，负责的是html内容的样式。

