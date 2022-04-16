---
title: ref、props、mixin和插件
description: 'vue-cli搭建的项目的相关内容简介'
date: ''
sidebar: 'auto'
categories: 
 - vue
tags: 
 - vue
 - assembly
prev: ./assembly
next: ./storaged
publish: true
---

## 通信配置
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;前文我们介绍了组件的相关写法和使用，可是有一个问题我们还没有解决，组件间的this互不认识，我们怎么传递组件间的数据呢？  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在本文中我们会为大家介绍几种方法，因为组件间通信使用相当频繁，相应的方法也很多，大家有些方法是在理解不了也不要担心，掌握其中的两三种能冷静应对日常中的问题就够了，当然为了提高水平，还是提倡大家对一些涉及原理的东西做一些了解。

### ref属性
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通常用于父组件获取子组件的数据和方法。
```
  <template>
    <div>
      <h2 ref="title">{{ shwoInfo }}</h2>
      <span style="color:red"></span>
    </div>
  </template>

  <script>
  export default {
    name: "BreadCrumb",
    data() {
      return {
        shwoInfo: "我是一个组件", 
      }
    },
    mounted(){
      this.init()     // 我个人喜欢使用init来表示，页面初始时，需要拿到的内容，这是我的个人习惯，你完全可以使用自己习惯的方式命名。
    },
    methods:{
      init(){
        console.log(this.$refs.title)  // 这里就能拿到ref标识的h2标签
      }
    }
  };
  </script>
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;相当于id属性，作用是为标签做标识，而且编写了ref属性的标签可以通过`this.$refs`收集到所有被ref标识过的内容，如果ref标识的不是一个组件，而是一个组件，那么会收集到Vuecomponents创建的组件实例对象，有了这个，获取到组件的数据和方法自然轻而易举。

### props
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;props通常用于父组件向子组件传值和方法。
```
  <template>     <!-- 创建一个组件，写法和正常的vue文件书写方式一致 -->
    <div>
      <h2>{{ shwoInfo }}</h2>
      <!-- 加‘el’是因为我一般都会引入element-ui组件库 -->
      <el-button @click="showHolle">点击<el-button>   
    </div>
  </template>

  <script>
  export default {
    name: "BreadCrumb",
    props:['age','shwoInfo','showHolle'],    // 接收从父组件传递的信息
    data() {
      return {
        shwoInfo: "子组件",   
      }
    },
  };
  </script>
```
```
  <template>
    <div>
      <h2>{{ shwoInfo }}</h2>
      <IndependentQuery age="18" :shwoInfo="shwoInfo" :showHolle="showHolle"/>    // 使用声明的组件
    </div>
  </template>

  <script>
  import IndependentQuery from './independentQuery'
  export default {
    name: 'filghtInfo',
    components:{IndependentQuery},   // 声明一个组件
    data() {
      return {
        shwoInfo: "父组件",
      };
    },
    methods:{
      showHolle(){
        consolo.log("我被子组件调用了")
      }
    }
  };
</script>
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;props传递数据和方法还是有一些需要注意点:
> 1. 数据传输：  
通过我们的演示代码，我们发现我们可以发现，props传递的对象可以是静态数据、data定义数据、methods方法。当传递的为静态数据时，传递的都为字符串，如果需要传递数字需要使用绑定的形式`:age="18"`
> 2. 传输限制：  
在props传递数据中，我们可能接收到与我们预期不同的类型或缺少相应数据，这时为了避免使用时出现问题，我们需要对接收的数据做出限制
```
常见写法：props:['age','shwoInfo','showHolle'],
简单限制：props:{         //仅对传入类型限制
            age:Number,
            shwoInfo:String
            showHolle:func  //这个就是限制为函数
          },
完整限制：props:{         //仅对传入类型限制
            age:{
              type:Number,  // 类型限制
              requied:true,  // 是否必传
              default:18,   // 默认值
            },
            ...
          },
```
> 3. 重名问题：  
当书写内容过多时，通过props传入的内容很有可能会与data数据重名，重名时数据属性值以外部传入为主。
> 4. 修改限制：  
通过props传入的内容是可以修改的，但是不提倡修改，有时可能会产生很奇怪的问题。如果实在需要修改，可以通过配置修改，如`myage:this.age`，即在data中配置一个属性去接收想要修改的内容。
> 5. props传入命名：  
无法使用已经绑定了其他功能的关键字为想要传递的属性命名。如~~key="你好"~~，这种使用就会报错。

### mixin
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mixin意为混合，意思是将组件中的相同数据和方法抽离出去形成一个单独的文件，然后在需要使用这些方法或数据的地方将混合引入即可，如下。
```
.vue文件中，引入混合
  <template>
    <div>
      <el-button @click="buttonClick">{{ buttonName }}</el-button>
    </div>
  </template>

  <script>
  import mixin from './mixin'   // 引入混合
  export default {
    name: "BreadCrumb",
    data() {
      return {

      }
    },
    mixins:[mixin]   
  };
  </script>

mixin.js中（命名是随意的，引入的时候别写岔了就行，一个js文件中也可以写多个混合。）
  export default mixin = {
    data() {
      return {
        // 在.vue中js代码区可以写的这里都可写
        buttonName:"我是按钮",
      }
    },
    methods:{
      buttonClick(){
        console.log("你点我了，我不开心")
      }
    }
  }
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mixin传递数据和方法还是有一些需要注意点:  
> 1. 重名问题  
>> + data数据：以.vue文件中的为准，即mixin.js文件中的数据不会去破坏原本.vue中的数据值。  
>> + 生命周期内的方法：两者都留存，即都发生作用，当mixin.js文件中的方法先触发。  
>> + 其他：以以.vue文件中的为准。

### 插件
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;插件的作用可以对vue进行增强&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[你被强化了，快上！]  
```
export default {
  install(Vue){   // 大家注意，这里可以接受到的参数是vm的缔造者Vue,因此我们能在vm上做到的事情在这都可以办到
    // 定义一个过滤器
    Vue.filters('myslice',function(value){
      return value.slice(0,4)
    })
    // 定义一个自定义指令
    Vue.directive('big',{
      bind(element,binding){     // 指令与元素绑定成功时调用
        element.innerText = binding.value * 10
      },
      inseted(element,binding){    //指令所在元素插入页面时调用
        element.focus()
      },
      update(element,binding){    //所在位置被重新解析时调用
        element.innerText = binding.value * 10
      },
    })
    // 定义一个混合
    Vue.mixin({
      data() {
        return {
          // 在.vue中js代码区可以写的这里都可写
          buttonName:"我是按钮",
        }
      },
      methods:{
        buttonClick(){
          console.log("你点我了，我不开心")
        }
      }
    })

    // 给Vue的原型链上添加一个方法名为demo
    Vue.prototype.demo = ()=>{
      console.log("hello")
    }
  }
}
```
```
main.js中把插件激活(我个人喜欢把.vue文件集中放在src/view文件夹内，大家不用纠结，纯属个人习惯)
  import plugin from './view/plugins.js'  
  Vue.use(plugin)
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如上文中创建和激活插件的就可以在所有的.vue文件中使用在plugin.js中定义的内容，相当强大。






