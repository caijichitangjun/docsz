---
title: cookie
description: 'vue-cli搭建的项目的相关内容简介'
date: ''
sidebar: 'auto'
categories: 
 - vue
tags: 
 - vue
prev: ./configAndProper
next: ./Ccommunication
publish: true
---

## cookie
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cookie，有时也用其复数形式 Cookies。类型为“小型文本文件”，是某些网站为了辨别用户身份，进行Session跟踪而储存在用户本地终端上的数据（通常经过加密），由用户客户端计算机暂时或永久保存的信息.我们这里介绍的就是两种常用的本地存储。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存储内容大小一般支持5MB左右(不同浏览器可能还不一样).浏览器端通过Window.sessionStorage和Window.localStorage属性来实现本地存储机制。

### LocalStorage和SessionStorage
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这两个的Api基本一致，仅有些许差别。
> 1. Local/SessionStorage.setItem('key',"value')  
该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。
> 2. Local/SessionStorage.getItem('person')     
该方法接受一个键名作为参数，返回键名对应的值。  
> 3. Local/SessionStorage.removeItem('key')  
该方法接受一个键名作为参数，并把该键名从存储中删除。
> 4. Local/SessionStorage.clear()  
该方法会清空存储中的所有数据。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存储时传入的value值不是字符串类型时，其会帮我们转为字符串类型，当我们知道对象调用toString方法后，无法看到内部结构，因此传入对象数据时需要我们自己转成可以看到结构的字符串类型，例`JSON.stringify()和JSON.parse()`这样转成的字符串仍然可以看到其中的键值对。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注意如下:
> 1. SessionStorage存储的内容会随着浏览器窗口关闭而消失。
> 2. LocalStorage存储的内容，需要手动清除才会消失。
> 3. xxxxxStorage.getItem(xxx)如果xxx对应的value获取不到，那么getltem的返回值是null。
> 4. SON.parse(nul1)的结果依然是null。



