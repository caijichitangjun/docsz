---
title: vue基础-计算与监视属性
description: '在进行项目讲解前的vue基础讲解'
date: ''
sidebar: 'auto'
categories: 
 - vue
tags: 
 - vue
prev: ./vueEvent
next: ./listRendering
publish: true
---

## 计算与监视属性
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在数据绑定中，我们知道data中定义的数据都可以视为属性，我们这里所要了解的就是属性间的计算，包括拼接、整形等，也可以对属性进行监视，在介绍数据绑定时的响应式帮助我们完成对数据的更改、存储与展示，而这里提到的监视属性则是在属性更改时触发，类似于set方法。

### computed计算属性
```vue
<script>
  export default {
    data() {
      return {
        firstName:'',
        lastName:'',
      }
    },
  };
</script>
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请思考以下场景，我们每个人都有姓和名（firstName和lastName），假设在某一个场景下，需要显示一个人的全名，那么我们有几种方法呢？
> 1. 插值语法: <span v-pre>{{ firstName }}-{{ lastName }} </span>  
> 缺点：当需要处理的属性较为复杂时，在html代码段中的内容就会很长，影响阅读与维护，而且并非所有的操作都能在这里实现  
> 2. 自定义方法+插值语法:<span v-pre>{{ getFullName() }}</span>  
>  methods:{  
>  &nbsp;&nbsp;&nbsp;getFullName(){  
>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return this.firstName + '-' + this.lastName;  
>  &nbsp;&nbsp;&nbsp;}  
>  }  
> 缺点：（仅个人观点）自定义的方法需要触发，在这里只有一种方式，即模版重新解析，假设模版不重新解析，其实是做不到实时更新的。  
> 3. 计算属性+插值语法：<span v-pre>{{ fullName }}</span>  
> conputed:{  
> &nbsp;&nbsp;&nbsp;fullName:{  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;get(){return this.firstName + '-' + this.lastName;}  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//get在1·初次读取；2·依赖的属性发生变化时被调用
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;set(){}  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//set在计算属性被更改时调用，当然如果不会更改，也可以不写set。
> &nbsp;&nbsp;&nbsp;}  
> }  
> 说明: 这里的get和set就是在数据绑定时我们使用的Object.definePrperty实现的，自然不需要模版重新解析也可以得到实时响应数据。当然计算属性也是有简写形式的。    
> 4. 计算属性(简写)+插值语法：<span v-pre>{{ fullName }}</span>  
> <span style="color:red">\# 当不需要set时才能使用简写方式</span>    
> conputed:{  
> &nbsp;&nbsp;&nbsp;fullName(){  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return this.firstName + '-' + this.lastName;   
> &nbsp;&nbsp;&nbsp;}  
> }  

### watch监视属性
```vue
<script>
  export default {
    data() {
      return {
        isman:true;
      }
    },
  };
</script>
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计算属性一般使用在处理数据场景，而监视属性则用于监测数据是否更改，在vue中，watch监视属性不仅可以监视data中的属性还可以监视computed计算属性。
```vue
<script>
  export default {
    watch:{       // 监视属性watch:
      isman:{
        deep:true;   //开启深度监视，多作用于监测对象内部属性，其实vue是可以监视对象的属性值变化，无论它有多少层，但watch不行，只能使用深度监测的方式
        immediate: true;  // 使监视器在初始化时被定义一次
        hanler(newvalue,oldvalue){   //获得两个值，修改后和修改前的数据
          //处理数据、调用函数等
        }
      }
    },
    // watch:{   // 简写watch: (此时不能配置deep和immediate)
    //   isman(newvalue,oldvalue){   //获得两个值，修改后和修改前的数据
    //     //处理数据、调用函数等
    //   }
    // } 
  };
</script>
  
```

### vue3中的computed和watch

#### computed
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作为组合式Api，自然内部的内容多为函数。
```vue
<script>   
  import { computed } from 'vue'
  export default {
    setup(){
      let Fname = '张';
      let Lname = '三';
      // 缩略写法  
      let fullName = computed(()=>{
        return Fname.value + '-' + Lname.value;
      });
      // 完整写法    
      let fullName = computed({ 
        get(){
          return Fname.value + '-' + Lname.value;
        },
        set(value){
          const name = value.split('-');
          Fname.value = name[0];
          Lname.value = name[1];
        }
      }),
    }
  };
</script>
```

#### watch
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作为组合式Api，自然内部的内容多为函数。
```vue
<script>   
  import { watch, ref, reactive } from 'vue'
  export default {
    setup(){
      let sum = ref(18),
      let age = ref(19),
      let stu = reactive({
        name:'123',
        age:12,
      })
      // 监视一个
      watch(sum,(newValue,oldValue)=>{
        console.log('sum变化了');
      },{immediate:true}),

      // 监视多个
      watch([sum, age],(newValue,oldValue)=>{
        console.log('sum/age变化了');
      },{immediate:true}),

      // 监视对象
      watch(stu,(newValue,oldValue)=>{
        console.log('stu变化了');
      },{immediate:true}),

      // 监视对象内某个属性
      watch(()=>person.job,(newValue,oldValue)=>{
        console.log('stu变化了');
      },{immediate:true, deep:true}),
    }
  };
</script>
```
+ 监视多个时，newValue和oldValue为多个数据组成的数组
+ 监视数组时，无法获取到oldValue，此时的oldValue和newValue一致，默认开启深度监视。
+ 监视数组内部属性时，需要开启深度监视`deep:true`

### watchEffect函数
```vue
<script>   
  import { watchEffect, ref } from 'vue'
  export default {
    setup(){
      let sum = ref(18),
      watchEffect(()=>{
        sum.value++;
        console.log('watchEffect监视的是该函数内部使用到的变量')
      })
    }
  };
</script>
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.与watch的对比  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;watch：既要指明监视的属性，也要指明监视的回调  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;watchEffect：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.与computed的对比  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;computed注重计算出来的值（回调函数的返回值）,所以必须要写返回值。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;watchEffect更注重的是过程（回调函数的函数体）,所以不用写返回值。  



