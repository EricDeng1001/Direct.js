const webpack = require( 'webpack' )
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require( 'path' )

const userpath = path.resolve( "../../" );
const baseConfig = require("./webpack.config.dev.js");
const { devServer , devtool , plugins , ...prodConfig } = baseConfig;

prodConfig.plugins = [
  new webpack.BannerPlugin( "Antinus Innovation\nAll rights reserved" ),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': "production"
  }),
  new webpack.optimize.CommonsChunkPlugin({
    names: [ 'vendor' , 'common' ]
  }),
  new UglifyJSPlugin()
];

module.exports = prodConfig;
