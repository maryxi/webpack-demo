var path = require('path')
var webpack = require('webpack')
var HtmlwebpackPlugin = require('html-webpack-plugin')

// 文件夹的路径
var ROOT_PATH = path.resolve(__dirname)
var APP_PATH = path.resolve(ROOT_PATH, 'app')
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')

module.exports = {
    /* APP_PATH项目的文件夹名字，直接用文件夹的名字会默认的着index.js ，也可以直接指定文件的名字
     * 分离app.js和第三方库
     * run build 之后会生成 index.js和vendors.js
     * 
     */ 
    entry: {
        app: path.resolve(APP_PATH, 'index.js'),

        /* 添加要打包在vendors里面的库
         * vendors对应chunkName的参数，必须保持一样 否则不能正常的加载
         */
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

    /*
     * 一下配置实现热加载
     * 在package.json中的scripts对象里面添加 "dev": "webpack-dev-server --hot --inline"
     * 
     */
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
        /*
         * 以下是loader的使用，执行的顺序是按照从右至左的顺序
         * 也可以写成数组的形式 ['style', 'css', 'less']
         *
         */
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
            /*
             * url-loader
             * 当图片小于25KB的时候，在它从属的css文件中转成BASE64字符串
             */
            {
                test: /\.(jpg|png)$/,
                loader: 'url?limit=40000',

            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: APP_PATH,

                // es2015这个参数是babel的plugin 支持各种es6新特性
                query: {
                    presets: ['es2015']
                }
            }
        ],

        /*
         * js的语法检查
         * perLoaders 就是在loaders之前执行
         */
        perLoaders: [
            {
                test: /\.js$/,
                include: APP_PATH,
                loader: 'jshint'
            }
        ]
    },

    //配置jshint的选项，支持es6的校验
    jshint: {
        'esnext': true
    },

    // 出错以后会以source-map的形式直接显示你出错的代码位置
    devtool: 'eval-source-map'
}




