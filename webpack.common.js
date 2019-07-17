const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        main: "./src/js/index.js",
        vendor: "./src/js/vendor.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
            jquery: "jquery"
        }),
        new CopyWebpackPlugin([
            {
                from: "./src/images",
                to: "images"
            }
        ])
    ]
};