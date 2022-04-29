---
title: html5表单验证
description: '在进行项目讲解前的vue基础讲解'
date: ''
sidebar: 'auto'
categories: 
 - html
tags: 
 - html
 - js
prev: ./template
next: ./vuedata
publish: true
---

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这是本文的[参考视频](https://www.bilibili.com/video/BV16K4y1Z7Gb?p=15)，你可以直接观看视频或者阅读本篇内容。

### html设置

1. 提示语言 placeholder  
  移动端不支持:\<input placeholder="这里是提示语言，当输入内容时消失" type="text" id="date" />         

2. html5表单中新增类型  
  email、url、number、range、date(date, month, week, time, datetime,datetime-local)、search、color、tel等

3. 自动提示属性autocomplete 
  autocomplete既可以加在form表单整体上，也可以加在单个表单元素上。
```html
  <form action="" autocomplete="on">
    <input type="text" name="" id="">
    <input type="text" name="" id="" autocomplete="off">
  </form>
```
4. 提示选择 list和datalist  
  list和datalist为选择框内容，内部为value和label的对象组合
```javaScript
list:[
  {
    value:'beijing',  // 用于存储数据
    label:'北京',     // 用于页面显示
  },
  ...
]
```

5. 自动获得焦点 autofocus  
  `<input type="text" name="fname" autofocus="autofocus" />`

6. 必填项 required   
  `<input type="text" name="usr_name" required="required"`
 
7. 表单验证正则 pattern  
  本处的验证为只包含三个字母的文本字段
  `<input type="text" name="country_code" pattern="[A-z]{3}"/>`

8. 必填选项绕过验证 novalidate或者formnovalidate  
  `<input type="submit" value="Submit" />`
  `<input type="submit" formnovalidate="formnovalidate" value="Submit" />`

9. label中for属性：使得label与后文input绑定，点击label相当于点击input
```html
  <label for="man"></label>
  <input type="text" name="" id="man">
```

10. 约束验证API
+ validaty属性值： `document.getElementById("username").validaty`
+ badInput: false   // 代表一个不能转换的input 
+ customError: false   // 对应setCustomValidity()方法
+ patternMismatch: false  // 代表pattern，正则检验
+ range0verflow: false   // 代表最大值
+ rangeUnderflow: false  // 代表最小值
+ stepMismatch: false  // 代表step
+ tooLong: false  // 代表最大长度，恒等于false，即使设置了最大长度
+ tooShort: false  // 代表最小长度，恒等于false，即使设置了最小长度
+ typeMismatch: false  // 代表不符合某种类型
+ valid: false   // 当其他值为false时，会变为true，代表没有检测
+ valueMissing: true // 代表required
  （1）willValidate: 指定 input 是否需要验证
  （2）validaty : 属性值如上所示
  （3）ValidationMessage : 用于描述与元素相关约束的失败信息。
  （4）checkValidaty() 方法 : 如果元素没有满足它的任意约束，则返回false，否则返回true
  （5）setCustomValidity()方法 : 当某项验证不满足时，设置提示信息。

### css设置
11. 常用伪类
  （1）:required和:optional   （:required指选择器在表单元素是必填项时设置指定样式，后者指任意没有required属性）
  （2）:in-range和:out-of-range  （in-range对元素绑定的值在指定范围限制内时具有范围限制的元素进行样式设置。，）
  （3）:valid和:invalid   （valid有效，即当填写的内容符合要求的时候触发）
  （4）:read-only和:read-write  （:read-write当一个元素是可编辑元素时，可以修改其样式，read-write只针对当一个可编辑元素被赋予readonly（只读）属性时，可以修改其样式）

12. 常用属性使用
  text-indent 属性规定文本块中首行文本的缩进
  line-height 属性设置行间的距离
  transition 属性是一个简写属性，用于设置四个过渡属性
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;transition-property   规定设置过渡效果的 CSS 属性的名称。书写在div:hover内
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;transition-duration    规定完成过渡效果需要多少秒或毫秒。
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;transition-timing-function   规定速度效果的速度曲线。
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;transition-delay 定义过渡效果何时开始。

13. 常用事件应用
  oninput   事件在用户输入时触发
  oninvalid  输入无效时触发
  onchange   在表单元素的内容改变时触发

