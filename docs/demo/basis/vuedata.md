---
title: vue基础-数据绑定
description: '在进行项目讲解前的vue基础讲解'
date: ''
sidebar: 'auto'
categories: 
 - vue
tags: 
 - vue
 - binding
prev: ./hooks
next: ./vueEvent
publish: true
---

## 数据绑定
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**什么是数据绑定？**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在原先我们书写html页面时，有时需要动态的更改某些数据的值、某些选择框的状态等，这时就需要我们使用document.getElementById()等获取到元素，然后再进行修改即可。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在vue中，其为我们提供了三种数据绑定的方式。让我们更改数据以及数据实时展示更加方便。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.单向绑定：v-bind  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.双向绑定：v-model  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.自定义绑定  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;所谓数据绑定，就是当你在页面上通过按钮等对数据进行更改时，需要对存储的数据也做相应的更改并呈现到页面上。相当于一荣俱荣，一损俱损。

### 单向绑定：v-bind
```
代码：
    单向数据绑定<input type="text" v-bind:value="oneway">
    js->data->return{oneway:'单向绑定',}
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;具体写法如上所示。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;所谓单向数据绑定，即为假设input输入框内的内容被键盘输入更改，这时data中的oneway的value值也不会更改。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;简写：v-bind:oneway --> :oneway

### 双向绑定：v-model
```
代码：
    单向数据绑定<input type="text" v-model:value="twoway">
    js->data->return{twoway:'双向绑定',}
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;具体写法如上所示。<span style="color:red">注意：v-model使用场景有限制，v-modle只能使用在表单类元素上，例如input、select等</span>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;所谓双向数据绑定，即为假设input输入框内的内容被键盘输入更改，这时data中的oneway的value值也会被更改。两者是同步的。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;简写：v-model:oneway --> v-model  

### 自定义绑定
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果我们为对象提供新的成员变量，那么当这些对象变化时，不会被vue捕获，无论是在data中存储的数据还是在页面上呈现的数据都不会做出及时的更改。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们有两种写法为对象的一个新增属性添加响应式。
```js
    1.Vue.set(对象，属性，属性值)
    2.vm.$set(对象，属性，属性值)
```

### 绑定数据使用
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果你想在html中直接展示绑定数据而非借助标签，`<div style="color:green">{{twoway}}</div>`，显示效果为<span style="color:green">双向绑定</span>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果你想在js中直接使用绑定数数据，`console.log("我现在展示的是${this.twoway}")`，控制台会输出我现在展示的是双向绑定  

### 单向/双向绑定原理
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大家可能会有一个疑问，vue不是给我们提供了绑定的方法吗？我们直接用不就行了！为什么要去了解原理？  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道理很简单，在上文中我们介绍过了自定义绑定，为新增的属性去添加绑定，这种情况在项目开发中并不少见，因此我们需要对绑定的原理有一定的理解。更功利一点的说法是，在实际的项目开发中需要我们会这些，在面试过程中也可能会问到相关问题，会影响到我们工作、工资。

#### vue2
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在vue2中我们使用的是`object.defineProperty()`来对目标数据进行数据更新。
```js
    number = 19
    Object.defineProperty("需要添加绑定的对象","需要添加绑定的对象属性age",{
      value:"属性值18" //这是一种简单的写法，完整的写法是下面的get和set方法
      enumerable:true, //控制属性是否可以枚举，默认值是false,即遍历对象时，该属性不可遍历
      writable:true，  //控制属性是否可以被修改，默认值是false
      configurable:true //控制属性是否可以被删除，默认值是falseB
      get(){retrun number}
      set(value){ this.number = value//在这里可以对属性值进行修改}
    })
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在vue2中，响应式其实有一点小问题，vue2的响应式并不能对数组进行监视，即只要不变动数组的存储地址，其实更改数组内部的内容，vue2响应式并不能监测到这些变动。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;官方也给出了解决办法，当我们需要修改数组中的数据时，需要我们用到能改变原生数组的方法：push、pop、shift、unshift、splice、sort、reverse，如果这些方法满足不了我们的需求，使用其他方法也可以实现，不过在更新数组后，使用更新后的数组替换原数组即可。
```
    splice:向/从数组添加/删除项目，并返回删除的项目。三个参数（位置"可为负"，需要删除的元素数量，需要添加的元素【可以为多个】）
    reverse：反转数组中元素的顺序
```

#### vue3
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在vue3上使用了一种新的方式，proxy代理和reflect反射。
```js
  // proxy代理和reflect反射
    const p = new Proxy("对象",{         //花括号的内容可以为空，但不能不写。
    //target为数据对象，propName为对象属性，value为修改的值。
      get(target,propName){             //查找时触发
        return Reflect.get(target,propName)
      }             
      set(target,propName,value){       //添加、修改时触发
        Reflect.set(target,propName,value)
      }       
      deleteProperty(target,propName){   //删除时触发
        return Reflect.deleteProperty(target,propName)
      }  
    })
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在vue3上使用的proxy代理和reflect反射解决了在vue2中新增对象属性和修改下标修改数组无响应式的问题。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在vue3中使用Reflect的方式处理数据比在vue2中的object.defineProperty()更安全，假设我们为一个重复的数据添加响应式，在vue2中则会直接报错，这就需要我们去使用try/catch去接收异常，否则我们的项目就直接瘫痪了；但在vue3中Reflect会以返回值的形式去告知用户添加状况，从而确保项目运行的安全。