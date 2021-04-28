## HTML5 扩展

`HTML5` 代表着与以前的 `HTML` 截然不同的方向。 `HTML` 就是一个纯标记语言，从未出现过描述 `JavaScript` 接口的情形，`JavaScript` 绑定的事，一概交给 `DOM` 规范去定义。然而，`HTML5` 规范却包含了与标记相关的大量 `JavaScript API` 定义。


### CSS 类扩展

`HTML5` 增加了一些特性以方便使用 `CSS` 类。

#### 1. getElementsByClassName()

该方法暴露在 `document` 对象和所有 `HTML` 元素上。`getElementsByClassName()` 方法接收一个参数，即 **包含一个或多个类名的字符串**，返回类名中包含相应类的元素的 **`NodeList`**。如果提供了多个类名，则顺序无关紧要。

```js
// 取得所有类名中包含"username"和"current"元素
// 这两个类名的顺序无关紧要
let allCurrentUsernames = document.getElementsByClassName("username current");

// 取得 ID 为"myDiv"的元素子树中所有包含"selected"类的元素
let selected = document.getElementById("myDiv").getElementsByClassName("selected");
```

#### 2. classList 属性

原先要操作类名，可以通过 `className` 属性实现添加、删除和替换。但 `className` 是一个 **字符串**， 所以每次操作之后都需要重新设置这个值才能生效，即使只改动了部分字符串也一样。

```html
<div class="bd user disabled">...</div>
```

```js
// 要删除"user"类
let targetClass = "user";
// 把类名拆成数组
let classNames = div.className.split(/\s+/);
// 找到要删除类名的索引
let idx = classNames.indexOf(targetClass);
// 如果有则删除 
if (idx > -1) {
  classNames.splice(i,1);
}
// 重新设置类名
div.className = classNames.join(" ");
```

`HTML5` 通过给所有元素增加 `classList` 属性为这些操作提供了更简单也更安全的实现方式。 `classList` 是一个新的集合类型 `DOMTokenList` 的实例。与其他 `DOM` 集合类型一样，`DOMTokenList`
也有 `length` 属性表示自己包含多少项，也可以通过 `item()` 或 中括号 取得个别的元素。

- add(value)，向类名列表中添加指定的字符串值 `value`。如果这个值已经存在，则什么也不做。 

- contains(value)，返回布尔值，表示给定的 `value` 是否存在。

- remove(value)，从类名列表中删除指定的字符串值 `value`。

- toggle(value)，如果类名列表中已经存在指定的 `value`，则删除; 如果不存在，则添加。

上面的例子可以简化为：

```js
div.classList.remove("user");
```

其他方法：

```js
// 添加"current"类 
div.classList.add("current");

// 切换"user"类
div.classList.toggle("user");

// 检测类名
if (div.classList.contains("bd") && !div.classList.contains("disabled")){
  // 执行操作 
}

// 迭代类名
for (let class of div.classList){
  doStuff(class);
}
```


### 焦点管理

`HTML5` 增加了辅助 `DOM` 焦点管理的功能。 

- `document.activeElement` 始终包含当前拥有焦点的 `DOM` 元素。页面加载时，可以通过用户输入(按 Tab 键或代码中使用 `focus()` 方法)让某个元素自动获得焦点。默认情况下，`document.activeElement` 在页面刚加载完之后会设置为 `document.body`。而在页面完全加载之前，`document.activeElement` 的值为 `null`。

  ```js
  let button = document.getElementById("myButton");
  button.focus();
  console.log(document.activeElement === button);       // true
  ```

- `document.hasFocus()` 方法，该方法返回布尔值，表示文档是否拥有焦点

  ```js
  let button = document.getElementById("myButton");
  button.focus();
  console.log(document.hasFocus());                // true
  ```

`document.activeElement` 可以用来查询文档，确定哪个元素拥有焦点，`document.hasFocus()` 可以查询文档是否获得了焦点。


### HTMLDocument 扩展

#### 1. readyState 属性

`document.readyState` 属性用于表示文档是否加载完成。在这个属性得到广泛支持以前，通常要依赖 `onload` 事件处理程序设置一个标记，表示文档加载完了。 `document.readyState` 属性有两个可能的值: 

- loading，表示文档正在加载;

- complete，表示文档加载完成。

```js
if (document.readyState == "complete"){ 
  // 执行操作
}
```

#### 2. head 属性

作为对 `document.body`(指向文档的 \<body> 元素)的补充，`HTML5` 增加了 `document.head` 属性，指向文档的 \<head> 元素。


