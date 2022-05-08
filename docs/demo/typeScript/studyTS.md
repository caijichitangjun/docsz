---
title: TypeScript-类型重塑
description: '简介TypeScript的特点、安装以及编译'
date: '2022-4-27'
sidebar: 'auto'
categories: 
 - JavaScript
tags: 
 - JavaScript
 - TypeScript
prev: false
next: ./studyTS2
publish: true
---

## TypeScript简介
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TypeScript(以下简称TS)是JavaScript(以下简称js)的超集，进化版，在js的基础上对其功能进行扩展，经转化后再交由js执行。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因为ts是js的超集，因此任意的js代码都可以被当做ts代码执行，又由于ts需要编译器转化为js，在转化时可以任意指定js的版本，因此可以完美的解决js的兼容问题。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;相较之下，
+ TS拥有了静态类型，更加严格的语法，更强大的功能
+ TS在代码执行前完成代码的检查，减小运行时异常出现几率
+ TS代码可以编译为任意版本的JS代码，有效解决不同JS运行环境兼容问题
+ 相同功能，TS的代码量要大于JS，但TS的代码结构更加清晰，变量类型更加明确，在后期代码的维护中TS却远远胜于JS。

### 使用准备
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;以下操作在cmd命令行或vscode终端或其他使用命令行的地方操作。
1. 下载并安装`node.js`，可参考[node.js安装](../download/vueDownload.md)
2. 全局安装ts， `npm i -g typescript`

### 基础简介

#### 类型声明
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类型声明是ts的一个非常重要的特点，它使原本随意定义的变量变得规范起来，ts变量在声明时可以指定变量类型，在对其赋值或更改时，或对其值进行判断，符合则赋值，否则则报错。简单来说，就是为变量规定了类型，使它只能存储这一类型的值。
```typeScript
eg:
  let name:string;
  let age:number = 18
  let age:number = '18'   // 会报错
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有人可能会觉得对每一个变量声明类型很麻烦，但这正是为了维护时的便利，在设计时自然也考虑到了频繁声明的小'问题'。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类型声明是ts的实际上在很多时候ts都是可以自动进行类型判断的，具体规则是: 如果你的定义与赋值同时进行，如上代码第二句，则此时可以忽略变量类型声明。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下面介绍一下在ts中有哪些类型可供定义。
| 类型 | eg | code eg | 描述 |
| ---- | ---- | ---- | ---- |
| number | `1, 1.0, 1n`| `let age:number = 10`| 任意进制、任意数字 |
| string | ```'name', "type", `other` ```| `let name:string = 'zs'`| 单引号、双引号、ES6模版字符串 |
| boolean | `true, false`| `let isShow:boolean = false`| 布尔值true、false |
| any | `*`| `let age:any = 10; age = '100'`| 可以是任意类型 |
| unknown | `*`| `let age:unknown = 10; age = '100'`| 任意安全的any类型 |
| void | `空/undefined`| `let age:void = undefined`| 空值或undefined |
| never | 没有值 | ```function error: never { throw '出错了' }``` | 不能是任何值 |
| object | `{}`| `let age:object = {}`| 任意的 JS 对象 |
| array | `[1, 2]`| `let age:Array<number> = [1, 2]`| 任意 JS 数组 |
| tuple | `[1, 2]`| `let age:[string, number] = ['123', 123]`| ts新类型，定长数组 |
| enum | `enum{1, 2}`| 如下代码所示 | TS中新增类型，枚举 |
| 可选类型 | `1 | '1'`| `let age:number | string = 10; age = '10'`| 在标识的类型中选择一种满足即可 |
```typeScript
eg:
  enum Color {   // 枚举数据类型，默认从0开始，常用于控制流程。
    Red,     // 如此时Color.Red = 0，当然你也可以自行对枚举中的内容进行赋值，如 Red = 2, Green = 5, ...
    Green,   // 默认时Color.Green = 1，依此类推
    Blue,
  }
```

#### 断言
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在ts中，断言就是告诉编译器我觉得这个变量是什么类型。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在某些情况下，我们可能会拿到一个不知类型的变量，如`let someValue: unknown = "this is a string";`，我们当然很清楚这是一个字符串，但编译器不知道啊！因此我们可以通过断言来告诉编译器，断言有两种写法，如下:
```typeScript
eg:
  let someValue: unknown = "this is a string";
  let strLength: number = (someValue as string).length;
  // let strLength: number = (<string>someValue).length;
