const webpack = require( 'webpack' )
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require( 'path' )
//const extractTextWebpackPlugin = require( 'extract-text-webpack-plugin' );
module.exports = {
  entry : {
    vendor: [ 'react' , 'react-dom' , 'redux' , 'react-redux' , 'react-router' , 'react-router-dom' ,'react-transition-group' , 'react-bootstrap' , 'redux-thunk' ],
    entry : path.join( __dirname ,  "/Frontend/App" )
  },
  output : {
    path : path.join( __dirname , "/public" ),
    filename: '[name].js',
    chunkFilename: './static/js/[name].chunk.js'
  },
  resolve : {
    alias : {
      view$ : './layout.react'
    },
    modules : [
      './',
      path.join( __dirname , "node_modules/" ),
      path.join( __dirname , '/Frontend/' )
    ],
    extensions : [
      ".js",
      ".react",
      '.less'
    ]
  },
  module: {
    rules: [
    {
      test : /\.(react|js)$/,
      use : {
        loader: "babel-loader"
      },
      exclude: /node_modules/
    },
    {
      test : /\.less$/,
      use : [
        {
          loader : "style-loader"
        },
        {
          loader : "css-loader" ,
          options : {
            modules : true
          }
        },
        {
          loader : 'less-loader'
        }
      ]
    }]
  },
  plugins : [
    new webpack.BannerPlugin( "Antinus Innovation\nAll rights reserved" ),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: [ 'vendor' , 'common' ]
    }),
    //new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJSPlugin(),
    //new extractTextWebpackPlugin({
    //  filename : '*.less',
    //  disable : false,
    //  allChunks : true
    //})
  ]
};
