const path = require("path");

module.exports = {
  mainApiHost: "127.0.0.1",
  module: {
    rules: []
  },
  resolve: {
    alias: {},
    modules: [],
  },
  devtool: "source-map",
  devServerProxy: {},
  plugins: [],
  prodOnlyPlugins: [],
  HtmlWebpackPluginConfig: {},
  cacheGroups: {}
};
