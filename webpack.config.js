var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

const ROOT_PATH = path.resolve(__dirname)
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const BUILD_PATH = path.resolve(ROOT_PATH, 'build')
const MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules')

var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';  // webpack-hot-middleware热更新需要添加到入口文件

var indexHtmlConfig = {
    favicon: path.resolve(SRC_PATH, 'assets/favicon.ico'),
    template: path.resolve(SRC_PATH, 'index.html'),    //html模板路径
    filename: 'index.html',
    inject: true,    //允许插件修改哪些内容，包括head与body
    hash: false    //为静态资源生成hash值
}

module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router'],  // 不经常改变的模块提取到一个js文件
        main: [hotMiddlewareScript, path.resolve(SRC_PATH, 'main.js')],
    },
    output: {
        path: BUILD_PATH,
        filename: 'js/[name].js',
        publicPath: "/"
    },
    plugins: [
        new HtmlWebpackPlugin(indexHtmlConfig),
        new ExtractTextPlugin("css/[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015", "stage-0", "react"],
                    plugins: ["transform-runtime"],
                    cacheDirectory: true
                }
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                loader: 'url?limit=8192&name=assets/[name].[ext]'
            },  ////图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            {
                test: /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract("style", ["css?sourceMap","postcss","sass?sourceMap"])  //加载异步chunk，无法抽取css时，就使用style-loader，将其嵌入到页面的style标签
                // loaders: ["style-loader", "css-loader?sourceMap","postcss", "sass-loader?sourceMap"]   // 需要CSS modules？
            },  // 将CSS文件提取出来
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
        extensions: ['', '.js', 'jsx'],
        alias: {  // 别名，提高搜索效率，打包效率

        }
    },
    postcss: [
        require('autoprefixer')()
    ],
    // externals: {
    //     'jquery': 'jquery' //  需要在HTML文件里用<script>标签引入
    // },
    devtool: 'source-map'

}



