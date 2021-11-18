const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

module.exports = {

    mode: 'development',

    entry: "./src/js/app.js",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/bundle.js",
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            template: "./src/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/styles.css"
        }),

        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),

    ],

    module: {
        rules: [
            /*{
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            }, */
            {
                test: /\.s[ac]ss$/i,
                exclude: /(node_modules)/,
                use: [
                    // Creates `style` nodes from JS strings
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    //postcss
                    "postcss-loader",
                    // Compiles Sass to CSS
                    "sass-loader"
                ],
            },
            {
                test: /\.(jpeg|jpg|png|gif|svg|pdf)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[path][name].[ext]',
                            outputPath: (file) => {
                                let path = file.split("src/")[1];
                                return path
                            }
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: true,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },

    devServer: {
        port: 5500,
    },


};