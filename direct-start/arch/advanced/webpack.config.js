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
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: "file-loader"
      }
    ]
  },
  resolve: {
    alias: {
      faIcons: path.resolve( __dirname, "./node_modules/@fortawesome/fontawesome-free-solid/"),
      FontAwesomeIcon$: path.resolve( __dirname, "./node_modules/@fortawesome/react-fontawesome"),
      lib: "direct-core"
    },
    modules: [],
    extensions: [
      ".graphql"
    ]
  },
  devtool: "source-map",
  devServerProxy: {
    "/graphql": {
      target: "https://127.0.0.1",
      secure: false
    }
  },
  plugins: [
    new OfflinePlugin({
      appShell: "/index.html",
      ServiceWorker: {
        events: true
      },
      externals: [
        "/index.html"
      ]
    })
  ],
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
