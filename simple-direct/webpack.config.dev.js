const webpack = require("webpack");
const path = require("path");
const HappyPack = require("happypack");
const os = require("os");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length + 2 })
const merge = require("direct-core/Algorithm/mergeObject");

const userpath = path.resolve( "../../" );

const serverConfig = require( path.resolve( userpath , "./src/Server/Config/server" ) );

const frontendConfigPath = path.resolve( userpath , "./src/Frontend/Config" );

var protocol = serverConfig.https ? "https" : "http";
var port = serverConfig.port;

var compilerConfig = {
  mainApiHost: "127.0.0.1",
  resolve: {
    alias: {},
    modules: [],
    extensions: []
  },
  module: {
    rules: []
  },
  devServerProxy: {},
  devtool: "source-map",
  plugins: [],
  HtmlWebpackPluginConfig: {
    template: "./template.html"
  },
  cssLoaderOptions: {},
  lessLoaderOptions: {}
};

try {
  merge( compilerConfig , require( path.resolve( userpath , "./webpack.config.js") ) );
} catch( e ){

}

module.exports = {
  entry: {
    index: path.resolve("./App")
  },
  output: {
    path: path.resolve( userpath , "./public" ),
    filename: "[name]-[hash].js",
    chunkFilename: "./static/js/[name].chunk-[chunkhash].js",
    publicPath: "/"
  },
  watch: true,
  watchOptions: {
    ignored: path.resolve( userpath , "./node_modules" ),
    aggregateTimeout: 1200
  },
  resolve: {
    alias: compilerConfig.resolve.alias,
    modules: [
      "./",
      path.resolve( userpath , "./src/Frontend/" ),
      path.resolve( userpath , "./src/" ),
      ...compilerConfig.resolve.modules,
      path.resolve( userpath , "./node_modules" ),
    ],
    extensions: [
      ".jsx",
      ".js",
      ".css",
      ".less",
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".webp",
      ...compilerConfig.resolve.extensions
    ]
  },
  devtool: compilerConfig.devtool,
  devServer: {
    contentBase: path.join( userpath , "/public" ),
    proxy: {
      "/api": {
        target: `${protocol}://${compilerConfig.mainApiHost}:${port}`,
        secure: false
      },
      "/socket.io": {
        target: `${protocol}://${compilerConfig.mainApiHost}:${port}`,
        secure: false
      },
      ...compilerConfig.devServerProxy
    },
    historyApiFallback: {
      index: "/index.html"
    },
    inline: true
  },
  module: {
    rules: [
      ...compilerConfig.module.rules,
      {
        test: /.*node_modules.*direct.*\.(jsx|js)$/,
        use: "happypack/loader?id=babel"
      },
      {
        test: /\.(jsx|js)$/,
        use: "happypack/loader?id=babel",
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.less$/,
        use: "happypack/loader?id=styles"
      },
      {
        test: /\.(png|svg|webp|jpe?g|gif)/,
        use: "happypack/loader?id=files"
      }
    ]
  },
  plugins: [
    ...compilerConfig.plugins,
    new HtmlWebpackPlugin({
      ...compilerConfig.HtmlWebpackPluginConfig
    }),
    new HappyPack({
      id: "babel",
      loaders: ["babel-loader?cacheDirectory"],
      threadPool: HappyThreadPool
    }),
    new HappyPack({
      id: "files",
      loaders: ["file-loader"],
      threadPool: HappyThreadPool
    }),
    new HappyPack({
      id: "styles",
      loaders: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: true,
            minimize: true,
            ...compilerConfig.cssLoaderOptions
          }
        },
        "postcss-loader",
        {
          loader: "less-loader",
          options: {
            paths: [
              path.resolve( userpath , "./src/Frontend/Styles/" )
            ],
            ...compilerConfig.lessLoaderOptions
          }
        }
      ],
      threadPool: HappyThreadPool
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '+',
      name: true,
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /node_modules(?!\/simple-direct.*)/
        },
        config: {
          name: "directCoreConfig",
          test: /Core/
        },
        appWithDirect: {
          name: "appWithDirect",
          test: /simple-direct/
        },
        commons: {
          minSize: 30 * 1024,
          minChunks: 2
        }
      }
    }
  },
  performance: {
    hints: false
  },
  mode: "development"
};
