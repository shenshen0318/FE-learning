## Comment 类型 

DOM 中的注释通过 `Comment` 类型表示。`Comment` 类型的节点具有以下特征:

- nodeType 等于 8;
- nodeName 值为 "#comment";
- nodeValue 值为 注释的内容;
- parentNode 值为 `Document` 或 `Element` 对象;
- 不支持子节点。

- `Comment` 类型与 `Text` 类型继承同一个基类(`CharacterData`)

- 拥有除 splitText() 之外 `Text` 节点所有的字符串操作方法

- 与 Text 类型相似，注释的实际内容可以通过 `nodeValue` 或 `data` 属性获得。

- 如果要访问注释节点，则必须确定它们是 <html> 元素的后代，因为浏览器不承认结束的 </html> 标签之后的注释 


  ```html
  <div id="myDiv"><!-- A comment --></div>
  ```
  
  ```js
  let div = document.getElementById("myDiv");
  let comment = div.firstChild;
  console.log(comment.data); // "A comment"
  ```
  
一个不太重要的方法：document.createComment() 创建注释节点，参数为注释文本  

  ```js
  let comment = document.createComment("A comment")
  ```
  
注释节点很少通过 JavaScrpit 创建和访问，因为注释几乎不涉及算法逻辑，通过 JS 写注释实在没必要。
  
  
