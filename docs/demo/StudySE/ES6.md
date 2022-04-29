---
title: ES6新特性(上)
description: '简介ES6的新特性'
date: ''
sidebar: 'auto'
categories: 
 - JavaScript
tags: 
 - JavaScript
 - ES
prev: false
next: ./ES6_2
publish: true
---

## ES6
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ES6是在ES5的基础上，添加了一下新特性，来完善js代码的开发需求。  

### 变量声明
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在以往中，我们声明变量时，使用较多是`var`来声明一个全局变量，同时声明的变量存在变量提升，即可以在使用后再定义。在ES6中为我们提供了两个新的声明变量的关键字--let和const。

#### let
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;let定义的是一个局部变量，没有变量提升，不允许重复定义，受块级作用域限制，但受到作用域链限制（当子级自身没有某变量、方法时，会向父级查找，直到找到最深层）。
```javaScript
eg:
  console.log(name);   // 未声明前使用也会报错
  let name = 'zs';
  let name = 'ls';  // 重复声明会报错
  function getname(){
    let age = 18;
    console.log(name);  // 会向上级查找，找到name，然后输出
  }
  console.log(age);    // 块级作用域限制age只在function范围内被访问
```

#### const
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const原本是C语言中的关键字，在ES中，const定义的也是一个局部变量，没有变量提升，不允许重复定义，受块级作用域限制，但受到作用域链限制，同时不允许修改属性值（这里其实指的是不允许修改变量指向的地址）。  
```javaScript
eg:
  console.log(name);   // 未声明前使用也会报错
  const name = 'zs';   // 一般声明时，变量要大写，不要学我😅
  const name = 'ls';   // 重复声明会报错
  const studentXiao = {name: 'zs',age: 18}
  name = 'ww'          // 修改会报错
  studentXiao.age = 20;  // 数组、对象是可以修改内部元素，因为没有更改变量指向的地址。
  function getname(){
    const age = 18;
    console.log(name);  // 会向上级查找，找到name，然后输出
  }
  console.log(age);    // 块级作用域限制age只在function范围内被访问
```

#### 解构赋值
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;顾名思义，对变量原有的结构进行解析，以一定的方式赋给其他变量。  
```javaScript
eg:
  数组:
    let age = [18, 19, 20, 21];
    let [age1, age2, age3, age4] = age;  // 相当于拆散age的结构，将元素赋给等号左边的变量。
    console.log(age1);   // 18
  对象:
    let studentXiao = {name:'zs',age:18};
    let {name, age} = studentXiao;   // 拆散对象，将值赋予属性值相同的变量。
    console.log(age1);
```

### 模版字符串
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在原本的js语法中，定义的字符串有两种`''`和`""`两种，在ES6中新增了一种模版字符串\``(英文模式下左上角第二行第一个)。
```javaScript
eg:
  let name = `字符串`;
  let testStr = `我也是
                 ${name}的一种`   // 字符串间可以穿插换行符
  // 可以使用${变量名}拼接字符串。
```
### 扩展运算符...
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在ES6中除了简写形式，还为我们提供了一种比较好玩的运算符`...`。其作用是展开对象，能将数组转换为逗号分隔的参数序列，相当于把数组压平，展开在需要的地方，示例如下。
```javaScript
eg:
  let age1 = [18, 19];
  let age2 = [20, 21];
  let age3 = [...age1, ...age2];  // [18, 19, 20, 21]相当于concat
  let age4 = [...age1];     // 对象克隆、
  let divs = document.querySelectorAll(div);  // 这里获取到的其实是伪数组
  let divarr = [...divs] //转化伪数组为真正的数组，可以使用数组的方法。
```



### 对象简写
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在以往定义对象时，我们往往会写出这样的代码`name:name`，在ES6中为这种形式添加了专门的简写形式。
```javaScript
eg:
  let name = 'zs';
  // let studentXiao = {name:name,age:18};
  // 简写name:name  ==> name
  let studentXiao = {name,age:18};
```

### 箭头函数()=>{}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在以往定义函数时，我们都会使用`function name(){}`来定义一个函数，如下：
```javaScript
eg:
  let studentXiao = {name: 'zs',age: 18};
  let getAge = (value1,value2)=>{
    // 函数体内部的格式和原一般函数的书写方式一致
    return studentXiao.age
  } 
  // 简写箭头函数，但又要求，不是每一个箭头函数都可以被简写
  // 1. 当只有一个参数时，箭头函数左边的括号()可以删除。
  // 2. 当函数体内部只有一句话，且为return返回时，箭头函数右边的花括号{}可以删除，return可以删除，剩下的会被当做整个函数的返回值返回。
  let getAge = value => studentXiao.age
```

