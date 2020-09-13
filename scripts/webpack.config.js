const devMode = process.env.NODE_ENV !== "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const util = require("./util");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [util.resolve("src")],
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.less$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 6000,
              name: util.staticPath("images/[name][hash].[ext]"),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json", ".css"],
    alias: {
      "@": util.resolve("src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: util.resolve("public/index.html"),
      filename: util.resolve("dist/index.html"),
      favicon: util.resolve("public/favicon.ico"),
      minify: devMode
        ? false
        : {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
          },
    }),
  ],
};
