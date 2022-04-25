// export default mixin = {
//   data() {
//     return {
//       // 在.vue中js代码区可以写的这里都可写
//       buttonName:"我是按钮",
//     }
//   },
//   methods:{
//     buttonClick(){
//       console.log("你点我了，我不开心")
//     }
//   }
// },

// export default {
//   install(Vue){   // 大家注意，这里可以接受到的参数是vm的缔造者Vue,因此我们能在vm上做到的事情在这都可以办到
//     // 定义一个过滤器
//     Vue.filters('myslice',function(value){
//       return value.slice(0,4)
//     })
//     // 定义一个自定义指令
//     Vue.directive('big',{
//       bind(element,binding){     // 指令与元素绑定成功时调用
//         element.innerText = binding.value * 10
//       },
//       inseted(element,binding){    //指令所在元素插入页面时调用
//         element.focus()
//       },
//       update(element,binding){    //所在位置被重新解析时调用
//         element.innerText = binding.value * 10
//       },
//     })
//     // 定义一个混合
//     Vue.mixin({
//       data() {
//         return {
//           // 在.vue中js代码区可以写的这里都可写
//           buttonName:"我是按钮",
//         }
//       },
//       methods:{
//         buttonClick(){
//           console.log("你点我了，我不开心")
//         }
//       }
//     })

//     // 给Vue的原型链上添加一个方法名为demo
//     Vue.prototype.demo = ()=>{
//       console.log("hello")
//     }
//   }
// }

import ref from 'vue'
export default function(){
  let name = ref('jeck');

  function updataName(){
    name.value = '张三'
  };

  return name;
}
