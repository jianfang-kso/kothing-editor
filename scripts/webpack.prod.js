const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  entry: './src/build.js',
  output: {
    filename: 'kothing-editor.min.js',
    path: path.resolve(__dirname, '../dist'),
  },

  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CleanWebpackPlugin(['../dist'], {
      root: __dirname,
      allowExternal: true,
    }),
    new OptimizeCSSPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/kothing-editor.min.css',
    }),
  ],
});
