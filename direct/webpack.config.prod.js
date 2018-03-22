const webpack = require( 'webpack' )
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const path = require( 'path' )

const userpath = path.resolve( "../../" );
const baseConfig = require("./webpack.config.dev.js");
const { devServer , devtool , plugins , ...prodConfig } = baseConfig;

prodConfig.plugins = [
  ...plugins,
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify("production")
  }),
  new UglifyJSPlugin()
];

module.exports = prodConfig;
