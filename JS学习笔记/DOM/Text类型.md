## Text类型

`Text` 节点由 `Text` 类型表示，包含按字面解释的 **纯文本**，也可能包含 **转义后的 `HTML` 字符**，但不含 `HTML` 代码。

`Text` 类型的节点具有以下特征:

- nodeType 等于 3;
- nodeName 值为 "#text";
- nodeValue 值为 节点中包含的文本;
- parentNode 值为 Element 对象;
- 不支持子节点。

`Text` 节点中包含的文本可以通过 `nodeValue` / `data` 属性来访问，修改 `nodeValue` 或 `data` 的值，也会在另一个属性反映出来。

文本节点暴露出来的方法：

- appendData(text)，向节点末尾添加文本 text

- deleteData(offset, count)，从位置 offset 开始删除 count 个字符

- insertData(offset, text)，在位置 offset 插入 text

- replaceData(offset, count, text)，用 text 替换从位置 offset 到 offset + count 的文本

- splitText(offset)，在位置 offset 将当前文本节点拆分为两个文本节点

- substringData(offset, count)，提取从位置 offset 到 offset + count 的文本

- 通过 `length` 属性获取文本节点中包含的字符数量，这个值等于 `nodeValue.length` 和 `data.length`

默认情况下，包含文本内容的每个元素最多只能有一个文本节点。

  ```html
  <!-- 没有内容，因此没有文本节点 --> 
  <div></div>
  
  <!-- 有空格，因此有一个文本节点 -->
  <div> </div>
  
  <!-- 有内容，因此有一个文本节点 --> 
  <div>Hello World!</div>
  ```
  
取得文本节点的引用后，可以像这样来修改它:
  
  ```js
  div.firstChild.nodeValue = "Some other message";  
  ```
  
只要节点在当前的文档树中，这样的修改就会马上反映出来。但需注意，HTML 或 XML 代码(取决于文档类型)会被转换成实体编码，**即小于号、大于号或引号会被转义**

  ```js
  // 输出为"Some &lt;strong&gt;other&lt;/strong&gt; message" 
  div.firstChild.nodeValue = "Some <strong>other</strong> message";
  ```
  
### 创建文本节点

document.createTextNode() 可以用来创建新文本节点，它接收一个参数，即要插入节点的文本，这些要插入的文本也会应用 HTML 或 XML 编码，创建新文本节点后，其 `ownerDocument` 属性会被设置为 `document`

  ```js
  let textNode = document.createTextNode("<strong>Hello</strong> world!");
  ```

一般来说一个元素只包含一个文本子节点。不过，也可以让元素包含多个文本子节点:

  ```js
  let element = document.createElement("div");
  element.className = "message";
  
  let textNode = document.createTextNode("Hello world!");
  element.appendChild(textNode);
  
  let anotherTextNode = document.createTextNode("Yippee!");
  element.appendChild(anotherTextNode);
  
  document.body.appendChild(element);
  ```

将一个文本节点作为另一个文本节点的同胞插入后，两个文本节点的文本之间不会包含空格。


### 规范化文本节点

因为一个文本节点足以表示一个文本字符串，所以没必要有同胞文本节点，浏览器在解析文档时，永远不会创建同胞文本节点。同胞文本节点只会出现在 `DOM` 脚本生成的文档树中。

normalize() 方法用来合并相邻的文本节点，这个方法是在 `Node` 类型中定义的(因此所有类型的节点上都有这个方法)。

在包含两个或多个相邻文本节点的父节点上调用 normalize() 时，所有同胞文本节点会被 **合并为一个文本节点**，这个文本节点的 `nodeValue` 就等于之前所有同胞节点 `nodeValue` 拼接在一起得到的字符串。

```js
let element = document.createElement("div");
element.className = "message";

let textNode = document.createTextNode("Hello world!");
element.appendChild(textNode);

let anotherTextNode = document.createTextNode("Yippee!");
element.appendChild(anotherTextNode);

document.body.appendChild(element);

console.log(element.childNodes.length);          // 2
element.normalize();
console.log(element.childNodes.length);          // 1 
console.log(element.firstChild.nodeValue);       // "Hello world!Yippee!"
```


### 拆分文本节点

`Text` 类型定义了一个与 normalize() 相反的方法—— splitText()，这个方法可以在指定的偏移位置拆分 `nodeValue`，将一个文本节点拆分成两个文本节点。

- 原来的文本节点包含开头到偏移位置前的文本，新文本节点包含剩下的文本
- 方法返回新的文本节点
- 新文本具有与原来的文本节点相同的 `parentNode`

```js
let element = document.createElement("div");
element.className = "message";

let textNode = document.createTextNode("Hello world!");
element.appendChild(textNode);

document.body.appendChild(element);

let newNode = element.firstChild.splitText(5);
console.log(element.firstChild.nodeValue);       // "Hello"
console.log(newNode.nodeValue);                  // " world!"
console.log(element.childNodes.length);                // 2
```















  
  
  
  
