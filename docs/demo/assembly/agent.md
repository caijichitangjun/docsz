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
```js
  export function login(username,password) {
    return axios({ 
      url: '/login',
      method: 'get',
      params:{username,password}
    })
  }
```

### vue-resource
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vue-resource插件在vue1版本使用较为频繁，在以后的2和3版本中还是更推荐axios，了解即可。  
```js
main.js:
  import vueResource from 'vue-resource'
  Vue.use(vueResource)

.vue文件:
  export function login(username,password) {
    return this.$http({ 
      url: '/login',
      method: 'get',
      params:{username,password}
    })
  }
```

### 响应与拦截
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;axios还有另一个值得称赞的点，axios可以配置响应和请求拦截器，请求拦截器可以在前端发送请求后统一的为请求添加cookie、headers等信息，同时对错误的请求信息做统一处理；响应拦截器主要是对请求返回的结果进行处理，例如取出数据、展示出错类型等，示例如下：
```js
（1）创建axios实例
  const xhr = axios.create({
    baseURL: '/api',   // 作为前置信息，会加在请求时的url之前，如url:'/login', 混合后的url为/api/login，一般和代理服务器配合使用。
    timeout: 5000,          // 最大响应时间，超时则视为请求失败
    withCredentials: true,  // `withCredentials` 表示跨域请求时是否需要使用凭证
    headers: {'X-Requested-With': 'XMLHttpRequest'},  // 配置请求头，一般用于携带cookie信息。
  })

（2）请求拦截器:
  xhr.interceptors.request.use(   // 这里的xhr就是创建的axios实例
    config => {
      // 在发送请求之前做些什么
      return config;
    }, 
    error => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

（3）添加响应拦截器
  xhr.interceptors.response.use(
    response => {
      // 对响应数据做点什么
      return response;
    },
    error => {
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );

（4）暴露axios实例
  export default xhr
```

## 跨域问题
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a页面想获取b页面资源，如果a、b页面的协议（http / https）、域名、端口（8080）、子域名（www）不同，所进行的访问行动都是跨域的，而浏览器为了安全问题一般都限制了跨域访问，也就是不允许跨域请求资源。那么如何解决跨域问题？  

### cors
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cors解决跨域的原理很简单，在后端的服务器返回数据时，携带上特殊的相应头，即浏览器允许跨域传输数据的响应头，但带来的问题是，任何其他服务器都可以向该服务器请求数据，安全问题有一定隐患。

### jsonp
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jsonp解决跨域的方法比较巧妙，借助script标签的src引入外部资源时，不受限制的特点实现，因为jsonp所需要的文件格式特殊，需要后端人员将JSON数据转换成想要的script tags的形式且只能解决get跨域问题。使用较少。

### 代理服务器
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;代理服务器的端口号和前端的端口号保持一致，这时，前端技术向代理服务器发送请求就不会有跨域问题，而服务器与服务器间传递数据没有跨域限制。

#### nginx
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nginx是后端开启的反向代理服务器，学习需要有后端的技术基础。

#### vue-cli代理
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vue提供给我们的代理服务器其实就是我们的项目本身，代理服务会优先访问本地的数据，因此请求信息时应尽量少使用相同的路径，避免请求错误。[官网参考](https://cli.vuejs.org/zh/config/#devserver-proxy)，
```js
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

