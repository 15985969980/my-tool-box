## 打字机插件

## 引入方式

通过 `script` 标签引入：

```html
<script type="text/javascript" src="../dist/hxk-tool-box.umd.js"></script>
```

通过 ESM 引入：

```javascript
import { Typing } from "./eft-tool-box.esm";
```

## 快速使用

**Typing.constructor(data)**

-   data [TypingData] 动画配置对象

```ts
export interface TypingData {
	elm?: string;
	changeCallBack?: (text: string) => {};
	strings: string[];
	startDelaySpeed?: number;
	deleteSpeed?: number;
	shouldDelete?: boolean;
	sleepTime?: number;
}
```

创建 Typing 实例

```javascript
let typing = new hxkToolBox.Typing({
	elm: "#aaa",
	strings: [
		"Welcome to Fomalhaut🥝のTiny Home!🤣🤣🤣",
		"Hope you have a nice day!🍭🍭🍭",
	],
	changeCallBack: text => {
		console.log(text);
	},
	startDelaySpeed: 150,
	deleteSpeed: 50,
	shouldDelete: true,
});
```

### 注意 

- 需要删除特效需要开启 shouldDelete 字段

- 在使用了 changeCallBack 的时候就不会改动 dom

- 在使用了 changeCallBack 的时候就不会改动 dom