```

### 编译
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果我们要编译的ts文件并不多，我们可以使用`tsc xxx.ts -w`来编译某个文件，并监视其，当其变化时重新编译。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当需要编译的内容较多时，就需要`tsc`一键编译了，在一键编译前，还需要我们配置一个文件`tsconfig.json`，在cmd命令行或vscode终端运行`tsc --init`即可生成该文件，配置信息大致如下，或详见[tsconfig.json](./compilerOptions.md)：
| 配置项 | 子配置 | code eg | 描述 |
| ---- | ---- | ---- | ---- |
| include |  | `"include":["src/*", "tests/*"]`| 需要编译文件所在的目录 |
| exclude |  | `"exclude": ["./src/user/**"]`| 定义排除在外的目录 |
| extends |  | `"extends": "./configs/base"`| 获取base的配置信息 |
| files |  | `"files":["test.ts", "test1.ts"]`| 效果类似于include，但只有在文件较少时使用 |
| compilerOptions |  |  | compilerOptions是`tsconfig.json`较为重要和复杂的配置项，有众多的子配置 |
|  | target | `"target": "ES6"`| 编译后对应的目标版本，如ES5、ES6... |
|  | lib | `"lib": ["ES6", "DOM"]`| 指定代码运行时所包含的库 |
|  | module | `"module": "CommonJS"`| 编译后代码使用的模块化系统 |
|  | outDir | `"outDir": "dist"`| 编译后文件的位置 |
|  | outFile | `"outFile": "dist/app.js"`| 将所有的文件编译为一个js文件，并存放在指定位置 |
|  | rootDir | `"rootDir": "./src"`| 指定代码的根目录，默认情况下是最长公共目录 |
|  | allowJs | `"allowJs": true`| 是否对js文件编译 |
|  | checkJs | ` "checkJs": true`| 是否对js文件进行检查 |
|  | removeComments | `"removeComments": true`| 是否删除注释 |
|  | noEmit | `"noEmit": false`| 不对代码进行编译 |
|  | sourceMap | `"sourceMap": false`| 是否生成编译前后代码映射 |
|  | 严格检查 | `"strict": true`，详见[tsconfig.json](./compilerOptions.md) | 开启严格检查 |
|  | 额外检查 |  | 编译后文件的位置 |
|  | 高级 |  | 编译后文件的位置 |

### 配合webpack
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;要使用webpack打包(如果想要了解webpack打包配置相关内容，请参考[webpack](../webpack/studyWebP.md))文件需要下载相关工具，如下：
+ `npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin`
+ webpack: npm i webpack -g
+ webpack-cli: npm i webpack-cli -g   （使我们能够使用命令的形式打包文件）
+ webpack-dev-server: 指令为npx webpack-dev-server 。在内存中编译，不会产生输出，自动编译，自动打开浏览器、自动刷新
+ typescript: ts 编译器
+ ts-loader: ts 加载器，用于在webpack中编译ts文件
+ html-webpack-plugin: webpack中html插件，用来打包创建html文件
+ clean-webpack-plugin: webpack 中的清除插件，每次构建都会先清除目录

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对webpack配置文件作如下配置：
``` typeScript
  let path = require("path"); 
  let HtmlWebpackPlugin = require("html-webpack-plugin"); 
  let { CleanWebpackPlugin } = require("clean-webpack-plugin");
  
  module.exports = {
    optimization:{ 
      minimize: false // 关闭代码压缩，可选 
    },
    entry: "./src/index.ts",      // webpack打包入口文件
    devtool: "inline-source-map",
    devServer: {                  // 开发服务器
      contentBase: './dist'       // 项目构建后的路径
    },
    output: {                     // 打包后输出文件配置
      path: path.resolve(__dirname, "dist"), 
      filename: "bundle.js", 
      environment: { 
        arrowFunction: false // 关闭 webpack 的箭头函数，可选 
      } 
    },
    resolve: { 
      extensions: [".ts", ".js"] 
    },

    module: {        // webpack只能处理js文件，非js文件需要处理的话，要在此处配置
      rules: [{ 
        test: /.ts$/, 
        use: { 
          loader: "ts-loader" 
        }, 
        exclude: /node_modules/ 
      }] 
    },
    plugins: [      // 插件的声明区，帮助webpack处理更困难的任务
      new CleanWebpackPlugin(), 
      new HtmlWebpackPlugin({ 
        title:'TS 测试' 
      })
    ]
  }
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对`tsconfig.json`配置文件作如下配置：
``` javaScript
  { 
    ...
    "compilerOptions": { 
      "target": "ES2015", 
      "module": "ES2015", 
      "strict": true 
    },
    ...
  }
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对`package.json`配置文件作如下配置：
``` javaScript
  ... 
  "scripts": {   // 配置相关命令
    "test": "echo Error: no test specified && exit 1", 
    "build": "webpack", 
    "start": "webpack serve --open chrome.exe" 
  }, ...略... 
```

