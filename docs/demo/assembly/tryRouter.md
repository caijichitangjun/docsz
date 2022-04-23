---
title: router路由跳转
description: 'vue-cli搭建的项目的相关内容简介'
date: ''
sidebar: 'auto'
categories: 
 - vue
tags: 
 - vue
prev: ./vuexDemo
next: false
publish: true
---

## router
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**什么是路由？**
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在计算机网络中，它的定义是路由是指分组从源到目的地时，决定端到端路径的网络范围的进程，即决定下一跳的目的地的路径集合体。在vue中，路由route也发挥着指挥页面跳转的功能，我们知道vue是单页应用，所有的内容都在最大的组件App上，App也由一个个的小组件组成，路由就是决定哪些小组件需要切换为哪些另外的组件,同时还保证页面不刷新。

### 使用路由
> 1. 安装 : npm i vue-router   // 该命令默认安装最新版  
<span style="color:red">注意，如果是最新版vue（vue3）创建的项目，使用此命令创建下载vue-router是没有问题的，但是如果是由vue2创建的项目请使用`npm i vue-router@3`，否则可能产生错误。</span>

> 2. 声明使用 :   
```
main.js：
  import VueRouter from 'vue-router' 
  Vue.use(VueRouter)
  new Vue({
    el: '#root',
    render:h => h(App),
    router,    // 这里只能写router
  })

在src下创建route文件，route文件下创建index.js
  import VueRouter from 'vue-router'   
  const router = new VueRouter({ ...  })   
  export default router
```
> 3. 路由跳转与显示  
  跳转: `<router-link active-class="active" to="/about">About</router-link>`  
  显示: `<router-view></router-view>`  
> 4. 不借助router-link跳转
>> + this.$router.push()    // 追加历史记录
>> + this.$router.replace()   //替换当前记录
>> + this.$router.forword()   //前进
>> + this.$router.back()    //后退
>> + this.$router.go()   //既可前进也可后退  
eg: this.$router.push({path:'/issueDocument',query:{editForm :this.editForm}})   //path为跳转地址，query为携带的参数。

### route与router
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;router是所有路由组件（所有可以通过路由使用的组件）的控制着，route则是当前所在路由的所有信息，往往我们可以从route上获取到上级传递的数据（query），且每个route的指向地址不同，即相互独立.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当我们通过路由跳转时，隐藏的路由组件默认是被销毁的。router的具体路由配置如下：
```
单级路由:
  import User from "./User";
  import Login from "./Login";
  const router = new VueRouter({
    mode: 'hash / history', // 后面会解释
    routes: [
      {
        path: '/',   // 路由跳转位置，什么都不写代表默认页面进入位置
        name: 'login',   // 同样作用于路径跳转，当path完整路径较长时，可以使用name属性作为跳转的‘指引’。
        component: Login,   // 和import时的命名保持一致
        meta:{},        // 路由元信息，一般标识着是否需要经过路由守卫校验
      },
      {
        path: '/user',
        name: 'User',
        component: User
      }
    ] 
  })  
```
```
多级路由:
  import User from "./User";
  import Login from "./Login";
  import HomePage from "./homePage";
  const router = new VueRouter({
    mode: 'hash / history', // 后面会解释
    routes: [
      {
        path: '/',   // 路由跳转位置，什么都不写代表默认页面进入位置
        name: 'Login',   // 
        component: Login   // 和import时的命名保持一致
      },
      {
        path: '/homePage',
        name: 'HomePage',
        component: HomePage,
        meta: { title: '首页' },   // element配置面包糠的，即多级导航
        children: [
          {
            path: '/user',
            // 这里关于children子路径内部需不需要加'/'的问题，需要你自己去试一下，官方文档上无论是3.0还是4.0的示例代码都没有添加'/'，
            // 但是在实际工作中不加'/'有时反而无法跳转，博主的大学生涯所参加的嵌套路由的编写都加了'/'的，因此此处还需大家自行尝试解决，工作量也不大。
            name: 'User',
            component: User
          }
        ]
      }
    ] 
  })  
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在路由跳转中，跳转的路径path必须是完整的`/homePage/user`，任何的偷工减料都可能导致无法跳转，当然也有例外，当采用对象式或函数式时，可以将path属性替换为name属性即可。

### 路由跳转与参数携带
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上文我们介绍了借助`router-link`跳转和借助函数push、replace的跳转方式，在本文中我其实更推荐不使用`router-link`跳转的方式，因为这样使我们的html简洁一点，所有和逻辑相关的东西都利用js代码去实现反而更清晰，但我们在此处仍会介绍`router-link`跳转，了解了它的诸多注意点，孰优孰劣自见分晓。
```
普遍写法：
  不携带参数：
    <router-link to="/homePage/user">User</router-link>
  携带参数query：
    <router-link :to="'/homePage/user?editForm=${editForm}'">User</router-link>
  携带参数params：
    跳转区：
      <router-link :to="'/homePage/user/${editForm}">User</router-link>
    store/index.js文件：
      {
        path: '/user/:editForm',  // :为占位符，editForm为参数名 
        name: 'user',
        component: user
      }

