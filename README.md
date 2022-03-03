# Vue Collapse Tree

这是一个基于 Vue3 的折叠层级树。

## 使用说明

```npm i vue-collapse-tree```

```js
import { createApp } from "vue";
import App from "./App.vue";
import CollapseTree from "vue-collapse-tree";
import "vue-collapse-tree/style.css";

const app = createApp(App);
app.use(CollapseTree);
app.mount("#app");
```

## 在线演示

[在线演示](https://kooriookami.github.io/vue-collapse-tree/)

## 示例代码

[示例代码](src/examples/Example.vue)

## Collapse Tree 属性

| 参数                     | 说明      | 类型     | 默认值  |
|------------------------|---------|--------|------|
| line                   | 是否显示层级线 | boolean | true |
| line-offset-height     | 线高度偏移   | number | 20   |
| line-offset-top        | 线距顶偏移   | number | 20   |
| default-expanded-level | 默认展开层级  | number | 1    |
| indent                 | 层级缩进    | number | 40   |
| icon-placeholder       | 空图标占位   | boolean | true |

## Collapse Tree 插槽

| 插槽名    | 说明                          |
|--------|-----------------------------|
| —      | 自定义默认内容   |

## Collapse Tree Item 属性

| 参数   | 说明   | 类型      | 默认值   |
|------|------|---------|-------|
| show | 默认展开 | boolean | false |

## Collapse Tree Item 插槽

| 插槽名   | 说明          | 	子标签             |
|--------|-------------|------------------|
| —      | 自定义层级内容     | CollapseTreeItem |
| header | 自定义层级头部内容   | —                |
| icon   | 自定义折叠图标内容   | —                |
