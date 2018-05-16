const path = require("path");
const BundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const OfflinePlugin = require("offline-plugin");

module.exports = {
  mainApiHost: "127.0.0.1",
  module: {
    rules: [
      {
        test: /\.graphql$/,
        use: "raw-loader"
      }
    ]
  },
  resolve: {
    alias: {
      lib: "direct-core"
    },
    modules: [],
    extensions: []
  },
  devtool: "source-map",
  devServerProxy: {},
  plugins: [],
  prodOnlyPlugins: [
    new BundleAnalyzer()
  ],
  HtmlWebpackPluginConfig: {
    template: path.resolve( __dirname, "./public/static/html/template.html" )
  },
  cacheGroups: {
    UI: {
      name: "UILib",
      test: /(material-ui[\\/])/
    }
  }
};
