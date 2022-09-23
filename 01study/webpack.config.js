const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    //輸入的檔案
    entry: './src/index.ts',
    module: {
        rules: [
            //使用ts-loader負責處理.ts相關的檔案
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        //輸出的檔案名稱為bundle.js
        filename: 'bundle.js',

        //輸出的檔案會放置在./dist/這個資料夾裡
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        // Copy our static assets to the final build
        new CopyPlugin({
            patterns: [{ from: 'static/' }],
        }),
    ],
};