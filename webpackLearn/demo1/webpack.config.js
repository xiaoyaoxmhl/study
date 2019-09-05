'use strict';
const path = require('path')
const webpack=require('webpack');

module.exports = {
    entry: {
        index: './src/index.js',
        // search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test:/.js$/,
                use:'babel-loader'
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        contentBase:'./dist',
        hot: true
    }
}