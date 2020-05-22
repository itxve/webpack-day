var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js'
        , polyfills: './src/polyfills.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash',
            join: ['lodash', 'join']
        }), new HtmlWebpackPlugin()
    ],
    module: {
        rules: [

            {
                test: require.resolve('./src/globals.js'),
                use: 'exports-loader?file,parse=helpers.parse'
            }
            // , {
            //     test: require.resolve('./src/index.js'),
            //     use: 'imports-loader?this=>window'
            // }
            ,
        ]
    },

};