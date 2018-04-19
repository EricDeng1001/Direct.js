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
  console.log("you can specify your webpack config using webpack.config.js in your project root");
}

prodConfig.mode = "production";

prodConfig.plugins = [
  ...plugins,
  ...compilerConfig.prodOnlyPlugins,
  new webpack.optimize.SplitChunksPlugin(),
  new webpack.BannerPlugin( "Direct.js\nAntinux Innovation\nAuthor: Eric Deng" ),
];

module.exports = prodConfig;
