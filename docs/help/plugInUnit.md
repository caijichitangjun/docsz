---
title: vscode插件
description: 'vue的入门指导，开启你的前端学习吧！'
date: ''
sidebar: 'auto'
categories: 
 - vscode
tags: 
 - vscode
 - help
publish: true
---

# vscode中好用的插件

## Chinese (Simplified) 
    使你的浏览器变成中文的界面

## Vetur
    编写vue十分友好，包括代码提示、问题修复等功能，强烈建议安装

## Markdown Preview Enhanced
    MD文件实时更新插件，即一边书写，一边可查看到结果

## 代码复制

### vuepress-plugin-nuggets-style-copy
安装：`yarn add vuepress-plugin-nuggets-style-copy -D`
使用:
```
plugins: [
  "vuepress-plugin-nuggets-style-copy": {
    copyText: "复制代码",
    tip: {
      content: "复制成功"
    }
  }
]
```

### vuepress-plugin-code-copy
安装：`yarn add -D @snippetors/vuepress-plugin-code-copy -D`
使用:
```
plugins: [
 "@snippetors/vuepress-plugin-code-copy": {
    // selector: 语言
    align: top/bottom  // 位置
    // color 颜色
    ... 
  }
]
```
## yarn add vuepress-plugin-copyright -D
```
'vuepress-plugin-code-copy': true,           // 代码复制功能
```

## kanbanniang
```
'@vuepress-reco/vuepress-plugin-kan-ban-niang': {  // 看板娘(右下角)
      theme: ['shizuku', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'wanko', 'z16'],
      messages: {
        welcome: '欢迎来到浅笑的个人博客',
        home: '心里的花，我想要带你回家。',
        theme: '好吧，希望你能喜欢我的其他小伙伴。',
        close: '你知道我喜欢吃什么吗？痴痴地望着你。'
      },
      width:200,
      height:282,
    },
```

## 光标点击效果
```
'cursor-effects': {
  size: 2, // size of the particle, default: 2
  shape: 'star', // ['star' | 'circle'], // shape of the particle, default: 'star'
  zIndex: 999999999, // z-index property of the canvas, default: 999999999
}
```

## 音乐播放
```
'@vuepress-reco/vuepress-plugin-bgm-player': {  // 首页歌曲
  audios: [
    {
      name: '雪月',
      artist: '王玲琳',
      url: '/assets/mp4/xueyue.mp3',
      cover: '/assets/img/xueyue.jpg'
    },
    {
      name: '世间美好与你环环相扣',
      artist: '冯提莫',
      url: '/assets/mp4/meihao.mp3',
      cover: '/assets/img/meihao.jpg'
    }
  ] ,
  autoShrink: true ,    // 是否默认缩小
  shrinkMode: 'float',  // 缩小时缩为哪种模式
  floatStyle:{ bottom: '10px', 'z-index': '999999' }      // 悬浮窗样式
},
```
