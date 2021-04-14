### typeof 知多少

对一个值使用 typeof 操作符会返回以下 **字符串** 之一：

- "undefined"
- "boolean"
- "string"
- "number"
- "symbol"
- "bigint"
- "object"
- "function"

```
typeof null        // "object"
```

这是因为特殊值 null 被认为是一个空对象的引用

下面代码会是怎样的结果？

```
console.log(a);
console.log(typeof(a));
console.log(typeof(typeof(a)));
console.log(typeof(typeof(123)))
```

**答案：**

```
1. 报错
2. undefined
3. string
4. string
```

**解析：**

1. a 没有声明就使用，当然会报错
2. 不论是对声明还是未声明的变量使用 typeof，返回的都是字符串 "undefined"  （红宝书上有写）
3/4. typeof 返回的是字符串，再调用一次当然是 "string" 啦～

对引用类型使用 typeof ，除了函数返回 "function", 其余都返回 "object"，所以不能用 typeof 来判断数组





目前想到这么多，之后有什么再补充吧 :sparkles::sparkles::sparkles:

