const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const deps = require("./package.json").dependencies;

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
        new ModuleFederationPlugin({
            name: "app1",
            filename: "remoteApp.js",
            library: { type: "var", name: "app1" },
            remotes: {
                shell:"shell"
            },
            exposes: {
                "./routes": "./src/routes.js"
            },
            shared:{
                ...deps,
                react: {
                    eager: true,
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    eager: true,
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                },
            }
        }),
        new HtmlWebpackPlugin({
        template: "./public/index.html",
        }),
    ],
};