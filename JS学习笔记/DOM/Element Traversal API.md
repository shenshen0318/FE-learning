## Element Traversal API

IE9 之前的版本不会把元素间的空格当成空白节点，而其他浏览器则会。这样就导致了 `childNodes` 和 `firstChild` 等属性上的差异。为了弥补这个差异，同时不影响 DOM 规范，W3C 通过新的 `Element Traversal` 规范定义了一组新属性。

Element Traversal API 为 DOM 元素添加了 5 个属性:

- childElementCount，返回子元素数量(不包含文本节点和注释)

- firstElementChild，指向第一个 `Element` 类型的子元素(Element 版 firstChild)

- lastElementChild，指向最后一个 `Element` 类型的子元素(Element 版 lastChild)

- previousElementSibling，指向前一个 `Element` 类型的同胞元素(Element 版 previousSibling)

- nextElementSibling，指向后一个 `Element` 类型的同胞元素(Element 版 nextSibling)

Element Traversal API 主要解决的空白文本节点的问题。

举个例子，过去要以跨浏览器方式遍历特定元素的所有子元素，代码大致是这样写的：

```js
let parentElement = document.getElementById('parent');
let currentChildNode = parentElement.firstChild;

// 没有子元素，firstChild 返回 null，跳过循环
while (currentChildNode) {
  if (currentChildNode.nodeType === 1) {
    // 如果有元素节点，则做相应处理
    processChild(currentChildNode);
  }
  if (currentChildNode === parentElement.lastChild) {
    break; 
  }
  currentChildNode = currentChildNode.nextSibling;
}
```

使用 Element Traversal 属性之后，以上代码可以简化如下:

```js
let parentElement = document.getElementById('parent');
let currentChildElement = parentElement.firstElementChild;

// 没有子元素，firstElementChild 返回 null，跳过循环 
while (currentChildElement) {
  // 这就是元素节点，做相应处理
  processChild(currentChildElement);
  if (currentChildElement === parentElement.lastElementChild) {
    break; 
  }
currentChildElement = currentChildElement.nextElementSibling; }
```



