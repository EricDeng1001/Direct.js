const path = require("path");
const HappyPack = require("happypack");
const os = require("os");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length + 2 })
const _ = require("lodash");

const userpath = path.resolve( "../../" );

const serverConfig = require( path.resolve( userpath, "./src/Server/Config/server" ) );

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
  lessLoaderOptions: {},
  cacheGroups: {}
};

try {
  _.merge( compilerConfig , require( path.resolve( userpath , "./webpack.config.js") ) );
} catch( e ){
  console.log("An error happened when loading webpack config:", e.message );
}

module.exports = {
  entry: {
    index: path.resolve("./App")
  },
  output: {
    path: path.resolve( userpath , "./public" ),
    filename: "[name]-[hash].js",
    chunkFilename: "./static/js/[name]-[chunkhash].js",
    publicPath: "/"
  },
  watch: true,
  watchOptions: {
    ignored: path.resolve( userpath , "./node_modules" ),
    aggregateTimeout: 1200
  },
  resolve: {
    alias: {
      lib: path.resolve( __dirname, "./HOC/" ),
      socket: path.resolve( __dirname, "/App/socket" ),
      ...compilerConfig.resolve.alias
    },
    modules: [
      ...compilerConfig.resolve.modules,
      "./node_modules",
      path.resolve( userpath, "./src/Frontend/" ),
      path.resolve( userpath, "./src/" )
    ],
    extensions: [
      ...compilerConfig.resolve.extensions,
      ".jsx",
      ".js",
      ".css",
      ".less",
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".webp"
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
      maxInitialRequests: 5,
      automaticNameDelimiter: '+',
      name: true,
      cacheGroups: {
        ...compilerConfig.cacheGroups,
        vendors: {
          name: "vendor",
          test: /node_modules[\\/]/,
          priority: -8
        },
        directStackMain: {
          name: "directStack-part1",
          test: /(redux[\\/]|react-router[\\/]|react-router-dom[\\/]|history[\\/]|react-redux[\\/]|lodash[\\/]|react-transition-group[\\/]|babel-runtime[\\/]|core-js[\\/])([\\/]node_modules)?/,
          priority: Infinity
        },
        directStackOthers: {
          name: "directStack-part2",
          test: /(react[\\/]|simple-direct[\\/]|style-loader[\\/]|css-loader[\\/]|engine\.io-(client|parser)[\\/]|react-dom[\\/]|socket\.io-(client|parser)[\\/]|process[\\/]|fbjs[\\/]|component-emitter[\\/]|ms[\\/]|dom-helpers[\\/]|webpack[\\/]|lodash-es[\\/]|prop-types[\\/]|object-assign[\\/]|blob[\\/]|parseuri[\\/])([\\/]node_modules)?/,
          priority: Infinity
        },
        commons: {
          minSize: 30 * 1024,
          minChunks: 2,
          reuseExistingChunk: true,
          priority: -9
        },
        default: false
      }
    }
  },
  performance: {
    hints: false
  },
  mode: "development"
};
