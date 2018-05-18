const path = require("path");
const webpack = require("webpack");
const os = require("os");
const HappyPack = require("happypack");
const baseConfig = require("./webpack.config.dev.js");
const userpath = path.resolve("../../");
const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const {
  devServer,
  devtool,
  plugins,
  watchOptions,
  ...prodConfig
} = baseConfig;


var compilerConfig = {
  plugins: [],
  prodOnlyPlugins: [],
  module: {
    rules: []
  },
  HtmlWebpackPluginConfig: {},
  cssLoaderOptions: {},
  lessLoaderOptions: {},
  fileLoaderOptions: {},
  cacheGroups: {}
};

try {
  Object.assign(
    compilerConfig,
    require( path.resolve( userpath, "./webpack.config.js") )
  );
} catch( e ){
  console.log("you can specify your webpack config using webpack.config.js in your project root");
}

prodConfig.mode = "production";

prodConfig.watch = false;
prodConfig.module = {
  rules: [
    ...compilerConfig.module.rules,
    {
      test: /.*node_modules.*direct.*\.jsx?$/,
      use: "happypack/loader?id=babel"
    },
    {
      test: /\.jsx?$/,
      use: "happypack/loader?id=babel",
      exclude: [
        /node_modules/
      ]
    },
    {
      test: /\.less$/,
      loaders: [
        MiniCssExtractPlugin.loader,
        "happypack/loader?id=styles"
      ]
    },
    {
      test: /\.(jpe?g|png|gig|webp)$/,
      loaders: [
        {
          loader: "file-loader",
          options: compilerConfig.fileLoaderOptions
        }
      ]
    }
  ]
};

prodConfig.plugins = [
  ...compilerConfig.plugins,
  ...compilerConfig.prodOnlyPlugins,
  new MiniCssExtractPlugin({
    filename: "./static/css/[name]-[hash].css",
  }),
  new HtmlWebpackPlugin({
    template: path.resolve( userpath, "./src/Frontend/Core/index.html" ),
    ...compilerConfig.HtmlWebpackPluginConfig
  }),
  new HappyPack({
    id: "babel",
    loaders: ["babel-loader?cacheDirectory"],
    threadPool: HappyThreadPool
  }),
  new HappyPack({
    id: "styles",
    loaders: [
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
            path.resolve( userpath, "./src/Frontend/Styles/" )
          ],
          ...compilerConfig.lessLoaderOptions
        }
      }
    ],
    threadPool: HappyThreadPool
  }),
  new webpack.BannerPlugin("Direct.js\nAntinux Innovation\nAuthor: Eric Deng")
];

module.exports = prodConfig;
