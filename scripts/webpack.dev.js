const webpack = require("webpack");
const merge = require("webpack-merge");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const config = require("./webpack.config");
const util = require("./util");

const devServerConfig = {
  contentBase: util.resolve("dist"),
  clientLogLevel: "warning",
  port: 8080,
  hot: true,
  host: "localhost",
  compress: true,
  open: true,
  quiet: true,
  overlay: {
    warnings: true,
    errors: true,
  },
  proxy: {
    // detail: https://www.webpackjs.com/configuration/dev-server/#devserver-proxy
    "/base": {
      target: "https://test.cn",
      secure: true,
      changeOrigin: true,
      pathRewrite: {
        "^/base": "",
      },
    },
  },
  historyApiFallback: true,
};

module.exports = merge(config, {
  mode: "development",
  entry: util.resolve("public/index.js"),
  output: {
    filename: "[name].js",
    chunkFilename: "[chunkhash].js",
    jsonpFunction: "myWebpackJsonp",
  },
  plugins: [
    new webpack.DefinePlugin({
      "env.PRODUCTION": "false",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          `App running at:\n\n - Local:   http://localhost:${
            devServerConfig.port
          }\n - Network: http://${util.localAddress()}:${devServerConfig.port}`,
        ],
      },
      clearConsole: true,
    }),
  ],
  devServer: devServerConfig,
  devtool: "source-map",
});
