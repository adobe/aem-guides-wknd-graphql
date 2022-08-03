const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer:{
        static: './dist',
    },
    entry: {
        main: './src/main.js',
        person: './src/person.js',
    },
    output:{
        filename: '[name].aem-headless.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title : 'AEM Headless - WKND Web Component - Basic GraphQL Tutorial',
        template: './src/assets/aem-headless.html',
      }),  
    ],
    module:{
        rules:[
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],

            },
            {
                test: /\.(png|svg|jpg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ],
    },
    optimization: {
        runtimeChunk: 'single',
      },
};
