---
title: compilerOptions子配置详细介绍
description: '简介compilerOptions子配置'
date: ''
sidebar: 'auto'
categories: 
 - JavaScript
tags: 
 - JavaScript
 - TypeScript
prev: ./studyTS
next: ./studyTS
publish: true
---

## compilerOptions

### target
+ 编译后对应的目标版本
+ ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext...

### lib
+ 指定代码运行时所包含的库
+ ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext、DOM、WebWorker、ScriptHost...

### module
+ 编译后代码使用的模块化系统
+ CommonJS、UMD、AMD、System、ES2020、ESNext、None...

### outDir
+ 编译后文件的位置

### outFile
+ 将所有的文件编译为一个js文件，并存放在指定位置

### rootDir
+ 指定代码的根目录，默认情况下是编译后TS文件的最长公共目录

### allowJs
+ 是否对js文件编译

### checkJs
+ 是否对js文件进行检查

### removeComments
+ 是否删除注释

### noEmit
+ 不对代码进行编译

### sourceMap
+ 是否生成编译前后代码映射

### strict
+ 启用所有的严格检查，相当于开启所有的严格检查，以下为细节检查
+ alwaysStrict：总是以严格模式对代码进行编译
+ noImplicitAny： 禁止隐式的 any 类型
+ noImplicitThis： 禁止类型不明确的this
+ strictBindCallApply： 严格检查 bind、call和apply的参数列表
+ strictFunctionTypes： 严格检查函数的类型
+ strictNullChecks： 严格的空值检查
+ strictPropertyInitialization： 严格检查属性是否初始化

### 额外检查
+ noFallthroughCasesInSwitch： 检查switch语句包含正确的break
+ noImplicitReturns： 检查函数没有隐式的返回值
+ noUnusedLocals： 检查未使用的局部变量
+ noUnusedParameters： 检查未使用的参数

### 高级配置
allowUnreachableCode： 是否忽略不可达代码
noEmitOnError： 有错误的情况下不进行编译













