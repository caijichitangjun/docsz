---
title: webpack资源打包（下）
description: '简介webpack资源打包的相关配置'
date: ''
sidebar: 'auto'
categories: 
 - webpack
tags: 
 - webpack
prev: ./studyWebP
next: false
publish: true
---

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在前文中，我们介绍了在生产模式`development`下，webpack的配置文件的相关配置，下面我们要介绍的是在生产环境下的性能优化与其它处理。  
```js
// `webpack.config.js`五大基本配置
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
  
### devserver
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;配置开发服务器，用于自动化打开浏览器，自动编译等功能。其不属于`webpack.config.js`的五大基础配置，输入独立的配置。    
```js
module.exports = {
  // ...
  devserver:{
    contentBase: resolve(__dirname，'build '), //项目构建后的路径
    compress: true,   //启动gzip压缩，编译更快
    port: 3000,      //端口号
    open: true       //自动打开浏览器
  }
}
```

### 热更新HMR与代码调试
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HMR 全称 Hot Module Replacement，中文语境通常翻译为模块热更新，它能够在保持页面状态的情况下动态替换资源模块，在webpack开启HRM功能可以减小二次打包内容，开启HMR功能只需要`devserver:{hot: true,}`。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在开启HRM功能后，三类资源有不同的相应。  
+ css
  可以使用HMR功能, 是因为style-loader内部实现该功能
+ js
  默认不能使用HMR功能，需要修改js文件，修改为支持HMR的代码，如下:
  ```js
    if (module.hot) {                  
      // 一旦module.hot为true，说明开启了HMR功能。==> 让HMR功能代码生效
      module.hot.accept('./ print.js', function() { 
        // ...
      })             
      //  方法会监听 print.js 文件的变化，一旦发生变化，会执行后面的回调函数，其他默认不会重新打包构建。
  ```
+ html
  默认不能使用HMR功能
  同时会导致html文件不能热更新了
  但因为html是所有其他文件的入口，html发生改变，自然依赖于它的资源也会被重新加载，因此不需要HMR
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source-map是代码调试所使用的工具，在代码出现bug时，我们总是希望直接定位到代码原位置的，但在代码上线后又希望不影响速度，因此诞生了多种变种。如下：
+ [ inline- | hidden- | eval- ] / [ nosources- ] / [ cheap- [ module- ] ] source-map
+ source-map
   - 在文件外部生成文件
   - 错误代码准确信息和源代码的错误位置
+ inline-source-map
   - 在编译后文件内部；且内联构建速度更快（一个总的内联source-map）
   - 错误代码准确信息和源代码的错误位置
+ hidden-source-map
   - 在文件外部生成文件
   - 错误代码准确信息和构建后的代码位置
+ eval-source-map
   - 在编译后文件内部（每一个文件都会有一个内联source-map）
   - 错误代码准确信息和源代码的错误位置
+ nosources-source-map
   - 在文件外部生成文件
   - 错误代码准确信息，但没有任何源代码信息
+ cheap-source-map
   - 在文件外部生成文件
   - 错误代码准确信息和源代码的错误位置，只能精确到行
+ cheap-module-source-map
   - 在文件外部生成文件
   - 错误代码准确信息和源代码的错误位置，会将loader的source-map也加到映射中
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因为每一个变种的特点都不一致，而且环境不同，需求也不相同。  
1. 开发环境：速度快，调试友好
   - 速度：eval-cheap > eval > inline > cheap
   - 调试：source-map  >  cheap-module > cheap
2. 生产环境：源代码隐藏，调试友好，但内联会使代码体积变大，因此一般使用外部方式
   - nosources-source-map
   - hidden-source-map

### oneOf
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;避免一个文件被多个rule规则匹配，减少打包时间。  
```js
  // module ==> rules
  rules:[
    { 
      // 需要单独取出的rules
      // 如果需要某个规则优先执行，可以在其内部添加`endorce: 'pre'`
    },
    oneOf:[
      // ... 原本的rules规则
      // 需要注意的是，因为添加了oneOf属性，因此oneOf内部的规则只会被匹配一次。
      // 如果有两套规则去处理同一类文件就需要间其中一套单独书写
    ]
  ]
```

### 缓存技术
```js
  // module ==> rules ==> js兼容
  {
  // 兼容性处理
    test: /.js$/,
    exclude: /node_modules/,        
    loader: 'babel-loader' ,
    options: {     
      presets : [
        // ... 省略
      ],
      // 开启babel缓存，二次构建时会读取上次的缓存内容，提升构建速度
      cacheDirectory: true,
    }
  }
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;开启缓存在一定程度上加快了代码的构建速度，但是带来了新的问题——HRM失效，需要我们动态的为js和css资源更改文件名，如`filename: 'css/built.[hash: 10].css'`。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;但是这样会导致css和js生成的hash值相同，js变动也会带动css变动，使用根据chunk生成的chunkhash值也无法解决问题，因为css资源在js中被引入，属于同一个chunk。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;要解决这个问题，我们使用的是`contenthash`，其是根据文件内容生成的hash，不同的文件间hash自然不同。  

### tree shaking
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tree shaking为树揺，意为去除没有使用的代码。 
+ 前提
   - 1.使用ES6模块化
   - 2.开启production模式
+ 配置
  ```js
    sideEffects：["*.css"]    // 忽略.css文件的使用
  ```

### 代码分割
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当希望打包后的代码也有多个时，就需要讲文件入口`entry`写成对象形式，或者配置`optimization`。  
```js
  module.exports = {
    // entry: '',  // 单入口文件，输出时也是一个文件
    entry:{     // 多入口文件，输出也是多个文件
      index: '',
      test: '',   
    }
    // ...
    optimization:{
      // 1.可以将node_modules中代码单独打包一个chunk最终输出; 
      // 2.自动分析多入口chunk，将相同的文件打包形成一个单独的chunk
      splitchunks: { 
        chunks : 'all' 
      }
    }
  }
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当你需要对某个文件单独打包时，你可以进行以下操作，此种打包方式为动态加载资源，为懒加载的实现方式。  
```js
  import( '/*webpackChunkName: 'test'*/ ./test ' )        
  // /*webpackChunkName: 'test*/ 为单独打包的文件起一个别名
    .then(() =>{
      // 加载成功   
    })
    .catch(() =>{
      // 加载失败
    })
```

### 懒加载和预加载
+ 懒加载：使用时才会加载，实现方式见上。
+ 预加载：在使用前会加载，在浏览器空闲时加载。
```js
  import( '/*webpackChunkName: 'test', webpackPrefetch: true */ ./test')        
  // /*webpackChunkName: 'test*/ 为单独打包的文件起一个别名
    .then(() =>{
      // 加载成功   
    })
    .catch(() =>{
      // 加载失败
    })
```

### PWA渐进式网络开发应用程序
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PWA渐进式网络开发应用程序: 当没有网络连接时，它可以离线使用，它可以缓存上一次联网交互过程中的数据，现在使用的已经很少了，了解即可。  
```js
  const workboxWebpackPlugin = require( ' workbox-webpack-plugin')

  plugins:[
    new workboxwebpackPlugin.GenerateSw({      
      // 1．帮助serviceworker快速启动   
      // 2．删除旧的serviceworker 
      clientsclaim: true,
      skipwaiting : true
    })    
  ]

  // 入口文件
  if ('serviceworker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceworker.register( '/service-worker.js' )
        .then(() => {

        })
        .catch(() =>{

        })
    });
  });

  // package.json ==> eslintConfig
  "eslintConfig": {
    "extends": "airbnb-base",   // 语法检查js
    "env" : {  "browser" : true  }  
  },
