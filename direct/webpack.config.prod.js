const webpack = require("webpack")

const path = require("path");

const userpath = path.resolve("../../");
const baseConfig = require("./webpack.config.dev.js");
const { devServer , devtool , plugins , ...prodConfig } = baseConfig;

prodConfig.mode = "production";

prodConfig.plugins = [
  ...plugins,
  new webpack.optimize.SplitChunksPlugin(),
  new webpack.BannerPlugin( "Antinus Innovation\nAll rights reserved" ),
];

module.exports = prodConfig;
