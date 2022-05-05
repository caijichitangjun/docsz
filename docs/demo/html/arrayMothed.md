---
title: 数组的常见方法
description: '数组的常见方法'
date: ''
sidebar: 'auto'
categories: 
 - JavaScript
tags: 
 - JavaScript
prev: false
next: false
publish: true
---

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数组一种十分常见的变量，能够一次存放一个以上的值，我们通过引用索引号（下标号）来引用某个数组元素，为了使用方便，也有大量的方法为其服务。

### 数组
+ 创建一个数组:
  `var test = ["1", 2, 3];`
  或`var test = new Array("1", 2, 3);`  // 不推荐
+ 访问数组内容
  `test[0] ==> "1"`
+ 数组长度-length属性
  `test.length`

### 数组方法
- toString(): 数组转换为数组值字符串(以逗号为分隔)
  `test.toString()`
- join(): 数组转换为数组值字符串(以任意字符为分隔)
  `test.join(',')`
- pop(): 从数组中删除最后一个元素
  `var retur = test.pop()`  [可以接到删除的值]
- push(): 向数组尾部添加一个新的元素
  `var lengt = test.push('4')`  [返回值为数组长度]
- shift(): 从数组中删除第一个元素，其他元素依次回落
  `test.shift()`
- unshift(): 从数组中开头添加一个元素，其他元素依次后移
  `test.unshift(0)`
- delete: 删除数组中的某个元素。
  `delete test[2]`
- splice(): 方法可用于向数组添加和删除元素。
  `test.splice( 2, 1, '5', '6' )`
  + 第一个`1`代表插入元素的位置
  + 第二个`1`代表在插入位置的地方需要删除元素的个数
  + `'5', '6'`代表新增元素
- concat(): 合并两个数组
  ```js
    var test = ["1", 2, 3];
    var test1 = [4, 5, 6];
    var test2 = test.concat(test1);
  ```
  + concat()方法不会更改现有数组，而是返回一个新数组
  + concat()方法可以使用任意数量的数组参数
- slice(): 用于创建新数组。
  ```js
  var test = ["1", 2, 3];
  var test1 = test.slice(1, 2);
  ```
  + slice()同样不会破坏原数组，会产生一个新数组
  + slice()可以接受两个参数，一个是slice的切割起点，一个是切割重点（不携带第二个参数意为以原数组终点为结束）
- sort(): 数组排序
  ```js
    var test = [1, 3, 2];
    test.sort(); // 默认升序排列
    // sort也可以接受一个函数
    test.sort(function(a,b){
      return a-b; // 升序
      // return b-a  // 降序
    })
  ```
- reverse(): 反转数组中的元素。   
  ```js
    var test = [1, 3, 2];
    test.reverse();    // [2, 3, 1]
  ```




&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未完待续...












