const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/index",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 3010,
    },
    output: {
        publicPath: "auto",
    },
    module: {
        rules: [
        {
            test: /\.jsx?$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            options: {
            presets: ["@babel/preset-react"],
            },
        },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: "./public/index.html",
        }),
    ],
};