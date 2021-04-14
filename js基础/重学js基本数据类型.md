## 数据类型

第 4 版红宝书中写 -- JS 中有七种数据类型，包括六种原始类型和一种复杂数据类型 [对象（Object]。

六种原始类型分别为: ```Undefined```, ```Null```, ```Boolean```, ```String```, ```Number```, ```Symbol```。

在 ECMAScript 标准里，六种原始类型被定义为 **Primitive values** ，即原始值，表示值本身是不能被改变的（也叫“值类型”）。

但现在新增了第 7 种基本数据类型，```BigInt``` 用于表示大数。

### Undefined 类型

```Undefined``` 类型只有一个值，即 ```undefined``` ，表示未定义。

- 当使用 var 或 let 声明了变量但没有初始化时，就相当于给变量赋值为 undefined。

- 增加 undefined 的目的就是为了正式明确空对象指针（null）和未初始化变量的区别。

- 无论是对未初始化的变量（声明了）调用 typeof 还是对未声明的变量调用 typeof，返回的结果都是 'undefined'

- undefined 是一个假值

以下几种情况均为 ```undefined``` :

- 变量被声明了，但未赋值

- 对象未被赋值的属性

- 函数中没有传递的参数值

- 函数无返回值时（无 return 语句或者 return 后无表达式）

- 使用 void 操作符（待理解）


### Null 类型

```Null``` 类型只有一个值，即 ```null``` ，表示 **空对象指针**, 这也是 typeof null 会返回 "object" 的原因

- undefined值 是由 null 值派生而来的，因此 ECMA-262 将他们定义为表面上相等：
  ```
  console.log(null == undefined)      // true
  ```
  用 等于操作符（==）比较 null 和 undefined 始终返回 true， **== 会进行类型转换**

- null 是一个假值


### Boolean 类型

```Boolean``` 类型有 true 和 false 两个字面值（区分大小写），表示逻辑上的真和假。

- 书上说 ```这两个布尔值不同于数值，因此 true 不等于 1，false 不等于 0```
  但是 
  ```
  true == 1       // true
  false == 0      // true
  ```
- 所有其他 ECMAScript 类型的值都有相应布尔值的等价类型。Boolean() 转型函数可以在任意类型的数据上使用，而且始终返回一个布尔值。
  
### Number



