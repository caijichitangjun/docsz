---
title: TypeScript-类与方法的延伸
description: '简介TypeScript的类、继承、接口、泛型'
date: '2022-4-27'
sidebar: 'auto'
categories: 
 - JavaScript
tags: 
 - JavaScript
 - TypeScript
prev: ./studyTS
next: false
publish: true
---

## 类class
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;什么是类？简单来说就是一些具有相同特征(属性)的对象的集合体。以`class`为关键字定义，类内部内容和js代码相似，可以以`new`关键字创建一个集合体`class`的实例，每一个实例间互不相同。  
```typeScript
eg:
  class peoper{   // 定义一个类
    name:string = 'zs';      // 定义变量
    getname(){                      // 定义方法
      console.log(name)  
    }
  }

  let per1 = new peoper();           // 创建class实例
  let per2 = new peoper(); 

  per1.name = 'ls';
  console.log(per2.name)             // 'zs' ,实例间互不影响
```

### 构造函数
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在每一次创建class实例时，都会先调用构造函数，其作用是为类对象赋初始值。  
```typeScript
eg:
  class Dog {
    name: string;
    age: number;
    constructor(name: string, age: number) {   // 构造函数，可接受参数，同时形参也可赋初始值
      this.name = name;
      this.age = age;
    }
  }
  const dog1 = new Dog("zs", 18);
```

### 继承extends
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在js以及ts中，我们往往会发现，有很多的类的有很多相同的属性，这时我们可以将这些公共属性抽离出来形成一个单独的类，当有其它的类需要这些属性时，创建一种连接使它们相联即可，我们称这种相连为继承(extends)。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在js以及ts中，继承者（子类）拥有被继承者（父类）的一切，每一次的继承都是对父类全新复制，因此两个继承相同父类的元素间互不干扰。  
```typeScript
class animal {
  name: string;   // 这些是公共属性
  age: number;  
  constructor(name: string, age: number) {   // 构造函数，可接受参数，同时形参也可赋初始值
    this.name = name;
    this.age = age;
  }
  getName(){
    console.log(this.name)
  }
}

class dog extends animal{
  weight:number;   // 体重
  constructor(name: string, age: number, weight:number){
    super(name, age);
    this.weight = weight;
  }
}
let dog1 = new dog('gg', 5, 20)
dog1.getName()   // 因为dog继承animal，所以dog身上也有getName方法

class cat extends animal{
  character:string;   // 性格
  constructor(name: string, age: number, character:string){
    super(name, age);
    this.character = character;
  }
}
```

### super
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`super`关键字一般出现在继承中，代表着子类的'父亲'，可以在子类中使用`super`关键字去调用父类中的方法函数等。
```typeScript
class animal {
  name: string;   
  age: number;  
  constructor(name: string, age: number) {   
    this.name = name;
    this.age = age;
  }
  getName(){
    console.log(this.name)
  }
}

class dog extends animal{
  weight:number;   // 体重
  constructor(name: string, age: number, weight:number){
    super(name, age);
    this.weight = weight;
  }
  getDogName(){
    super.getName()   // 调用父类的getName方法
  }
  getName(){   // 当子类中出现与父类相同的方法名，意为方法重写
    // 重写方法后
    // 使用super.getName()访问到的仍是父类的getName方法
    // dog类的实例化对象dog1使用dog1.getName() 访问到的就是子类重写的getName方法。
    console.log('dog:'+ this.name)
  }
}
let dog1 = new dog('gg', 5, 20)
dog1.getName() 
```

### 抽象类和抽象方法
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在ts中有一种特殊的类——抽象类，他们不能被实例化对象，只能被其他的类继承，在抽象类内部可以定义属性和方法，同时还可以定义一种特殊的方法——抽象方法，抽象方法只有函数定义而没有函数体，因此每个继承它的子类都需要对该方法重写。  
```typeScript
abstract class animal {   // 定义抽象类，使用abstract关键字
  name: string;   
  age: number;  
  constructor(name: string, age: number) {   
    this.name = name;
    this.age = age;
  }
  getName(){     // 抽象类内也可以定义一般方法
    console.log(this.name)
  }
  abstract sayHello()   // 抽象方法，没有方法体，只有定义
}
let ani = new animal('gg', 5);   // 会报错

class dog extends animal{
  constructor(name: string, age: number){
    super(name, age);
  }
  sayHello(){   // 必须对抽象方法重写
    console.log('汪汪')
  }
}
```

### 接口
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;接口在一定程度上和抽象类很相似，比较如下：  
| | 属性 | 方法 | 调用 |
| ---- | ---- | ---- | ---- |
| 抽象类 | 可以定义类型，也可以赋值 | 可以定义一般方法，也可以定义抽象方法 | 使用`extends`关键字 | 
| 接口 | 只能定义类型，不能赋值 | 只能定义抽象方法 | 使用`implements`关键字 |
```typeScript
type animal = {   // 只包含属性规范的接口也可以作为类型规范书写
  name: string;
};

let ani: animal {
  name: 'zs';      // 要求对象内必须有接口中定义规范的属性
  age: 18
}

type animal = {    // 可以重复声明，以后者为准
  name: string;
  age: number;
  sayHello(): void;
};

class dog implements animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHello(): void {
    console.log("大家好");
  }
}
```

### public protected private
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ts不仅仅对类本身和方法做了扩展，对属性也有扩展——为属性添加了三种状态(public、protected、private)，具体如下所示。
```typeScript
class animal {
  public name: string;     // 共有
  private age: number;     // 私有
  protected weight:number;   // 受保护的
  constructor(name: string, age: number, weight: number) {   
    this.name = name;
    this.age = age;
    this.weight = weight;
  }
}

class dog extends animal{
  constructor(name: string, age: number, weight:number){
    super(name, age);
  }
  test(){      // 方法貌似现在还不能定义为私有或受保护对象
    console.log(this.name);
    console.log(this.age);   // 在继承中，子类见不到父类的私有成员，因此此举会报错
    console.log(this.weight);
  }
}

let dog1 = new dog('zs', 5, 18);
console.log(this.name);
console.log(this.age);   // 子类的实例对象看不见子类继承于父类的私有属性，此句报错
console.log(this.weight);   // 子类的实例对象看不见子类继承于父类的受保护属性，此句报错
```

### get和set方法
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正是由于protected和private的种种限制，导致我们在某些情况对某些属性的修改会十分困难，ts针对此种情况为我们设计了get和set方法用于修改和获取protected和private属性。  
```typeScript
class animal {
  public name: string;     // 共有
  private age: number;     // 私有
  protected weight:number;   // 受保护的
  constructor(name: string, age: number, weight: number) {   
    this.name = name;
    this.age = age;
    this.weight = weight;
  }

  get getAge(): string {   
    // 子类和子类的实例对象仍然可以看到父类的方法，因此可以使用这种方式获取到父类的私有属性
    return this.age;
  }
  set setAge(value: number): void{
    this.age = value;  // 原理同get
  }
}
```

### 泛型
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当我们在定义函数或类时，对于某些参数、返回等不确定是什么类型，需要由使用者确定时，就需要用到泛型。  
```typeScript
function fn<T>(a: T): T {   // 相当于使用一个符号占位，等使用者来确定类型
  return a;
}
let result = fn(2);   // 因为ts可以自动识别一些类型，所以这种也可以。
let result2 = fn<string>("hello");  // 手动指定方式

class MyClass<T> {
  name: T;
  constructor(name: T) {
    this.name = name;
  }
}
const mc = new MyClass<string>("孙悟空");
```