### 自定义数据属性

`HTML5` 允许给元素指定非标准的属性，但要使用前缀 `data-` 以便告诉浏览器，这些属性既不包含与渲染有关的信息，也不包含元素的语义信息。定义了自定义数据属性后，可以通过元素的 `dataset` 属性来访问。 `dataset` 属性是一个 `DOMStringMap` 的实例，包含一组 **键/值对** 映射。元素的每个 `data-name` 属性在 `dataset` 中都可以通过 `data-` 后面的字符串作为键来访问(例如，属性 data-myname、data-myName 可以通过 myname 访问，但要注意 data-my-name、data-My-Name 要通过 myName 来访问)。

  ```html
  <div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>
  ```

  ```js
  let div = document.getElementById("myDiv");
  
  // 取得自定义数据属性的值
  let appId = div.dataset.appId; let myName = div.dataset.myname;
  
  // 设置自定义数据属性的值 
  div.dataset.appId = 23456; div.dataset.myname = "Michael";
  
  // 有"myname"吗?
  if (div.dataset.myname){
    console.log(`Hello, ${div.dataset.myname}`);
  }
  ```
  

### 插入标记

向文档中一次性插入大量 `HTML` 时还是比较麻烦。 相比先创建一堆节点，再把它们以正确的顺序连接起来，直接插入一个 `HTML` 字符串要简单(快速) 得多。

#### innerHTML 属性

- 在读取 `innerHTML` 属性时，会返回元素所有后代的 `HTML` 字符串，包括元素、注释和文本节点。 

- 在写入 `innerHTML` 属性时，则会根据提供的字符串值以新的 `DOM` 子树替代元素中原来包含的所有节点。

```html
<div id="content">
<p>This is a <strong>paragraph</strong> with a list following it.</p> 
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul> 
</div>
```

对于这里的 \<div>元素而言，其 `innerHTML` 属性会返回以下 **字符串** :

```
<p>This is a <strong>paragraph</strong> with a list following it.</p> <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
</ul>
```

在写入模式下，赋给 `innerHTML` 属性的值会被解析为 `DOM` 子树，并替代元素之前的所有节点。 因为所赋的值默认为 `HTML`，所以其中的所有标签都会以浏览器处理 `HTML` 的方式转换为元素。同样转换结果也会因浏览器不同而不同。如果赋值中不包含任何 `HTML` 标签，则直接生成一个文本节点。

#### outerHTML 属性

- 读取 outerHTML 属性时，会返回调用它的元素(及所有后代元素)的 HTML 字符串。

- 写入 outerHTML 属性时，调用它的元素会被传入的 HTML 字符串经解释之后生成的 DOM 子树取代。

```html
<div id="content">
<p>This is a <strong>paragraph</strong> with a list following it.</p> 
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul> 
</div>
```

在这个 \<div> 元素上调用 `outerHTML` 会返回相同的字符串，包括 \<div> 本身。

如果使用 `outerHTML` 设置 `HTML`，比如: 

```js
div.outerHTML = "<p>This is a paragraph.</p>";
```

则会得到与执行以下脚本相同的结果:

```js
let p = document.createElement("p"); 
p.appendChild(document.createTextNode("This is a paragraph.")); 
div.parentNode.replaceChild(p, div);
```

新的 \<p> 元素会取代 `DOM` 树中原来的 \<div> 元素。


### scrollIntoView()

`DOM` 规范中没有涉及的一个问题是如何滚动页面中的某个区域。不同浏览器实现了不同的控制滚动的方式，`HTML5` 选择了标准化 `scrollIntoView()`。

`scrollIntoView()` 方法存在于所有 `HTML` 元素上，可以滚动浏览器窗口或容器元素以便包含元素进入视口。

- alignToTop 是一个布尔值
  
  - true: 窗口滚动后元素的顶部与视口顶部对齐。 
  
  - false: 窗口滚动后元素的底部与视口底部对齐。

- scrollIntoViewOptions 是一个选项对象

  - behavior: 定义过渡动画，可取的值为"smooth"和"auto"，默认为"auto"。
  
  - block: 定义垂直方向的对齐，可取的值为"start"、"center"、"end"和"nearest"，默认为 "start"。
  
  - inline: 定义水平方向的对齐，可取的值为"start"、"center"、"end"和"nearest"，默认为 "nearest" 

- 不传参数等同于 alignToTop 为 true












