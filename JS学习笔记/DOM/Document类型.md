## Document类型

`Document` 类型是 `JavaScript` 中表示文档节点的类型。

在浏览器中，文档对象 `document` 是 `HTMLDocument` 的实例(HTMLDocument 继承 Document)，表示整个 `HTML` 页面。

`document` 是 `window` 对象的属性，因此是一个 **全局对象**。

`Document` 类型的节点有以下特征:

- nodeType 等于 9;
- nodeName 值为 "#document";
- nodeValue 值为 null;
- parentNode 值为 null;
- ownerDocument 值为 null;
- 子节点可以是 DocumentType(最多一个)、Element(最多一个)、Comment 或 ProcessingInstruction 类型。

### 文档字节点

 - `documentElement` 属性始终指向 `HTML` 页面中的 <html> 元素，虽然 `document.childNodes` 中始终有 <html> 元素，但使用 `documentElement` 属性可以更快更直接地访问该元素。

  ```js
  let html = document.documentElement;              // 取得对<html>的引用 
  console.log(html === document.childNodes[0]);     // true
  console.log(html === document.firstChild);        // true
  ```
  
- `document` 对象还有一个 `body` 属性，直接指向 <body> 元素

  ```js
  let body = document.body; // 取得对<body>的引用
  ```
  所有主流浏览器都支持 `document.documentElement` 和 `document.body`
  
- `Document` 类型另一种可能的子节点是 DocumentType，<!doctype> 标签是文档中独立的部分，其信息可以通过 `doctype` 属性(在浏览器中是 `document.doctype`)来访问。

  ```js
  let doctype = document.doctype; // 取得对<!doctype>的引用
  ```

- `Document` 类型另一种可能的子节点是 Comment 类型，出现在 <html> 元素外面的注释也是文档的子节点，但由于浏览器实现不同，这些注释不一定能被识别，或者表现可能不一致。

  ```html
  <!-- 第一条注释 --> 
  <html>
    <body>
    </body>
  </html>
  <!-- 第二条注释 -->
  ```

PS: appendChild()、removeChild()和 replaceChild()方法不会用在 `document` 对象上。这是因为文档类型(如果存在)是只读的，而且只能有一个 `Element` 类型的子节点(即 <html> )


### 文档信息

一些提供浏览器所加载网页的信息的属性

- title 属性：包含 <title> 元素中的文本，通常显示在浏览器窗口或标签页的标题栏
  
  - 通过这个属性可以读写页面的标题，**修改后的标题也会反映在浏览器标题栏上 **
  
  - 修改 title 属性并不会改变<title>元素

  ```js
  // 读取文档标题
  let originalTitle = document.title;
  // 修改文档标题
  document.title = "New page title";
  ```

- URL 属性：包含当前页面的完整 URL(地址栏中的 URL)

  ```js
  // 取得完整的URL
  let url = document.URL;
  ```

- domain 属性：包含页面的域名

  ```js
  // 取得域名
  let domain = document.domain;
  ```
  
  域名和 URL 是相关的，如果 document.URL 是 http://www.wrox.com/WileyCDA/，则 document.domain 就是 www.wrox.com。
  
  在 `URL`、`domain` 和 `referrer` 中，只有 `domain` 属性是可以设置的，但是出于安全考虑，给 `domain` 属性设置的值是有限制的，不能给这个属性设置 `URL` 中不包含的值:
  
  ```js
  // 页面来自p2p.wrox.com
  document.domain = "wrox.com"; // 成功
  document.domain = "nczonline.net"; // 出错!
  ```
  
  因为跨源通信存在安全隐患，所以不同子域的页面间无法通过 JavaScript 通信。此时，在每个页面上把 `document.domain` 设置为相同的值，这些页面就可以访问对方的 JavaScript 对象了。
  
  浏览器对 domain 属性还有一个限制，即这个属性一旦放松就不能再收紧。
  
  ```js
  // 页面来自p2p.wrox.com
  document.domain = "wrox.com"; // 放松，成功 
  document.domain = "p2p.wrox.com"; // 收紧，错误!
  ```

