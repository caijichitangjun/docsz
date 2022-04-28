---
title: Symbol的内置值
description: '简介ES6的Symbol的内置值'
date: ''
sidebar: 'auto'
categories: 
 - js
tags: 
 - js
 - ES
 - symbol
prev: ./ES6
next: ./ES6
publish: true
---

## Symbol的内置值
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我看的教程里貌似不止11个，大家有兴趣的话，可以自己研究一下：[Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator)。

### Symbol.hasInstance
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当其他对象使用`instanceof`运算符，判断是否为该对象的实例时，会调用这个方法。  
```bash
eg:
  class Person {
    static[Symbol.hasInstance](params) {
      console.log(params)   // 参数
      console.log("有人用我来检测类型了")
      return true    // 可以自己控制 instanceof 检测的结果
    }
  }
  console.log(p1 instanceof Person); //true
  console.log(Person[Symbol.hasInstance](p1)); //true,instanceof和[Symbol.hasInstance]是等价的
```

### Symbol.isConcatSpreadable
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对象的`Symbol.isConcatSpreadable`属性等于的是一个布尔值，表示该对象用于`Array.prototype.concat()`时，是否可以展开。  
```bash
eg:
  let arr1 = [1, 2]
  let arr2 = [3, 4]
  arr2[Symbol.isConcatSpreadable] = false   // 控制arr2是否可以展开
  console.log(arr.concat(arr2)) //(3)[1, 2, Array(2)]
```

### Symbol.species
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建衍生对象时，会使用该属性。  
```bash
eg:
  class Array1 extends Array {
    static get [Symbol.species]() { 
      return Array;
    }
  }
  const a = new Array1(1, 2, 3);
  const mapped = a.map(x => x * x);
  // a算做是Array身上派生出来的。
  console.log(mapped instanceof Array1);  // false
  console.log(mapped instanceof Array);   // true
```

### Symbol.match
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;指定了匹配的是正则表达式而不是字符串。`String.prototype.match()`方法会调用此函数。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果你将`Symbol.match`置为 false，使用`match`属性的表达式检查会认为该项不是正则表达式对象。`startsWith`和`endsWith`方法将不会抛出`TypeError`。  
```bash
eg:
  const regexp1 = /foo/;
  regexp1[Symbol.match] = false;

  console.log('/foo/'.startsWith(regexp1));   // true
  console.log('/baz/'.endsWith(regexp1));     // false
```
+ startsWith: startsWith()方法用来判断当前字符串是否是以另外一个给定的子字符串“开头”的，根据判断结果返回 true 或 false。
+ endswith: endswith() 方法用于判断字符串是否以指定后缀结尾，如果以指定后缀结尾返回True，否则返回False。 

### Symbol.replace
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这个属性指定了当一个字符串替换所匹配字符串时所调用的方法。`String.prototype.replace()`方法会调用此方法。  
```bash
eg:
  class Replace1 {
    constructor(value) {
      this.value = value;
    }
    [Symbol.replace](string) {
      return `s/${string}/${this.value}/g`;
    }
  }

  console.log('foo'.replace(new Replace1('bar'))); // "s/foo/bar/g"
```

### Symbol.search
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Symbol.search` 指定了一个搜索方法，这个方法接受用户输入的正则表达式，返回该正则表达式在字符串中匹配到的下标，这个方法由以下的方法来调用:  
```bash
eg:
  class caseIn {
    constructor(value) {
      this.value = value.toLowerCase();
    }
    [Symbol.search](string) {
      return string.toLowerCase().indexOf(this.value);
    }
  }
  console.log('foobar'.search(new caseIn('BaR')));  // 3
```

### Symbol.split
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Symbol.split` 指向 一个正则表达式的索引处分割字符串的方法:   
```bash
eg:
  class Split1 {
    constructor(value) {
      this.value = value;
    }
    [Symbol.split](string) {
      const index = string.indexOf(this.value);
      return `${this.value}${string.substr(0, index)}/${string.substr(index + this.value.length)}`;
    }
  }
  console.log('foobar'.split(new Split1('foo')));   // "foo/bar"
```

### Symbol.iterator
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ES6 创造了一种新的遍历命令`for...of`循环，Iterator接口主要供`for...of`使用。对象进行`for…of`循环时，会调用`Symbol.iterator`方法，返回该对象的默认遍历器。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;原生具备iterator接口的数据(可用`for...of`遍历)，有以下几种。`Array`、`Arguments`、`Set`、`Map`、`String`、`TypedArray`、`NodeList`。
```bash
eg:
  let obj = {
    name:'zs',
    age: 18,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
  };
  for(let item of obj) {
    console.log(item);
  }
```
<span style="color:red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因为我们使用的是数组原型上的`Symbol.iterator`，所以对象必须是个伪数组才能遍历，要解决这个问题我们可以自定义一个迭代器。</span>  

### Symbol.toPrimitive
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值，该方法在转基本类型时调用优先级最高。
```bash
eg:
  let a = {
    valueOf() {
      return 0;
    },
    toString() {
      return '1';
    },
    [Symbol.toPrimitive](hint) {
      switch (hint) {
        case 'number': //此时需要转换成数值 例如:数学运算
          return 2;
        case 'string': // 此时需要转换成字符串 例如:字符串拼接
          return '3';
        case 'default': //此时可以转换成数值或字符串 例如：==比较
          return 4;
      }
    }
  }
  console.log(1 + a)   // 4
  console.log('1' + a)  // '13'
```

### Symbol.toStringTag
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在该对象上面调用`toString`方法时，返回该方法的返回值。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串。  
```bash
eg:
  console.log({[Symbol.toStringTag]: 'Foo'}.toString()) // "[object Foo]"

  class Collection {
    get [Symbol.toStringTag]() {
      return 'xxx';
    }
  }
  let x = new Collection();
  console.log(Object.prototype.toString.call(x)) // "[object xxx]"
```

### Symbol.unscopables
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该对象指定了使用`with`关键字时，哪些属性会被 with环境排除。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;with关键字的: with语句的作用是将代码的作用域设置到一个特定的作用域中，基本语法:`with(){}`  
```bash
eg:
  const object1 = {
    property1: 42,
    [Symbol.unscopables]: {
      property1: true
    };
  };
  with (object1) {  // with后接的内容都在object1作用域内
    console.log(property1); // expected output: Error: property1 is not defined
  }
```






