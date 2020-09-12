const webpack = require('webpack');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const config = require('./webpack.config');
const util = require('./util');

module.exports = merge(config, {
  mode: 'production',
  entry: util.resolve('/src/build.js'),
  output: {
    path: util.resolve('dist'),
    filename: util.staticPath('kothing-editor.min.js'),
    publicPath: './',
  },
  performance: {
    hints: false,
  },
  optimization: {
    minimize: true,
    minimizer: [
      // This is only used in production mode
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      // This is only used in production mode
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'env.PRODUCTION': "true",
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJSPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: util.staticPath('css/kothing-editor.min.css'),
    }),
  ],
});