对象写法： 
  <router-link 
  :to="{
    path:'/homePage/user',
    query:{
      editForm :this.editForm,
    }
  }"></router-link>
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在路由跳转中传递的参数都是有谁替我们保管的呢？在前文中我们介绍父子组件传值时用到的props，我们这里的路由跳转传值和父子组件传值其实是类似的，也通过props接收数据，只不过props并非写在组件内，而是写在`store/index.js`文件下。
```
store/index.js文件：
  {
    path: '/user/:editForm',  // :为占位符，editForm为参数名 
    name: 'user',
    component: user
    // props:{ ... },   // 这种是写死的数据，一般不采用
    // props: true,     // 当props值为真时，传递的params参数会以父子组件传值的方式传递给子路由的props，接收即可使用。但我们很少传params参数，一般传的都是query参数。
    props( route ){     // 这个其实用的也不多，谁会在一开始就写好了要传递什么呢！而且代码量也没有减少多少。
      return { editForm : route.editForm } // 这里的route就是当前所要跳转的路由组件身上携带的route。
    }
  } 
```

### 路由器工作模式

#### replace
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;replace的作用是控制路由跳转时操作浏览器历史记录的模式  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;浏览器的历史记录有两种写入方式：分别为```push```和```replace```，```push```是追加历史记录，```replace```是替换当前记录。路由跳转时候默认为```push```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如何开启```replace```模式：```<router-link replace .......>User</router-link>```

#### 缓存路由组件
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作用：让不展示的路由组件保持挂载，不被销毁。  
```
  <keep-alive include="User">    //User，组件的名称
    <router-view></router-view>
  </keep-alive>
```

#### 两个生命周期钩子
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;见[vue生命周期](../basis/lifeCycle.md)

#### 路由器工作模式
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这里所要简介的是最开始编写router时的配置项mode。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hash模式和history模式，hash模式是：对于一个url中#号后面的内容就是hash值，在请求时不会带给服务器。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hash模式：  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 地址中永远带着#号，不美观。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 兼容性较好。  
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;history模式：  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 地址干净，美观 。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 兼容性和hash模式相比略差。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。  

### 路由守卫

#### 全局前置/后置路由守卫
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;全局前置路由守卫在初始化和要发生路由跳转时被调用，由于前置路由上有next函数控制是否跳转，往往需要在全局前置路由守卫中对某些路由组件进行判断，这时需要我们为需要判断的路由组件添加一类共同的标识符，这类信息一般集中于meta中。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;全局后置路由守卫在初始化和已经发生路由跳转时被调用。
```
前置路由：
  router.beforeEach((to,from,next)=>{   // 这里箭头函数和普通函数都可以
    // to是将要去的路由route对象
    // from是发起跳转请求的路由route对象
    // next是函数，控制着是否放行。
    next();
  })

后置路由
  router.afterEach((to,from)=>{
    // 在这里一般配置的是路由跳转后页面的一些变化信息，例如页面标题、图标切换等。
  })
```
#### 独享路由守卫
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;独享路由守卫一般作用于某一特定的路由被切换时触发。
```
routes: [
  {
    path: '/user',
    name: 'User',
    component: User,
    beforeEnter(to,from,next){
      next();
    }
  }
] 
```
#### 组件内部路由守卫
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组件内部路由守卫定义在组件内部，控制着该路由组件如何进入和如何进入下一个路由组件。
```
进入守卫：
  beforeRouteEnter (to, from, next) { ... },
离开守卫：
  beforeRouteLeave (to, from, next) { ... },
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;触发时机如下：
|      |      |      |      |      |
| ---- | ---- | ---- | ---- | ---- |
| /login组件 | beforeRouteEnter触发| /user组件 | beforeRouteLeave触发 | /find组件 |



