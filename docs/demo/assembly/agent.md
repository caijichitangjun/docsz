---
title: 请求与跨域
description: 'vue-cli搭建的项目的相关内容简介'
date: ''
sidebar: 'auto'
categories: 
 - vue
tags: 
 - vue
prev: ./animation
next: ./slot
publish: true
---

## 请求
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作为一个前端开发人员，向后端请求数据是一件十分正常的事情，向后端发送请求目前为止，使用较多的有四种方法；  
> 1. xhr : new XMLHttpRequest()构造一个xhr对象，通过send将请求发送出去，通过open配置请求信息...  
> 2. jQuery: 包装xhr，通过\$.get和\$.post发送post和get请求，但是其内部大量内容都是在亲自操作dom，因此在vue中并没有采用这种方式。  
> 3. axios: 包装xhr，promise风格，且体积小，还可以配置请求和响应拦截器。  
> 4. fetch: 和xhr同级的存在。同样是promise风格，但其封装了两层，需要两次.then才能拿到数据，且不支持ie。  
> 5. vue-resource: vue的插件库

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;综合以上的考虑，在vue和react中我们使用的仍是axios，写法如下，未来可能会使用到fetch。
```
  export function login(username,password) {
    return axios({ 
      url: 'http://47.93.232.115:8080/login',
      method: 'get',
      params:{username,password}
    })
  }
```

### vue-resource
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vue-resource插件在vue1版本使用较为频繁，在以后的2和3版本中还是更推荐axios，了解即可。
```
main.js:
  import vueResource from 'vue-resource'
  Vue.use(vueResource)

.vue文件:
  export function login(username,password) {
    return this.$http({ 
      url: 'http://47.93.232.115:8080/login',
      method: 'get',
      params:{username,password}
    })
  }
```

## 跨域问题
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a页面想获取b页面资源，如果a、b页面的协议（http / https）、域名、端口（8080）、子域名（www）不同，所进行的访问行动都是跨域的，而浏览器为了安全问题一般都限制了跨域访问，也就是不允许跨域请求资源。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**如何解决跨域问题？**

### cors
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cors解决跨域的原理很简单，在后端的服务器返回数据时，携带上特殊的相应头，即浏览器允许跨域传输数据的响应头，但带来的问题是，任何其他服务器都可以向该服务器请求数据，安全问题有一定隐患。

### jsonp
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jsonp解决跨域的方法比较巧妙，借助script标签的src引入外部资源时，不受外部限制的特点实现，因为jsonp所需要的文件格式特殊，需要后端人员将JSON数据转换成想要的script tags的形式且只能解决get跨域问题。使用较少。

### 代理服务器
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;代理服务器的端口号和前端的端口号保持一致，这时，前端技术向代理服务器发送请求就不会有跨域问题，而服务器与服务器间传递数据没有跨域限制。

#### nginx
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nginx是后端开启的反向代理服务器，学习需要有后端的技术基础。

#### vue-cli代理
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[官网参考](https://cli.vuejs.org/zh/config/#devserver-proxy)，vue提供给我们的代理服务器其实就是我们的项目本身，代理服务会优先访问本地的数据，因此请求信息时应尽量少使用相同的路径，避免请求错误。
```
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: '<url>',
        pathREwrite:{'^/api':''}  //重写路径，去掉我们作为区分的前缀
        ws: true,  // 用于支持webSocket
        changeOrigin: true  // 用设置请求方的是否如实显示请求端口
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  }
}
```

