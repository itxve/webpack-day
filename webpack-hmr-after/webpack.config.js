const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const outpath = 'dist';
const date = '';

module.exports = {
  entry: {
    // app: './src/index.js',
    tree: './src/index-treeShaking.js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      filename: `index${date}.html`
    }),
    new CleanWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, outpath),
  },
 

  //使用Node API 自定义添加 webpack-hmr-after\server-config\devServer.js
  // devServer: {
  //   contentBase: `./${outpath}`,
  //   hot: true
  // }
};