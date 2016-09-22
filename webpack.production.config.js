var path = require('path')
var webpack = require('webpack')
var HtmlwebpackPlugin = require('html-webpack-plugin')

// 文件夹的路径
var ROOT_PATH = path.resolve(__dirname)
var APP_PATH = path.resolve(ROOT_PATH, 'app')
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')
var TEM_PATH = path.resolve(ROOT_PATH, 'templates')

module.exports = {
    // APP_PATH项目的文件夹名字，直接用文件夹的名字会默认的着index.js ，也可以直接指定文件的名字
    // 
    entry: {
        app: path.resolve(APP_PATH, 'index.js'),
        mobile: path.resolve(APP_PATH, 'mobile.js'),
        vendors: ['jquery']
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].[hash].js'
    },
    plugins: [
        // 使用Uglify.js压缩js代码
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        // 入口文件里面的数组打包成vendors.js
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        
        new HtmlwebpackPlugin({
            title: 'hello World mxc',
            template: path.resolve(TEM_PATH, 'index.html'),
            filename: 'index.html',
            // 告诉插件引用entry里面的哪几个入口
            chunks: ['app', 'vendors'],
            // 把script 插入到标签里面
            inject: 'body'
        }),
        new HtmlwebpackPlugin({
            title: 'hello World 不伦不类不了',
            template: path.resolve(TEM_PATH, 'mobile.html'),
            filename: 'mobile.html',
            // 告诉插件引用entry里面的哪几个入口
            chunks: ['mobile', 'vendors'],
            // 把script 插入到标签里面
            inject: 'body'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: 'style!css!sass',
                include: APP_PATH
            },
            {
                test: /\.css$/,
                loader: 'style!css',
                include: APP_PATH
            },
            {
                test: /\.(jpg|png)$/,
                loader: 'url?limit=40000',

            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: APP_PATH,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },  
}




