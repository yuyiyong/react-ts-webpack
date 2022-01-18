# react-ts-webpack

react ts webpack

- `trailingComma` ：对象的最后一个属性末尾也会添加 , ，比如 { a: 1, b: 2 } 会格式为 { a: 1, b: 2, } 。
- `tabWidth` ：缩进大小。
- `semi` ：分号是否添加，我以前从 C++转前端的，有一段时间非常不能忍受不加分号的行为，现在香的一匹。
- `singleQuote` ：是否单引号，绝壁选择单引号啊，不会真有人还用双引号吧？不会吧！😏
- `jsxSingleQuote `：jsx 语法下是否单引号，同上。
- `endOfLine` ：与 .editorconfig 保持一致设置。
- `printWidth` ：单行代码最长字符长度，超过之后会自动格式化换行。
- `bracketSpacing` ：在对象中的括号之间打印空格， {a: 5} 格式化为 { a: 5 } 。
- `arrowParens` ：箭头函数的参数无论有几个，都要括号包裹。比如 (a) => {} ，如果设为 avoid ，会自动格式化为 a => {} 。

## webpack
[中文](https://webpack.docschina.org/guides/hot-module-replacement/)

[英文](https://webpack.js.org/concepts/plugins/)
## 环境

[cross-env](https://github.com/kentcdodds/cross-env)

#### 打包（正式 测试）

> 正式：`npm run build`

> 测试 `npm run build:test`

#### 运行 （正式 开发）（测试不用）

> 开发：`npm start`

> 生产：`npm run start:prod`

## Router

[react-router-dom](https://reactrouter.com/docs/en/v6/getting-started/installation#installation)

## 手机适配

[postcss-pxtorem](https://github.com/cuth/postcss-pxtorem#readme)

## Toast

[react-hot-toast](https://react-hot-toast.com/docs/version-2#per-toast-positioning)

#### toast(信息) 正常使用

#### loading （http ）

#### modal

- 自定义组件 放 函数中调用

- 弄个例子


## http 
axios

## form

[react-hook-form](https://react-hook-form.com/zh/advanced-usage/)


## hooks

### useMemo

### useCallback

### 全局变量, 主题，语言

> `useContext + useReducer` 做状态管理器

## Iconfont
[blog 参考](https://blog.csdn.net/bidang3275/article/details/117126196)


### hooks 改造

[改造](https://bobi.ink/2019/08/10/react-hooks/)

### upload 组件
> - 1 表单数组的输入 输出
> - 2 有上传进度条