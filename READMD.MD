# 推荐插件

* Path Intellisense

# 主题推荐

* One Dark Pro

# html乱码

> head头中加\<meta http-equiv="COntent-Type" content="text/html; charset=UTF-8" />

# 加载数据

> 此外，可以加载的有用资源还有数据，如 JSON 文件，CSV、TSV 和 XML。类似于 NodeJS，JSON 支持实际上是内置的，也就是说 import Data from './data.json' 默认将正常运行。要导入 CSV、TSV 和 XML，你可以使用 csv-loader 和 xml-loader。让我们处理这三类文件：
>
> > npm install --save-dev csv-loader xml-loader

### 插件作用

* html-webpack-plugin

> 该插件会自动生成输出index.html 并将入口配置的js引入 （参数可配置）[HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin)
> 使用webpack --watch的时候如果html-webpack-plugin 不配置参数会删除掉一开始生成的index.html

* clean-webpack-plugin

> 在每次构建前清理 `dist` 并只生成用到的文件
> - 官网的版本比较老会出问题
>
> **`正确姿势`** 
>
> - const {CleanWebpackPlugin} = require('clean-webpack-plugin')
> - new CleanWebpackPlugin()  (不需要指定输出的 `dist` 目录)

* webpack-manifest-plugin

> 生成资源映射文件

# 开始开发

* 错误映射到源码（开发时可配置生产不建议）
* devtool: 'inline-source-map'

* 自动编译(三种方式)

> - webpack's Watch Mode
>- webpack-dev-server
> - webpack-dev-middleware

* webpack-dev-middleware

> webpack-dev-middleware 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。 webpack-dev-server 在内部使用了它，同时，它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求。

> npm install --save-dev express webpack-dev-middleware

# HMR （热更新）

* **JS**
> 使用Node API 自定义热更新(webpack-hmr-after/server-config/devServer)

* **Style**
>使用css-loder

## 其他代码和框架

社区还有许多其他 loader 和示例，可以使 HMR 与各种框架和库(library)平滑地进行交互……

- [React Hot Loader](https://github.com/gaearon/react-hot-loader)：实时调整 react 组件。
- [Vue Loader](https://github.com/vuejs/vue-loader)：此 loader 支持用于 vue 组件的 HMR，提供开箱即用体验。
- [Elm Hot Loader](https://github.com/fluxxu/elm-hot-loader)：支持用于 Elm 程序语言的 HMR。
- [Redux HMR](https://survivejs.com/webpack/appendices/hmr-with-react/#configuring-hmr-with-redux)：无需 loader 或插件！只需对 main store 文件进行简单的修改。
- [Angular HMR](https://github.com/gdi2290/angular-hmr)：No loader necessary! A simple change to your main NgModule file is all that's required to have full control over the HMR APIs.没有必要使用 loader！只需对主要的 NgModule 文件进行简单的修改，由 HMR API 完全控制。

## 将文件标记为无副作用(side-effect-free)

在一个纯粹的 ESM 模块世界中，识别出哪些文件有副作用很简单。然而，我们的项目无法达到这种纯度，所以，此时有必要向 webpack 的 compiler 提供提示哪些代码是“纯粹部分”。

这种方式是通过 package.json 的 `"sideEffects"` 属性来实现的。

```json
{
  "name": "your-project",
  "sideEffects": false
}
```

如同上面提到的，如果所有代码都不包含副作用，我们就可以简单地将该属性标记为 `false`，来告知 webpack，它可以安全地删除未用到的 export 导出。

> 「副作用」的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。

如果你的代码确实有一些副作用，那么可以改为提供一个数组：

```json
{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js"
  ]
}
```

数组方式支持相关文件的相对路径、绝对路径和 glob 模式。它在内部使用 [micromatch](https://github.com/micromatch/micromatch#matching-features)。

> 注意，任何导入的文件都会受到 tree shaking 的影响。这意味着，如果在项目中使用类似 `css-loader` 并导入 CSS 文件，则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除：

```json
{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js",
    "*.css"
  ]
}
```

最后，还可以在 [`module.rules` 配置选项](https://github.com/webpack/webpack/issues/6065#issuecomment-351060570) 中设置 `"sideEffects"`。

## 压缩输出

通过如上方式，我们已经可以通过 `import` 和 `export` 语法，找出那些需要删除的“未使用代码(dead code)”，然而，我们不只是要找出，还需要在 bundle 中删除它们。为此，我们将使用 `-p`(production) 这个 webpack 编译标记，来启用 uglifyjs 压缩插件。

> 注意，`--optimize-minimize` 标记也会在 webpack 内部调用 `UglifyJsPlugin`。

从 webpack 4 开始，也可以通过 `"mode"` 配置选项轻松切换到压缩输出，只需设置为 `"production"`。

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
- }
+ },
+ mode: "production"
};
```

> 注意，也可以在命令行接口中使用 `--optimize-minimize` 标记，来使用 `UglifyJSPlugin`。

准备就绪后，然后运行另一个命令 `npm run build`，看看输出结果有没有发生改变。

你发现 `dist/bundle.js` 中的差异了吗？显然，现在整个 bundle 都已经被精简过，但是如果仔细观察，则不会看到 `square` 函数被引入，但会看到 `cube` 函数的修改版本（`function r(e){return e*e*e}n.a=r`）。现在，随着 tree shaking 和代码压缩，我们的 bundle 减小几个字节！虽然，在这个特定示例中，可能看起来没有减少很多，但是，在具有复杂的依赖树的大型应用程序上运行时，tree shaking 或许会对 bundle 产生显著的体积优化。

## 结论