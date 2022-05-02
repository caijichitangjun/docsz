---
title: webpack资源打包（上）
description: '简介webpack资源打包的相关配置'
date: ''
sidebar: 'auto'
categories: 
 - webpack
tags: 
 - webpack
prev: false
next: ./studyWebP2
publish: true
---

## 什么是webpack？
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。它可以将我们编写的`.vue`文件、`.jsx`文件等打包编译成原始的js文件，同时对版本进行控制。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当然，现在前端的很多框架都对webpack进行了封装，需要我们亲自动手的内容很少了，但还是推荐大家了解下相关知识。  

### 插件安装
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因为webpack在打包时需要处理各种各样的资源，因此需要的依赖包和插件就很多，这里列出的资源包大家仅做了解即可。
+ webpack: npm i webpack -g
+ webpack-cli: npm i webpack-cli -g 
  使我们能够使用命令的形式打包文件）
+ style-loader: npm i style-loader -D 
  -D为局部安装，创建style标签，将js中的样式资源插入进行，添加到head中生效
+ css-loader: npm i style-loader -D 
  将css文件变成commonjs模块加载js中，里面内容是样式字符串
+ html-webpack-plugin
  打包html文件
+ less-loader: npm i less-loader -D
  将less文件转化为css文件
+ ur1-loader: 
+ file-loader: 处理img文件打包
+ webpack-dev-server
  指令为npx  webpack-dev-server 。在内存中编译，不会产生输出，自动编译，自动打开浏览器、自动刷新
+ mini-css-extract-plugin
  提取css到单独的文件
+ postcss-loader
+ postcss-preset-env
  处理兼容性问题
+ optimize-css-assets-webpack-plugin
  压缩css
+ eslint-loader: 
+ eslint: 
+ eslint-config-airbnb-base: 
+ eslint-plugin-import
  全部都用于语法检查，后两个是使用airbnb进行语法检查，
+ babel-loader
+ @babel/preset-env
+ @babel/core
+ @babel/ployfill
+ core-js
  js兼容性配置
+ workbox-webpack-plugin
  pwa相关
+ thread-loader
  多进程打包
+ add-asset-html-webpack-plugin
  自动引入某个包输出，并在html中自动引入该资源

## 资源打包
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因为webpack只能对原始的js文件打包，因此对于其它后缀名的文件都需要单独配置，以完成webpack对其的打包。
  
### 配置文件webpack.config.js
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`webpack.config.js`的基础配置如下所示。  
```js
// 获取当前目录绝对路径，一般用于拼接路径
const { resolve } = require('path')

module.exports = {
  entry: './src/index.js',
  output:{
    filename: 'built.js',
    // __dirname代表当前文件的目录绝对路径
    path: resolve(__dirname, 'built')   
  },
  module:{
    rules:[

    ]
  },
  plugins:[

  ],
  mode: 'development'
}
```
+ Entry
  入口文件，即打包文件从哪里开始，类似于java项目中的main文件（这句不懂也没关系）
  单入口文件: `entry : './src/js/index.js'`,
  多入口文件: 
  ```js
  entry:{             
    // 多入口:有一个入口，最终输出就有一个bundle
      index: './src/js/index.js' ,
      test: './src/js/test.js'
  }```
+ Output
  输出文件，即编译好的文件会放在哪里，这里可能会用到获取当前的绝对路径（代码: ）
  output: {
    filename: 'js/[name].[contenthash:10].js',           
    //  [name]:在多入口文件时，取文件名（key），单文件时可以自命名或...
    path: resolve(__dirname,'build' )
  },
+ Loader: 指导webpack处理那些非js文件【在文件中为: module】
+ Plugins: 插件的声明区，插件可以帮webpack执行更广的任务。
+ mode: development / production

### css

#### css文件打包
```js
// module ==> rules
  rules: [{
    test: /\.css$/,     //   正则匹配需要打包的文件
    use:[
      // 使用哪些loader进行处理
      // 执行顺序: 从右到左，从下到上依次执行   
      // 创建style标签，将js中的样式资源插入进行，添加到head中生效
      'style-loader',       
      // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
      'css-loader', 
      // 将less文件转化为css文件   【如果仅打包css，则不需要这句话】
      'less-loader',   
    ]    
  }]    
```

#### 打包到指定位置
```js
  // 引入插件mini-css-extract-plugin: css打包工具，需npm下载
  const MiniCssExtractPlugin = require( 'mini-css-extract-plugin');
  
  // module ==> rules
  rules: [{
    test: /\.css$/,
    use:[
      //取代style-loader，将css取出到单独文件
      MiniCssExtractPlugin.loader, 
      'css-loader'
      'less-loader'
    ]
  }],

  // plugins
  plugins:[
    //对输出的文件重命名
    new MinicssExtractPlugin({ filename: 'css/built.css' }
  ],   
```

