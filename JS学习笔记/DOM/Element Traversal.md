
IE9 之前的版本不会把元素间的空格当成空白节点，而其他浏览器则会。这样就导致了 `childNodes` 和 `firstChild` 等属性上的差异。为了弥补这个差异，同时不影响 DOM 规范，W3C 通过新的 `Element Traversal` 规范定义了一组新属性。
