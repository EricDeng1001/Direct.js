const webpack = require("webpack")

const path = require("path");

const userpath = path.resolve("../../");
const baseConfig = require("./webpack.config.dev.js");
const { devServer , devtool , plugins , ...prodConfig } = baseConfig;


var compilerConfig = {
  prodOnlyPlugins: []
};

try {
  Object.assign( compilerConfig , require( path.resolve( userpath , "./webpack.config.js") ) );
} catch( e ){

}

prodConfig.mode = "production";

prodConfig.plugins = [
  ...plugins,
  ...compilerConfig.prodOnlyPlugins,
  new webpack.optimize.SplitChunksPlugin(),
  new webpack.BannerPlugin( "Antinus Innovation\nAll rights reserved" ),
];

module.exports = prodConfig;