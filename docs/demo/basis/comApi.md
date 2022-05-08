---
title: vue基础-组合式Api
description: '在进行项目讲解前的vue基础讲解'
date: '2022-4-10'
sidebar: 'auto'
categories: 
 - vue
tags: 
 - vue
prev: ./template
next: ./vuedata
publish: true
---

## 组合式Api
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;什么是组合式Api？  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;简单来说就是将处理一类功能的代码集中在一起的Api，在Vue3中被正式引用，用于解决功能、数据和业务逻辑分散的问题，使项目更益于模块化开发以及后期维护。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在Vue2中还没有组合式的概念，它的功能代码分散在每个代码片段data、methods等内部，在这里我们会先介绍vue2的.vue文件结构。然后在vue2的基础上介绍vue3的结构。  
<span style="color:red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在这里介绍的组合式Api只是常用的一些，[非常用Api](./comApiOthers.md)。</span>  

### vue2
```vue
<script>
  import trySlot from "./trySlot";    
  export default {
    name: "tryAll",
    components: { },
    props: [],
    data() {
      return {
        name:'张三',
      };
    },
    created() {},
    computed: {},
    watch: {},
    methods: {
      getName(){
        return this.name;
      }
    },
  };
</script>
```
+ import ：资源引入区，完善代码功能
+ name ：自身的组件标识
+ components ：[外部组件](../assembly/assembly.md)的注册
+ props ：接收[父组件传递的参数](../assembly/configAndProper.md)或上级[路由传递的参数](../assembly/tryRouter.md)
+ data : [数据](./vuedata.md)的存放位置（写在return中）
+ created : [生命周期函数](./lifeCycle.md)之一，挂载前，用于获取后端数据、开启定时器等。（此处仅列举一项）
+ computed ：[计算属性](./calcuAndMonitor.md)的定义区
+ watch ：[监视属性](./calcuAndMonitor.md)的定义区
+ methods ：[一般方法](./vueEvent.md)的定义区

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在vue2中，定义数据和方法时，直接定义在指定位置即可使用，如上。

### vue3
```vue
<script>
  import trySlot from "./trySlot";    
  import {ref,reactive} from 'vue'
  export default {
    name: "tryAll",
    components: { },
    props: [],
    emits: [], 
    setup(){     // 在beforeCreate之前调用一次，此时的this为undefined
      let name = ref('张三')
      let job1 = reactive({
        type:'student',
        age:18,
      })
      let job2 = reactive({
        type:'student',
        age:18,
      })
      return {}   // 对象
      return () => h('h1','你好啊！’')  // 如果返回的是渲染函数则返回的渲染对象会将该组件的所有内容替换
    }
  };
</script>
```
+ import ：资源引入区，完善代码功能
+ name ：自身的组件标识
+ components ：[外部组件](../assembly/assembly.md)的注册
+ props ：接收[父组件传递的参数](../assembly/configAndProper.md)或上级[路由传递的参数](../assembly/tryRouter.md)
+ emits ：接收父组件向子组件传递的函数
+ setup : 函数，返回值为对象或渲染函数，在vue2中定义的data、methods等都需要定义在setup中。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在vue3中定义数据需要其他的函数辅助，方法定义如vue2.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在[数据绑定](./vuedata.md)一文中我们已经介绍过，只要我们写在data中的数据，vue-cli都会帮我们把其转化为可响应的对象，但在vue3中我们舍弃了data，因此想要实现数据绑定响应式需要借助ref或reactive函数。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ref函数会将数据转化为一个refImpl对象实例，在setup函数中若想要使用该值需要使用`name.value`才能拿到name的值，在html中使用时，则不用.value也可以拿到值。当待处理数据为对象和数组是，ref函数会帮我们调用reactive函数，reactive函数会将对象处理为一个proxy实例对象，在setup中引用该实例对象内部属性值则需要`job1.value.age`，在html中使用时，则不用.value也可以拿到值。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reactive函数直接处理对象，在setup中引用该实例对象内部属性值则需要`job2.age`，不需要再借助.value，原理请参考[数据绑定](./vuedata.md)。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setup函数的执行时机在beforeCreate之前且能接收到两个参数props和context.   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;props参数接收的是父组件向子组件传递的参数。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;context是上下文对象，有三个我们较为关心的参数。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; attrs：相当于\$attrs，接受的是未声明接收的参数。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; emit：接受的是父组件向子组件传递的方法。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; slots：父组件传递给子组件的插槽。    
<span style="color:red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 注意：在vue3中仍然可以写vue2的代码，即仍可以使用data、methods等，但此时的setup访问不到data中的数据，且命名冲突时以setup中为准。</span>  
<span style="color:red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. props接收上级传递的参数，未声明接收的参数会被收集在\$attrs中。</span>  
<span style="color:red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. \$slots可以取出父组件传递给子组件的插槽</span>  
<span style="color:red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. setup不能是async函数，因为async函数的返回对象是promise，模版看不到return的数据。</span>  

#### toRef和toRefs
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;toRef可以创建一个ref对象，其value值指向另一个对象中的某个属性。`const name = toRef(person,'name')`；toRefs可以将一个对象的每个属性（第一层）全部转化为ref对象`toRefs(person)`。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;应用场景是：将响应式对象中的某个属性单独提供给外部使用时


