'use strict';

const path = require('path'),
    webpack = require('webpack'),
    utils = require('steamer-webpack-utils');

var config = require('../config/project'),
    configWebpack = config.webpack;

var Clean = require('clean-webpack-plugin'),
    HtmlResWebpackPlugin = require('html-res-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpackConfig = {
    entry: {
        "index": [path.join(configWebpack.path.example, "src/index.js")]
    },
    output: {
        path: path.join(configWebpack.path.example, "dev"),
        filename: "[name].js",
        publicPath: ""
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    "plugins": [
                        "react-hot-loader/babel", "transform-decorators-legacy"
                    ],
                    "presets": [
                        [
                            "es2015", {
                                "loose": true,
                                "modules": false
                            }
                        ],
                        "react",
                        "stage-0"
                    ]
                },
                exclude: /node_modules/
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader?-autoprefixer&localIdentName=[name]-[local]-[hash:base64:5]?postcss-l" +
                            "oader!less-loader?root=" + path.resolve('src')
                }),
                include: [configWebpack.path.example, configWebpack.path.src]
            }, {
                test: /\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ["url-loader?limit=1000&name=img/[path]/[name].[ext]"],
                include: [configWebpack.path.example, configWebpack.path.src]
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules', configWebpack.path.src
        ],
        extensions: [
            ".js",
            ".jsx",
            ".es6",
            "css",
            "scss",
            "less",
            "png",
            "jpg",
            "jpeg",
            "ico"
        ]
    },
    plugins: [
        // remove previous build folder
        new Clean([path.join(configWebpack.path.example, "dev")], {
            root: path.resolve()
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('css/[name].css').replace('css/js', 'css');
            }
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    watch: true, //  watch mode
    // 是否添加source-map，可去掉注释开启
    devtool: "#inline-source-map",

    externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    }
};

module.exports = webpackConfig;