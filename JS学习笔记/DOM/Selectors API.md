## Selectors API

Selectors API 规定了浏览器原生支持的 CSS 查询 API。

- Selectors API Level 1 的核心是两个方法: **querySelector()** 和 **querySelectorAll()** 。在兼容浏览器中，`Document` 类型和 `Element` 类型的实例上都会暴露这两个方法。

- Selectors API Level 2 规范在 `Element` 类型上新增了更多方法，比如 **matches()**、 **find()** 和 **findAll()**


### querySelector()

querySelector() 方法接收 CSS 选择符参数，返回匹配该模式的 **第一个后代元素**，如果没有匹配项则返回 `null`，如果选择符有语法错误或碰到不支持的选择符，则 querySelector() 方法会抛出错误。

```js
// 取得<body>元素
let body = document.querySelector("body");

// 取得 ID 为"myDiv"的元素
let myDiv = document.querySelector("#myDiv");

// 取得类名为"selected"的第一个元素
let selected = document.querySelector(".selected");

// 取得类名为"button"的图片
let img = document.body.querySelector("img.button");
```

在 `Document` 上使用 querySelector() 方法时，会从文档元素开始搜索; 在 `Element` 上使用 querySelector() 方法时，则只会从当前元素的后代中查询。


### querySelectorAll()

querySelectorAll() 方法跟 querySelector()一样，也接收一个用于查询的参数，但它会返回 **所有匹配的节点**，而不止一个。这个方法返回的是一个 `NodeList` 的静态实例(返回的 `NodeList` 实例一个属性和方法都不缺，但它是一个静态的 “快照”，而非 “实时 ”的查询)。如果没有匹配项，则返回空的 `NodeList` 实例。如果选择符有语法错误或碰到不支持的选择符，则 querySelectorAll() 方法会抛出错误。

```js
// 取得 ID 为"myDiv"的<div>元素中的所有<em>元素
let ems = document.getElementById("myDiv").querySelectorAll("em");

// 取得所有类名中包含"selected"的元素
let selecteds = document.querySelectorAll(".selected");

// 取得所有是<p>元素子元素的<strong>元素
let strongs = document.querySelectorAll("p strong");
```

返回的 NodeList 对象可以通过 for-of 循环、item()方法 或 中括号语法 取得个别元素。

```js
let strongElements = document.querySelectorAll("p strong");

// 以下 3 个循环的效果一样
for (let strong of strongElements) {
  strong.className = "important";
}

for (let i = 0; i < strongElements.length; ++i) {
  strongElements.item(i).className = "important";
}

for (let i = 0; i < strongElements.length; ++i) {
  strongElements[i].className = "important";
}
```


### matches()

matches() 方法(在规范草案中称为 matchesSelector())接收一个 CSS 选择符参数，如果元素匹配则该选择符返回 `true`，否则返回 `false`。所有主流浏览器都支持 matches()。

```js
if (document.body.matches("body.page1")){
  // true
}
```

使用这个方法可以方便地检测某个元素会不会被 querySelector() 或 querySelectorAll()方法返回。
