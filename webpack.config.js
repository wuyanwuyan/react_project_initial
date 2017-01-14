var ENV = 'dev'

var webpack = require('webpack')
var path = require('path')


const ROOT_PATH = path.resolve(__dirname)
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')
const MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules')

console.log(__dirname,ROOT_PATH,SRC_PATH,DIST_PATH,MODULE_PATH)

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin'); //自动打开浏览器插件

var indexHtmlConfig = {
    favicon : path.resolve(SRC_PATH, 'assets/favicon.ico'),
    template: path.resolve(SRC_PATH, 'index.html'),    //html模板路径
    filename : 'index.html',
    showErrors : false,
    inject: true,    //允许插件修改哪些内容，包括head与body
    hash: false    //为静态资源生成hash值
}

module.exports = {
    // context: SRC_PATH,
    // 配置服务器
    entry: {
        "index": path.resolve(SRC_PATH, 'main.js')
    },
    output: {
        path: DIST_PATH,
        filename: 'js/[name].js',    //'js/[name].[chunkhash].js',
        publicPath: './',//webpack-dev-server访问的路径 publicPath是为webpack-dev-server所使用
    },
    plugins: [
       new HtmlWebpackPlugin(indexHtmlConfig),
        new ExtractTextPlugin("css/[name].css"),
        new OpenBrowserPlugin({url: 'http://localhost:8080'})
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
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
    resolve: {
        root: [SRC_PATH, MODULE_PATH],
        extensions: ['','.js', 'jsx'],
        alias: {  // 别名，提高搜索效率，打包效率

        }
    },
    // externals: {
    //     'jquery': 'jquery' //  需要在HTML文件里用<script>标签引入
    // },
    devtool: 'source-map'
}



