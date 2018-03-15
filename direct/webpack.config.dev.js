const webpack = require( 'webpack' );
const path = require( 'path' );

const userpath = path.resolve( "../../" );

const serverConfig = require( path.resolve( userpath , "./src/Server/Config/server" ) );
var protocol = serverConfig.https ? "https" : "http";
var port = serverConfig.port;

module.exports = {
  entry: {
    vendor: [ 'react' , 'react-dom' , 'redux' , 'react-redux' , 'react-router' , 'react-router-dom' ,'react-transition-group' , 'react-bootstrap' , 'redux-thunk' ],
    entry : __dirname + "/App"
  },
  output: {
    path: path.resolve( userpath , "./public" ),
    filename: '[name].js',
    chunkFilename: './static/js/[name].chunk.js',
    publicPath: "/"
  },
  resolve : {
    modules : [
      './',
      path.resolve( userpath , "./node_modules" ),
      path.resolve( userpath , './src/' ),
      path.resolve( userpath , './src/Frontend/' ),
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
        target: `${protocol}://127.0.0.1:${port}/`,
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
        test: /direct.*\.(react|js)$/,
        use: {
          loader: "babel-loader"
        }
      },
    {
      test : /\.(react|js)$/,
      use : {
        loader: "babel-loader"
      },
      exclude: [
        /node_modules/
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
              path.resolve( userpath , "./src/Frontend/Styles/" )
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
