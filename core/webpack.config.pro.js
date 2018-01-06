const webpack = require( 'webpack' )
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require( 'path' )
//const extractTextWebpackPlugin = require( 'extract-text-webpack-plugin' );
module.exports = {
  entry : {
    vendor: [ 'react' , 'react-dom' , 'redux' , 'react-redux' , 'react-router' , 'react-router-dom' ,'react-transition-group' , 'react-bootstrap' , 'redux-thunk' ],
    entry : __dirname + "/App"
  },
  output : {
    path : path.resolve( "./public" ),
    filename: '[name].js',
    chunkFilename: './static/js/[name].chunk.js',
    publicPath: "/"
  },
  resolve : {
    modules : [
      './',
      path.resolve( "./node_modules" ),
      path.resolve( './src/' ),
      path.resolve( './src/Frontend/' ),
      __dirname
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
      include: [
        __dirname,
        path.resolve( './src/' ),
        path.resolve( './src/Frontend/' )
      ]
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
          loader : 'less-loader',
          options: {
            paths: [
              path.resolve( "./src/Frontend/Styles/" )
            ]
          }
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