### 函数的参数
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在ES6语法中允许对函数的形参赋初始值，当外部未传递参数时，使用默认值，同时传递参数时也可以使用解构赋值以及扩展运算符接收剩余参数rest，示例如下：
```javaScript
eg: 默认参数值
  function getNumber1(a = 0, c = 10, b){   // 对形参赋初始值
    retrun a + b + c;
  } 
  console.log(getNumber(0, 0))  
  // NAN，当传递的参数不足时，实参会依次赋给形参，不管其有没有默认值
  // 因此，带默认值的形参一般放在较后的位置

eg:解构赋值
  function getNumber2({a:10, b}){   
    // 对形参赋初始值，以解构赋值的形式传参，此时仍可以指定默认参数
    retrun a + b;
  } 
  let age = {a: 10, b: 20}
  console.log(getNumber(age))  // 30 

eg:剩余参数rest
  function getNumber2(...args){   
    // 当不确定传递的参数时，可以使用args接收剩余参数，值为数组
    // 在ES5是arguments，其值为对象。
    console.log(args)  // [10, 20]
  } 
  getNumber2(10, 20);
```

### 基本数据类型symbol
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;symbol是ES6提供的新的数据类型，因为symbol的值唯一，在一定程度上可以解决命名冲突的问题。symbol数据类型不能和其他数据类型做计算，同时定义的symbol对象不能被for遍历，需要其自带的方法Reflect.ownKeys，示例如下：
```javaScript
eg: 定义一个symbol
  let a = Symbol('a');
  let b = Symbol('a');
  console.log(a === b)  // false  即使是同一个值定义的symbol也不相同。
  let c = Symbol.for('a');
  let d = Symbol.for('a');
  console.log(a === b)  // true  通过Symbol.for()创建的symbol对象，参数值相同时，两者相同

eg: 为对象添加方法或类
  let game = { 
    // 假设game中内容很多，但我们又需要为其添加方法或属性。
    // 同时不想覆盖原有的属性或方法，这时就可以借助symbol
    [Symbol.for('say')]: function(){
      // 省略函数体内容
    }
  }
  game[Symbol.for('a')] = function(){
    // 省略函数体内容
  }
  A[Symbol.for('say')]()
```
<span style="color:red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在这里要声明一点，在本人实验后发现，为函数添加方法和属性时不能使用`Symbol()`，因为即使调用时使用的参数一致，因为同一个值定义的symbol也不相等的问题，为对象定义的内容其实是访问不到的</span>  
<span style="color:red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因此如果需要使用symbol为对象添加内容，请使用`Symbol.for()`。</span>  
<span style="color:red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当然出现这样的问题，也有可能是我学艺不精，如有其他见解，欢迎前来交流！</span>  
  
#### Symbol的内置值
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为了满足各种需求，symbol还为我们提供了11个内置值。内容较多，详细请见[symbol内置值](./studySymbol.md)或[详解Symbol](https://blog.csdn.net/fesfsefgs/article/details/108354248)
| symbol内置值 | 调用时机 |
| ---- | ---- |
| Symbol.hasInstance | 当其他对象使用`instanceof`运算符，判断是否为该对象的实例时，会调用这个方法 |
| Symbol.isConcatSpreadable | 对象的`Symbol.isConcatSpreadable`属性等于的是一个布尔值，表示该对象用于`Array.prototype.concat()`时，是否可以展开。 |
| Symbol.species | 创建衍生对象时，会使用该属性 |
| Symbol.match | 当执行`str.match(myObject)`时，如果该属性存在，会调用它，返回该方法的返回值。 |
| Symbol.replace | 当该对象被`str.replace(myObject)`方法调用时，会返回该方法的返回值。 |
| Symbol.search | 当该对象被`str.search(myObject)`方法调用时，会返回该方法的返回值。 |
| Symbol.split | 当该对象被`str.split(myObject)`方法调用时，会返回该方法的返回值。 |
| Symbol.iterator | 对象进行`for…of`循环时，会调用`Symbol.iterator`方法，返回该对象的默认遍历器 |
| Symbol.toPrimitive | 该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。 |
| Symbol. toStringTag | 在该对象上面调用`toString`方法时，返回该方法的返回值。 |
| Symbol. unscopables | 该对象指定了使用`with`关键字时，哪些属性会被 with环境排除。 |

<span style="color:red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未完，请前往下一页。</span>  
