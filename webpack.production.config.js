var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

const ROOT_PATH = path.resolve(__dirname)
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')
const MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules')

var indexHtmlConfig = {
    favicon: path.resolve(SRC_PATH, 'assets/favicon.ico'),
    template: path.resolve(SRC_PATH, 'index.html'),    //html模板路径
    filename: 'index.html',
    showErrors: false,
    inject: true,    //允许插件修改哪些内容，包括head与body
    hash: false    //为静态资源生成hash值 url后面？+hash
}

const CDN_URL = "/";//http://localhost:8080";

module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router'],  // 不经常改变的模块提取到一个js文件
        main: path.resolve(SRC_PATH, 'main.js'),
    },
    output: {
        path: DIST_PATH,
        filename: 'js/[name].[chunkhash].js',    //'js/[name].[chunkhash].js',
        publicPath: CDN_URL
    },
    plugins: [
        new HtmlWebpackPlugin(indexHtmlConfig),
        new ExtractTextPlugin("css/[name].[chunkhash].css"),
        new webpack.optimize.DedupePlugin(), // 查找相等或近似的模块，去除重复的代码，避免在最终生成的文件中出现重复的模块
        new webpack.optimize.OccurenceOrderPlugin(),  // 按引用频度来排序 ID，以便达到减少文件大小的效果
        new webpack.optimize.UglifyJsPlugin(
            {
                compress: {warnings: false, drop_console: true},
                output: {comments: false},
            }
        ), // 代码压缩plugin
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor']
        })
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015", "stage-0", "react"]
                }
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                loader: 'url?limit=8192&name=assets/[name].[hash].[ext]'
            },  ////图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            {
                test: /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract("style", ["css","postcss","sass"])
            },
            {
                test: /\.woff/,
                loader: 'url?prefix=font/&limit=10000&mimetype=application/font-woff&name=assets/[name].[hash].[ext]'
            }, {
                test: /\.ttf/,
                loader: 'file?prefix=font/&name=assets/[name].[hash].[ext]'
            }, {
                test: /\.eot/,
                loader: 'file?prefix=font/&name=assets/[name].[hash].[ext]'
            }
        ]
    },
    resolve: {
        root: [SRC_PATH, MODULE_PATH],
        extensions: ['', '.js', 'jsx'],
        alias: {  // 别名，提高搜索效率，打包效率

        }
    },
    postcss: [
        require('autoprefixer')()
    ]

}



