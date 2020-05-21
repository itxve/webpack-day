const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
const outpath = 'dist';
const date = '';

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js',
  },
  devtool: 'inline-source-map',
  watch: true, //开启监听选项
  watchOptions: { // 监控的选项
    poll: 1000,  // 每秒寻问我多少次
    aggregateTimeout: 500, // 防抖，  过完500ms再进行
    ignored: /node_modules/,  // 不需要监控哪个文件
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      filename: `index${date}.html`
    }),
    new CleanWebpackPlugin({
      dry: true,  //模拟删除
    }),
    new ManifestPlugin({
      fileName: 'my-manifest.json',
      basePath: '/src',
      seed: {
        name: 'My Manifest'
      }
    }),
  ],
  output: {
    filename: '[name]main.js',
    path: path.resolve(__dirname, outpath),
    publicPath: '/'
  },
  devServer: {
    contentBase: `./${outpath}`
  }
};