const webpack = require( 'webpack' );
const path = require( 'path' );
const HappyPack = require('happypack');
const os = require("os");

const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

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
    chunkFilename: './static/js/[name].chunk-[chunkhash].js',
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
    contentBase : path.join( userpath , "/public" ),
    proxy: {
      '/api': {
        target: `${protocol}://127.0.0.1:${port}`,
        secure: false
      },
      "/socket.io": {
        target: `http://127.0.0.1:${port}`
      }
    },
    historyApiFallback : {
      index: '/index.html'
    },
    inline : true
  },
  module: {
    rules: [
      {
        test: /.*node_modules.*direct.*\.(react|js)$/,
        use: "happypack/loader?id=react"
      },
    {
      test: /\.(react|js)$/,
      use: "happypack/loader?id=react",
      exclude: [
        /node_modules/
      ]
    },
    {
      test : /\.less$/,
      use: "happypack/loader?id=styles"
    }]
  },
  plugins : [
    new HappyPack({
      id: "react",
      loaders: ["babel-loader?cacheDirectory"],
      threadPool: HappyThreadPool
    }),
    new HappyPack({
      id: "styles",
      loaders: [
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
      ],
      threadPool: HappyThreadPool
    })
  ]
};
