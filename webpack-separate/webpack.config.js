const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;



module.exports = {
  entry: {
    // index: './src/index.js'
    // ,another: './src/nother-module.js'
    // "dynamic": "./src/dynamic.import.js"
    "layer":"./src/layer.js"
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting'
    }), new BundleAnalyzerPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  //抽离插件配置
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     minSize: 30000,
  //     maxSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 5,
  //     maxInitialRequests: 3,
  //     automaticNameDelimiter: '~',
  //     name: "common",
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: 10
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: 20,
  //         reuseExistingChunk: true
  //       }
  //     }
  //   }
  // },
};