### Javascript异步编程先后经历了四个阶段

分别是 ```Callback``` 阶段，```Promise``` 阶段，```Generator``` 阶段和 ```Async/Await``` 阶段。

Callback 很快就被发现存在回调地狱和控制权问题，Promise 就是在这个时间出现，用以解决这些问题，Promise 并非一个新事务，而是按照一个规范实现的类，这个规范有很多，如 Promise/A，Promise/B，Promise/D 以及 Promise/A 的升级版 Promise/A+，最终 ES6 中采用了 Promise/A+ 规范。

后来出现的 ```Generator``` 函数以及 ```Async``` 函数也是以 ```Promise``` 为基础的进一步封装。

PS: 可能没有什么系统性，学完会做一个梳理。
