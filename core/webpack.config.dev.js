const webpack = require( 'webpack' );
const path = require( 'path' );
console.log( path.resolve( '../src/Frontend/' ) );
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
  devtool : 'source-map',
  devServer : {
    contentBase : "./public",
    proxy: {
      '*': {
        target: 'https://127.0.0.1/',
        secure: false
      },

    },
    historyApiFallback : {
      index: '/index.html'
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
      include: [
        /renext.*/,
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
              path.resolve( "./src/Frontend/Styles/" ),
              __dirname + "Styles/"
            ]
          }
        }
      ]
    }]
  },
  plugins : [
    new webpack.BannerPlugin( "Antinus Innovation\nAll rights reserved" ),
    new webpack.optimize.CommonsChunkPlugin({
      names: [ 'vendor' , 'common' ]
    })
  ]
};