#### 兼容性处理
```js
  // module ==> rules ==> use
  use:{  
    MiniCssExtractPlugin.loader,         
    'css-loader',       
    {                 //  postcss的插件
      loader: 'postcss-loader' ,
      options: {
        ident: 'postcss ',
        plugins: () =>[           
          require( 'postcss-preset-env' )()  
        }
      }     
  
  // package.json文件下添加配置
  "browserslist" : {
    // 可以用配置选项
    // "> 1%", //全球超过1%人使用的浏览器
    // "last 2 versions",  //所有浏览器兼容到最后两个版本根据CanIUse.com追踪的版本
    // "not ie <= 8" , //方向排除部分版本
    // "since 2013" ,  //2013年之后发布的所有版本
    // "Firefox ESR" , //火狐最新版本
    // "Firefox 12.1", //指定浏览器的兼容到指定版本
    // "Firefox > 20", //Firefox的版本比20更新 >=，< 并且也可以 <= 工作
    // "cover 99.5%",  //提供覆盖的最流行的浏览器
    // "unreleased versions" , //alpha和beta版本
    // "defaults" , //Browserslist的默认浏览器（> 0.5%, last 2 versions, Firefox ESR, not dead）。
    "development":[ ... ],
    "production" : [ ... ],
  } 
```

#### css压缩
```js
  // optimize-css-assets-webpack-plugin: css压缩工具，需npm下载
  const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')       

  // plugins
  plugins:[
    // 压缩css文件
    new OptimizeCssAssetsWebpackPlugin()     
  ], 
```

### html

#### 打包html资源
```js
  // html-webpack-plugin: html打包工具，需npm下载
  const HtmlwebpackPlugin = require( 'html-webpack-plugin' ); 

  plugins:[
    //  复制 ‘./src/index.htm1’文件，并自动引入打包输出的所有资源（JS/css)
    new HtmlwebpackPlugin({ template: './src/index.html'})
  ], 
```

#### html代码压缩
```js
  // html-webpack-plugin: html打包工具，需npm下载
  const HtmlwebpackPlugin = require( 'html-webpack-plugin' ); 

  plugins:[
    //  复制 ‘./src/index.htm1’文件，并自动引入打包输出的所有资源（JS/css)
    new HtmlwebpackPlugin({ 
      template: './ src/index.html',
      minify: {
        collapsewhitespace: true,    //移除空格
        removeComments: true,        //移除注释
      }    
    })
  ], 
```

### 图片资源打包
```JS
  // module ==> rules 
  rules: [{
    test: /.(jpg | png | gif)$/ ,
    loader: 'url-loader ',  //使用一个loader
    options: {
      // 图片大小小于8kb，就会被base64处理,减少请求数量
      // 作用: 减轻服务器压力，但图片体积会更大(文件请求速度更慢)
      limit: 8* 1024, 
      // url-loader默认使用es6模块化处理，而html-loader引入图片是commonjs，
      // 因此解析时资源地址会被解析为[object Module]
      // 解决:关闭url-loader的es6模块化，使用commonjs解析   
      esModule: false,
      // [hash: 10]取图片的hash的前10位; [ext]取文件原来扩展名
      name: '[hash: 10].[ext]' 
    }
  },{  
    // 处理html中的图片（负责引入，进而被url-loader处理）
    test: /\.html$/,
    loader: 'html-loader' 
  }]
```

### 打包其他资源
```js
  // module ==> rules 
  rules: [{
    //排除css/js/html/less资源
    exclude: /\.(css|js|htm1|less)$/ ,     
    loader: 'file-loader',     
    options: {
      name: "[hash: 10]:[ext]"
    }
  }]
```

### js语法检查与兼容性
```js
  // package.json,添加配置,加载语法检查库
  "eslintConfig": {
    "extends": "airbnb-base"
  },

  // module ==> rules 
  rules: [{
  // 语法检查
    test:   /.js$/ ,
    exclude: /node_modules/ ,        //只检查自己写的代码，下载的依赖不管
    loader: 'eslint-loader' ,
    options: {}
  },{
  // 兼容性处理
    test: /.js$/,
    //只检查自己写的代码，下载的依赖不管
    exclude: /node_modules/,        
    loader: 'babel-loader' ,
    options: {      //预设:指示babel做怎么样的兼容性处理
      presets : [
        // 该工具也有一定的问题：只能转换基本语法，primise等就不能转换
        // 需要全部兼容，需要使用`@babel/ployfill`
        // 在需要的文件`import '@babel/ployfill'`或使用以下的按需引入
        [ '@babel/preset-env',{
          useBuiltIns: 'usage,   //按需加载  
          corejs: {         // 指定core-js版本
            ersion: 3
          },   
          targets: {    // 指定兼容性做到哪个版本浏览器
            chrome: '60',
            firefox: '60',
            ie: '9' ,
            // ...
        }]
      ]
    }
  }]
```












