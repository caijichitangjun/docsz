---
title: vue-cli搭建项目
description: '使用vue-cli是如何搭建项目的，以及项目的初始文件'
date: ''
sidebar: 'left'
categories: 
 - vue
tags: 
 - vue
 - vue-cli
prev: false
next: false
publish: true
---

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本文讲的是如何创建一个vue的项目，以及项目的初始文件的含义。

## 创建vue项目
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在创建vue项目时，我们需要下载[node.js](https://blog.csdn.net/m0_47759019/article/details/121874564)和vue-cli这两项工具，如果您尚未下载，请参考[vue下载与安装](../download//vueDownload.md)，同时若您认为本文所讲内容尚未完善，请参考[vue-cli创建项目](https://blog.csdn.net/qq_52959651/article/details/111047636)。

> 1.在您想要创建项目的位置打开cmd。  

![进入目标目录](../imgs/createVue/create1.png)  
![进入目标目录](../imgs/createVue/c2.png)  

> 2.vue create [项目名] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//创建的项目带有个人特色即可  

> 3.选择使用vue2创建或者vue3创建 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//第三个是自己选择配置，如果你选择创建vue3版本的项目，那么你的vue-cli的版本至少为4.5.0，使用npm install -g @vue/cli可以安装或升级脚手架。

![选择vue版本](../imgs/createVue/c3.png)

> 4.等待项目创建完成，打开即可

## vue项目文件介绍

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大家使用的不同版本vue-cli搭建的vue项目目录可能有些不同，博主这里的是最新版的，你可以参照文件名或使用最新版重新搭建。
>node_modules
>>我们下载的依赖都在这里，<span style="color:red">请求：如果你需要一个朋友帮你完善项目代码，请不要将此文件发送给你的朋友。因为此文件太大，还不如让你的朋友自行使用npm i下载依赖。</span>

>public
>>favicon.ico &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//项目图标，即网页页签旁的图标
>>index.html &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//项目的入口，所有的页面都是从这里开始

>src
>>assets &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//一般存储着项目的图片等静态资源
>>components &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//我们所写的/.vue文件存放的位置
>>App.vue &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//我们所写的\/.vue文件的父组件.
>>main.js &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//下载插件的定义和声明的位置

>babel.config.js &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// babel的控制文件，即涉及SE语法转换问题，

>jsconfig.json &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//javascript服务选项，详细请参考[vscode jsconfig.json 使用说明](https://blog.csdn.net/zengzeng011/article/details/103889282)

>package.json 
>package-lock.json &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//这两个文件指示的是依赖包管理，例如下载的插件的版本、vue版本等

>README.md &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//提示文档不重要

>vue.config.js &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//这是一个可选的配置，例如我们配置代理服务器

>yarn.lock &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//包含有关已安装的每个依赖项的确切版本的信息以及代码的校验和以确保代码完全相同。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在src文件中，我们完全可以按照自己的习惯将各种文件、资源放在不同的位置，再保证不会造成误解、影响阅读的情况下，合理的存放文件。
