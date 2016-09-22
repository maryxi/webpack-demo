var path = require('path')
var webpack = require('webpack')
var HtmlwebpackPlugin = require('html-webpack-plugin')

// 文件夹的路径
var ROOT_PATH = path.resolve(__dirname)
var APP_PATH = path.resolve(ROOT_PATH, 'app')
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')

module.exports = {
    // APP_PATH项目的文件夹名字，直接用文件夹的名字会默认的着index.js ，也可以直接指定文件的名字
    // 
    entry: {
        app: path.resolve(APP_PATH, 'index.js'),
        vendors: ['jquery'],
    },
    // output: {
    //     path: BUILD_PATH,
    //     filename: 'build.js'
    // },
    plugins: [
        new HtmlwebpackPlugin({
            title: 'hello World mxc'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,

        // ajax的代理 不是很懂
        proxy: {
            '/api/*': {
                target: 'http://localhost:5000',
                secure: false
            }
        }

    }, 
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
        ],
        perLoaders: [
            {
                test: /\.js$/,
                include: APP_PATH,
                loader: 'jshint'
            }
        ]
    },
    jshint: {
        'esnext': true
    },
    devtool: 'eval-source-map'
}




