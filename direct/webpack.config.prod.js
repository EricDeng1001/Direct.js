const webpack = require("webpack")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")

const path = require("path");

const userpath = path.resolve("../../");
const baseConfig = require("./webpack.config.dev.js");
const { devServer , devtool , plugins , ...prodConfig } = baseConfig;

prodConfig.plugins = [
  ...plugins,
  new webpack.BannerPlugin( "Antinus Innovation\nAll rights reserved" ),
  new webpack.optimize.CommonsChunkPlugin({ names: [ "common" , "vendor" ] }),
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("production")
  }),
  new UglifyJSPlugin()
];

module.exports = prodConfig;