```

### 多进程打包
```js
  // 加快打包速率
  // 但进程启动需要大约600ms，因此在文件不大时可能开启多进程反而比不开启更慢。
  {   // 兼容性处理
    test: /.js$/,
    exclude: /node_modules/,        
    use: [
      {
        loader: 'thread-loaaer',
        options:{　　　　　　　　
          workers: 2,
        }, 
      },
      {
        loader: 'babel-loader',
        options: {     
          presets : [
            // ... 
          ]
        }
      }
    ]
```

### externals
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;防止将某些包打包到最终输出中。这样的需要自己引入需要的文件。 
```js
  module.exports = {
    // ...
    externals: {     //忽略库名-- npm包名
      jquery: 'jQuery'
    }     
  }
```

### dll动态链接库
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;新建一个`webpack.dll.js`，运行`webpack --config webpack.dll.js`。  
```js
  const { resolve } = require( 'path' );
  const webpack = require( 'webpack' );
  module.exports = {
    entry: {
      jquery: ['jquery'] 
    },   
    // 1. 最终打包生成的[name] -->jquery   
    // 2. ['jquery'] -->要打包的库是jquery
    output: {
      filename: '[name].js',
      path: resolve(_dirname，'dll '),　　
      library: '[name]_[hash]'  
    } ，       //打包的库里面向外暴露出去的内容叫什么名字
    plugins:[
      new webpack.DllPlugin({         
        // 打包生成一个manifest.json -->提供和jquery映射
        name: '[name]_[hash] ',     // 映射库的暴露的内容名称
        path: resolve( __dirname, 'dll/manifest.json')  //输出文件路径
      })
    ],    
    mode: 'production'
  };
```
```js
  // 在webpack.config.js引用
  plugins:[
    new webpack.D11ReferencePlugin({   // 告诉webpack哪些不需要打包
      manifest: resolve(_dirname, 'dll/manifest.json')
    })
    new AddAssetHtmlwebpackPlugin({
      filepath: resolve(__dirname,'dl1/jquery.js ')
    })
  ]
```

### optimization详细配置
```js
  splitChunks:{
    chunks:'all',
    // 分割的chunk最小为30kbmaxsiza: 6，l/最大没有限制
    minsize: 30*1024,
    // 要提取的chunk最少被引用1次
    minChunks: 1,
    // 按需加载时并行加载的文件的最大数量
    maxAsyncRequests: 5,
    // 入口js文件最大并行请求数量
    maxInitialRequests: 3,
    // 名称连接
    automaticNameDelimiter: '~',
    // 可以使用命名规则
    name : true,
    cacheGroups: {
      // 分割chunk的组，node_modules文件会被打包到 vendors 组的chunk中。
      // vendors~xxx.js，满足上面的公共规则，如:大小超过30kb，至少被引用一次。
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10，   // 优先级
      },
      default: {
        minchunks: 2,    // 要提取的chunk最少被引用2次
        priority: -20,     // 优先级
        // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
        reuseExistingChunk: true,  
      }
    },
    hashruntimeChunk :{
      // 将当前模块的记录其他模块的hash单独打包为一个文件runtime
      // 防止修改a文件导致b文件中引用的hash值变化
      name: entrypoint => 'runtime-${entrypoint.name}'
    }
    minimizer:[
      // 配置生产环境的压缩方案:js和css
      new TerserwebpackPlugin({
        cache: true,    // 开启缓存　　　　　　
        parallel: true, // 开启多进程打包
        sourceMap: true,  // 启动source-map
      })    
    ]
  }
```
