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
  
- 除了以下类型转化为 false， 其余均转换为 true：

  - Boolean 类型中的 false   
  
  - Sting 类型中的 "" (空字符串)

  - Number 类型中的 0、NaN
  
  - Null 类型中的 null
  
  - Undefined 类型中的 undefined
  
### Number 类型

```Number``` 类型使用 IEEE754 格式表示整数和浮点值

#### 1. 浮点值

因为存储浮点值使用的内存空间是存储整数值的两倍，所以 ECMAScript 总是想方设法把值转换为整数。在小数点后面没有数字的情况下，或者数值本身就是整数，只是小数点后面跟着0（如1.0），那么数值就会变成整数。

**精度丢失问题**（0.1 + 0.2 = 0.30000000000000004）: JS 的 Number 类型采用的是 ```IEEE 754``` 64位双精度浮点数编码（符号占1位，指数占11位，尾数占52位），运算时会先将小数转为二进制，由于 0.1 与 0.2 转为二进制之后均为无限循环的数，并且二进制的双精度浮点小数最多保留 53 位有效数字（即17位小数），通过 “0舍1入” 后相加（此处产生了精度丢失），并将相加后的结果转为十进制，结果则为0.30000000000000004。

之所以存在这种舍入错误，是因为使用了 IEEE 754 数值，这种错误并非 ECMAScript 所独有。

#### 2. 值的范围

- ECMAScript 可以表示的最小数值保存在 Number.MIN_VALUE 中

- ECMAScript 可以表示的最大数值保存在 Number.MAX_VALUE 中

- 如果数值超过了 JS 可以表示的范围，就会被自动转换为一个特殊的 Infinity（无穷）值
  
  - 任何无法表示的正数以 Infinity（正无穷大）表示

  - 任何无法表示的负数以 -Infinity（负无穷大）表示

- 要确定一个值是不是有限大（介于 JS 能表示的最大值和最小值之间），可以使用 isFinite() 函数

```
let res = Number.MAX_VALUE + Number.MAX_VALUE;
console.log(isFinite(res))                       // false
```

#### 3. NaN

有一个特殊的数值是 NaN，意思是 “不是数值”（Not a Number），用于表示本来要返回数值的操作失败了（而不是抛出错误）

```
console.log(0/0);          // NaN
console.log(-0/+0);        // NaN
```
如果分子是非 0 值，分母是有符号 0 或者 无符号 0 ，则会返回 Infinite 或 -Infinite

```
console.log(5/0);          // Infinity
console.log(5/-0);         // -Infinity
```

NaN 有几个独特的性质：

- 任何涉及 NaN 的操作始终返回 NaN

- NaN 不等于包括 NaN 在内的任何值

ECMAScript 提供了 isNaN() 函数，该函数接收一个任意数据类型的参数，尝试把它转换为数值

```
console.log(isNaN(NaN));           // true
console.log(isNaN(10));            // false
console.log(isNaN('10'));          // false
console.log(isNaN('123abc'));      // true
console.log(isNaN(true));          // false
console.log(isNaN(null));          // false
console.log(isNaN(undefined));     // true
```

### String 类型

```String```（字符串） 类型表示由零个或多个16位 Unicode（即 UTF16）字符组成的字符序列。字符串可以使用 双引号(")、单引号(')、反引号(\`)

转义序列表示一个字符，所以只算一个字符，比如 \u03a3 是一个 6 个字符长的转义序列，但只算一个

占个坑（字符串中包含双字节字符）

字符串是不可变的（一旦创建，他们的值就不能变了）。要修改某个变量中的字符串值，必须先销毁原始的字符串，然后将包含新值的另一个字符串保存到该变量


### Symbol 类型

符号实例是唯一的、不可变的，符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险。

### Object 类型

```Object``` 即对象，是一组数据和功能的集合，属于引用类型。

ECMAScript 中的 object 也是派生其他对象的基类，Object 类型的所有属性和方法在派生类的对象上同样存在。

- constructor：用于创建当前对象的函数。

- hasOwnProperty（propertyName）：用于判断当前对象实例（不是原型）上是否存在给定的属性，要检查的属性名必须是字符串。

- isPrototypeof（object）：用于判断当前对象是否为另一个对象的原型。

- toLocaleString（）：返回对象的字符串表示，该字符串反映对象所在的本地化执行环境

- toString（）：返回对象的字符串表示

- valueOf（）：返回对象对应的字符串、数值或布尔值表示