- referrer 属性：包含链接到当前页面的那个页面的 URL

  - 如果当前页面没有来源，则 referrer 属性包含空字符串 

  ```js
  // 取得来源
  let referrer = document.referrer;
  ```


### 定位信息

getElementById() 和 getElementsByTagName() 是 `Document` 类型提供的两个用于获取某个或某组元素的方法。

- getElementById()方法接收一个参数，即要获取元素的 ID，如果找到了则返回这个元素，如果没找到则返回 null

  - 参数 ID 必须跟元素在页面中的 id 属性值完全匹配，包括大小写 

- getElementsByTagName()方法接收一个参数，即要获取元素的标签名，返回包含零个或多个元素的 NodeList。

  - 在 HTML 文档中，这个方法返回一个 HTMLCollection 对象。


HTMLCollection 与 NodeList 很相似，都是 “实时” 列表。与 NodeList 对象一样，也可以使用 **中括号** 或 item()方法从 HTMLCollection 取得特定的元素。而取得元素的数量同样可以通过 `length` 属性得知：

```js
let images = document.getElementsByTagName("img");
console.log(images.length); // 图片数量 
console.log(images[0].src); // 第一张图片的 src 属性 
console.log(images.item(0).src); // 同上
```

HTMLCollection 对象还有一个额外的方法 **namedItem()** ，可通过标签的 `name` 属性取得某一项的引用

  ```html
  <img src="myimage.gif" name="myImage">
  ```
  
  ```js
  let myImage = images.namedItem("myImage");
  // 可以直接使用中括号来获取
  let myImage = images["myImage"];
  ```

对 `HTMLCollection` 对象而言，**中括号既可以接收数值索引，也可以接收字符串索引**。而在后台， 数值索引会调用 item()，字符串索引会调用 namedItem()

HTMLDocument 类型上定义的获取元素的第三个方法是 getElementsByName()，这个方法会返回具有给定 `name` 属性的所有元素。最常用于单选按钮，因为同一字段的单选按钮必须具有相同的 `name` 属性才能确保把正确的值发送给服务器。getElementsByName() 方法也返回 HTMLCollection。

### 特殊集合

`document` 对象上还暴露了几个特殊集合，这些集合也都是 `HTMLCollection` 的实例。

- document.anchors 包含文档中所有带 `name` 属性的 <a> 元素。

- document.forms 包含文档中所有 <form> 元素(与 document.getElementsByTagName("form") 返回的结果相同)。

- document.images 包含文档中所有 <img> 元素(与 document.getElementsByTagName("img") 返回的结果相同)。

- document.links 包含文档中所有带 `href` 属性的 <a> 元素。

这些特殊集合始终存在于 `HTMLDocument` 对象上，而且与所有 `HTMLCollection` 对象一样，其内容也会实时更新以符合当前文档的内容。


### 文档写入

document 对象可以向网页输出流中写入内容，对应 4 个方法:write()、writeln()、open()和 close()。

- open() 和 close()方法分别用于打开和关闭网页输出流。在调用 write() 和 writeln()时，这两个方法都不是必需的。

- write() 和 writeln()方法都接收一个字符串参数，可以将这个字符串写入网页中。用来在页面加载期间向页面中动态添加内容

- 如果是在页面加载完之后再调用 document.write()，则输出的内容会重写整个页面

  ```js
  window.onload = function(){
     document.write("Hello world!");
  };
  ```

- write() 和 writeln()方法经常用于动态包含外部资源，如 `JavaScript` 文件

  在包含 `JavaScript` 文件时，记住不能像下面的例子中这样直接包含字符串 "</script>"，因为这个字符串会被解释为脚本块的结尾，导致后面的代码不能执行

  ```js
  document.write("<script type=\"text/javascript\" src=\"file.js\">" + "</script>");
  ```

  "</script>" 会匹配最外层的 <script> 标签，导致页面中显示出 ");。为避免出现这个问题，需要对前面的例子稍加修改:
  
  ```js
  document.write("<script type=\"text/javascript\" src=\"file.js\">" + "<\/script>");
  ```
  
  
  
  
