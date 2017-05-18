var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

const path = require('path');

const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
    path.resolve(__dirname, 'src/images')  // 2. 自己私人的 svg 存放目录
];

module.exports = {
    entry: {
        app: [
            __dirname + '/src/index.js' //唯一入口文件
        ]
    },
    output: {
        path: __dirname + '/build', //打包后的文件存放的地方
        filename: 'bundle.js' //js姓名
        // filename: '[name].[chunkhash:8].bundle.js', //打包后输出文件的文件名
        // publicPath:__dirname+'/public',
        // chunkFilename: '[name]-[id].[chunkhash:8].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: /src/
            },
            {
                test: /\.(png|jpg)$/,
                use: 'url-loader?limit=8192&name=src/images/[name].[ext]'
            },
            {
                test: /\.css$/,
                // loader: 'style-loader!css-loader'
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader?modules!postcss-loader!sass-loader'
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: ['css-loader', 'postcss-loader', 'sass-loader']
                // })
            },
            {
                test: /\.(svg)$/i,
                use: 'svg-sprite-loader',
                include: svgDirs,  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [
                        require('postcss-pxtorem')({
                            rootValue: 100,
                            propWhiteList: []
                        }),
                        require('autoprefixer')
                    ];
                }
            }
        }),
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            // filename: './index.html', //生成的html存放路径，相对于 path
            template: './public/index.html', //html模板路径
            hash: true,    //为静态资源生成hash值
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
            warnings: false,
            drop_console: false,
            }
        }),
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("production") 
            }
        })
    ],
    resolve: {
        // modules: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: [ '.web.js', '.js', '.json'],
    },
};
