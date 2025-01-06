const path = require("path")
const htmlWebpack = require("html-webpack-plugin")
const copyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    target: "web",
    mode: "development",

    entry: path.resolve(__dirname, "src", "main.js"),
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },

    devServer:{ //Criando um servidor local para ver a aplicação rodando.
        static: {
            directory: path.join(__dirname, "dist"),
        },
        port: 3004,
        open: true,
        liveReload: true,
    },
    
    plugins: [
        new htmlWebpack({
            template: path.resolve(__dirname, "index.html"), //injetando o HTML na aplicação.
            favicon: path.resolve("src", "assets", "scissors.svg")
        }),
        new copyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets"),
                    to: path.resolve(__dirname, "dist", "src", "assets")
                }
            ]
        })
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"] //injetando o css na aplicação.
            },
        ],
    },
}