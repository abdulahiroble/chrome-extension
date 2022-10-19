const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPLugin = require('html-webpack-plugin')
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');


module.exports = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        popup: path.resolve('./src/popup/popup.tsx')
    },
    module: {
        rules: [
            {
                use: "ts-loader",
                test: /\.tsx$/,
                exclude: /node_module/
            },
            {
                use: ["style-loader", "css-loader", {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            ident: 'postcss',
                            plugins: [tailwindcss, autoprefixer]
                        }
                    }
                }],
                test: /\.css$/i
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
            { 
                from: path.resolve('src/static'), 
                to: path.resolve('dist') 
            },
            ],
          }),
          new HtmlPLugin({
            title: "React js boilerplate",
            filename: "popup.html",
            chunks: ['popup']
          })
    ],
    resolve: {
        extensions: [".tsx", 'ts', 'js']
    },
    output: {
        filename: '[name].js'
    }
}