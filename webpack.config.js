var ENV = 'dev'

var webpack = require('webpack')
var path = require('path')


const ROOT_PATH = path.resolve(__dirname)
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')
const MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules')

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var mainPageChunks = ["libs", "pageIndex/mainPage"];
var mainPageHtmlConfig = {
    favicon : './assets/logo.ico',
    template: 'index.html',    //html模板路径
    filename: 'index.html',
    showErrors : false,
    inject: true,    //允许插件修改哪些内容，包括head与body
    // hash: true,    //为静态资源生成hash值
    chunks: mainPageChunks,
    chunksSortMode: function (a, b) {
        return mainPageChunks.indexOf(a.names[0]) - mainPageChunks.indexOf(b.names[0]);
    }
}

module.exports = {
    context: SRC_PATH,
    entry: {
        "libs": ['jquery', 'bootstrap', 'ztree'],
        "pageIndex/mainPage": './js/main/index'
    },
    output: {
        path: DIST_PATH,
        filename: 'js/[name].js',    //'js/[name].[chunkhash].js',
        publicPath: "/",     //webpack-dev-server访问的路径 publicPath是为webpack-dev-server所使用
        // ,chunkFilename: "chunk.[name].js"
    },
    plugins: [
        new HtmlWebpackPlugin(mainPageHtmlConfig),
        new webpack.ProvidePlugin({
            // $: 'jquery',    // 会被打包进entry里面
            // jQuery: 'jquery'
            // WdatePicker : 'WdatePicker'
        }),
        new ExtractTextPlugin("css/[name].css")
        // new webpack.HotModuleReplacementPlugin()
        // ,new HtmlWebpackPlugin()
        // ,new webpack.optimize.CommonsChunkPlugin(
        //     {name:'commonHelllo',chunks:['libs']})  // // 用于多个HTML页面的时候，默认会把所有入口节点的公共代码提取出来,生成一个common.js ，必须遵循commonJS吗？
        //  { minChunks: 3,
        //      name: "common-app.chunk",
        //      chunks: ["home", "detail", "list"]}
    ],
    module: {
        // noParse : ["WdatePicker"],
        loaders: [
            // {test: /\.css$/, loader: 'style!css'},   // 将CSS一起打包进js文件
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                loader: 'url?limit=8192&name=assets/[name].[ext]'
            },  ////图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},  // 将CSS文件提取出来
            // { test: require.resolve('jquery'), loader: 'expose?jQuery!expose?$' },    //从 npm 模块中将 jquery 挂载到全局
            // {test: require.resolve('bootstrap'), loader: 'expose?bootstrap'}    //将bootstrap暴露到全局
            {
                test: /\.woff/,
                loader: 'url?prefix=font/&limit=10000&mimetype=application/font-woff&name=assets/[name].[ext]'
            }, {
                test: /\.ttf/,
                loader: 'file?prefix=font/&name=assets/[name].[ext]'
            }, {
                test: /\.eot/,
                loader: 'file?prefix=font/&name=assets/[name].[ext]'
            }
        ]
    },
    resolveLoader: {
        // root: path.join(__dirname, dev)
    },
    resolve: {
        root: [SRC_PATH, MODULE_PATH],
        extensions: ['.js', ''],
        alias: {  // 别名，提高搜索效率，打包效率

        }
    },
    // externals: {
    //     'jquery': 'jquery' //  需要在HTML文件里用<script>标签引入
    // },
    devtool: 'source-map'
}



