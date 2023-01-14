const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: { main: './src/pages/index.js' },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath:''
    },
    devtool: 'eval-source-map',
    mode: 'development',
    devServer: {
        static: {
            directory: path.resolve(__dirname, './dist')
        },
        compress: true,
        port: 8080,
        open: true
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                loader: 'css-loader',
                options: {
                    importLoaders: 1
                }
                }, 'postcss-loader']
            },
            {
                test: /\.(svg|png|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },    
        ]
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ],
};