## Element类型

`Element` 表示 `XML` 或 `HTML` 元素，对外暴露出访问 **元素标签名**、**子节点** 和 **属性** 的能力。

Element 类型的节点具有以下特征:

-  nodeType 等于 1;
-  nodeName 值为 元素的标签名;
-  nodeValue 值为 null;
-  parentNode 值为 Document 或 Element 对象;
-  子节点可以是 Element、Text、Comment、ProcessingInstruction、CDATASection、EntityReference 类型。
-  通过 nodeName 或 tagName 属性来获取元素的标签名

  ```html
  <div id="myDiv"></div>
  ```
  
  ```js
  let div = document.getElementById("myDiv");
  console.log(div.tagName);                    // "DIV".  HTML 文档中 tagName 返回大写形式的标签名
  console.log(div.tagName == div.nodeName);    // true
  ```
  
  ```js
  // 一种推荐的写法，适用于所有文档 
  if (element.tagName.toLowerCase() == "div"){ 
    // 做点什么
  }
  ```
  
 
### HTML 元素

所有 `HTML` 元素都通过 `HTMLElement` 类型表示，所有 `HTML` 元素都是 `HTMLElement` 或其子类型的实例，`HTMLElement` 直接继承 `Element` 并增加了一些属性，以下属性是所有 `HTML` 元素上都有 的标准属性:

- id，元素在文档中的唯一标识符;
- title，包含元素的额外信息，通常以提示条形式展示;
- lang，元素内容的语言代码(很少用);
- dir，语言的书写方向("ltr"表示从左到右，"rtl"表示从右到左，同样很少用);
- className，相当于 class 属性，用于指定元素的 CSS 类(因为 class 是 ECMAScript 关键字，所以不能直接用这个名字)。

```html
<div id="myDiv" class="bd" title="Body text" lang="en" dir="ltr"></div>
```

获取对应的属性值

```js
let div = document.getElementById("myDiv"); 
console.log(div.id);                     // "myDiv"
console.log(div.className);              // "bd"
console.log(div.title);                  // "Body text"
console.log(div.lang);                   // "en"
console.log(div.dir);                    // "ltr"
```

修改元素的属性:

```js
div.id = "someOtherId";
div.className = "ft";
div.title = "Some other text";
div.lang = "fr";
div.dir ="rtl";
```

### getAttribute()、setAttribute()和 removeAttribute()

每个元素都有零个或多个属性，通常用于为元素或其内容附加更多信息，与属性相关的 DOM 方法 主要有 3 个: getAttribute()、setAttribute()和 removeAttribute()

#### 取得属性

传给 getAttribute()的属性名与它们实际的属性名是一样的，如果给定的属性不存在，则 getAttribute() 返回 `null`。（属性名不区分大小写，因此 "ID" 和 "id" 被认为是同一个属性）

```js
let div = document.getElementById("myDiv");
console.log(div.getAttribute("id"));     // "myDiv"
console.log(div.getAttribute("class"));  // "bd"          传"class"而非"className"
console.log(div.getAttribute("title"));  // "Body text"
console.log(div.getAttribute("lang"));   // "en"
console.log(div.getAttribute("dir"));    // "ltr"
```

getAttribute()方法也能取得不是 HTML 语言正式属性的 **自定义属性的值**，根据 HTML5 规范，自定义属性名应该前缀 **data-** 以方便验证

```html
<div id="myDiv" my_special_attribute="hello!"></div>
```

```js
let value = div.getAttribute("my_special_attribute");
```


**一个区别：**

元素的所有属性也可以通过相应 DOM 元素对象的属性来取得。这包括 HTMLElement 上定义的直接映射对应属性的 5 个属性，还有所有公认(非自定义)的属性也会被添加为 DOM 对象的属性。但像 my_special_attribute 这种自定义属性，是不会成为 DOM 对象的属性。

```js
<div id="myDiv" align="left" my_special_attribute="hello"></div>
```

通过 DOM 对象访问的属性中有两个返回的值跟使用 getAttribute() 取得的值不一样:

- style 属性

  - 在使用 getAttribute()访问 style 属性时，返回的是 CSS 字符串 
  
  - 通过 DOM 对象的属性访问时，style 属性返回的是一个(CSSStyleDeclaration) 对象

- 事件处理程序(或者事件属性)，比如 onclick

  - 使用 getAttribute()访问事件属性，则返回的是字符串形式的源代码

  - 通过 DOM 对象的属性访问事件属性时返回的则是一个 JavaScript 函数(未指定该属性则返回 null)

因此在进行 DOM 编程时通常会放弃使用 getAttribute() 而只使用 **对象属性**。 getAttribute( )主要用于取得 **自定义属性的值**。


#### 设置属性

setAttribute() 方法接收两个参数: 要设置的属性名和属性的值。如果属性已经存在，则 setAttribute() 会以指定的值替换原来的值; 如果属性不存在，则 setAttribute() 会以指定的值创建该属性。setAttribute() 适用于 HTML 属性，也适用于自定义属性。使用 setAttribute() 方法设置的属性名会规范为小写形式，因此 "ID" 会变成 "id"。

```js
div.setAttribute("id", "someOtherId");
div.setAttribute("class", "ft");
div.setAttribute("title", "Some other text");
div.setAttribute("lang","fr");
div.setAttribute("dir", "rtl");
```

**一个区别：**

通过 DOM 对象的 **属性赋值** 也可以设置元素属性的值

```js
div.id = "someOtherId";
div.align = "left";
```

但是：**在 DOM 对象上添加自定义属性，不会自动让它变成元素的属性**

```js
div.mycolor = "red";
console.log(div.getAttribute("mycolor")); // null(IE 除外)
```

#### 删除属性

removeAttribute() 方法用于从元素中删除属性。这样不单单是清除属性的值，而是会把整个属性完全从元素中去掉

```js
div.removeAttribute("class");
```


### 创建元素

document.createElement() 方法创建新元素，这个方法接收一个参数，即要创建元素的标签名。

```js
let div = document.createElement("div");
```

可以再为其添加属性、添加更多子元素:

```js
div.id = "myNewDiv";
div.className = "box";
```

在新元素上设置这些属性只会附加信息。因为这个元素还没有添加到文档树，所以不会影响浏览器显示。要把元素添加到文档树，可以使用 appendChild()、insertBefore() 或 replaceChild()。元素被添加到文档树之后，浏览器会立即将其渲染出来。之后再对这个元素所做的任何修改，都会立即在浏览器中反映出来。


### 元素后代

元素可以拥有任意多个子元素和后代元素，childNodes 属性包含元素所有的子节点，这些子节点可能是其他元素、文本节点、注释或处理指令。

Q: \<ul> 元素包含几个子元素

```html
<ul id="myList">
  <li>Item 1</li>
  <li>Item 2</li> 
  <li>Item 3</li>
</ul>
```

\<ul> 元素会包含 7 个子元素，其中 3 个是 \<li> 元素，还有 4 个 Text 节点(表示 \<li> 元素周围的空格)。如果把元素之间的空格删掉，变成下面这样，则所有浏览器都会返回同样数量的子节点:

```html
<ul id="myList"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>
```

此时，\<ul> 元素都会包含 3 个子节点。因此，通常在执行某个操作之前需要先检测一下节点的 nodeType

```js
// 只在 nodeType 等于 1(即 Element 节点)时执行某个操作
for (let i = 0, len = element.childNodes.length; i < len; ++i) {
  if (element.childNodes[i].nodeType == 1) {
    // 执行某个操作 
  }
}
```












