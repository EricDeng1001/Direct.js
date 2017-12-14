const webpack = require( 'webpack' )
const htmlWebpackPlugin = require( 'html-webpack-plugin' )
const path = require( 'path' )
//const extractTextWebpackPlugin = require( 'extract-text-webpack-plugin' );
module.exports = {
  entry : {
    vendor: [ 'react' , 'react-dom' , 'redux' , 'react-redux' , 'react-router' , 'react-router-dom' ],
    entry : path.join( __dirname ,  "/dev/App" )
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
      path.join( __dirname , 'dev/' ),
    ],
    extensions : [
      ".js",
      ".react",
      '.less'
    ]
  },
  devtool : 'source-map',
  devServer : {
    contentBase : "./public",
    proxy: {
      '/api': {
        target: 'http://apis.map.qq.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api' : ''
        }
      },

    },
    historyApiFallback : {
      index: 'index.html'
    },
    inline : true
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
    new webpack.optimize.CommonsChunkPlugin({
      names: [ 'vendor' , 'common' ]
    }),
    new htmlWebpackPlugin({
      title : 'Redux App',
      chunksSortMode: 'dependency',
      favicon : path.join( __dirname , "/dev/App/favicon.ico" ),
      template : path.join( __dirname , "/dev/App/index.html.tmpl" ),
    }),
  ]
};
