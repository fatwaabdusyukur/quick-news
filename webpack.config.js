const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CSPWebpackPlugin = require("csp-html-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { argv } = require("process");
const webpack = require("webpack");

const isProduction = argv[3] === "production";

const fileExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "eot",
  "otf",
  "svg",
  "ttf",
  "woff",
  "woff2",
];

const plugins = [
  new CopyPlugin({
    patterns: [
      { from: "src/manifest.json", to: "manifest.json" },
      { from: "src/assets/img/logo.png", to: "img/logo.png" },
      { from: "src/assets/img/close.png", to: "img/close.png" },
      { from: "src/assets/css/style.css", to: "style.css" },
      { from: "src/assets/data/news.json", to: "data/news.json" },
      { from: "src/assets/data/model.json", to: "data/model.json" },
      { from: "src/options/options.html", to: "options.html" },
    ],
  }),
  new CleanWebpackPlugin(),
  new VueLoaderPlugin(),
  new CSPWebpackPlugin({
    "object-src": "'self'",
    "script-src": ["'self'"],
  }),
  new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: "true",
    __VUE_PROD_DEVTOOLS__: "false",
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
  }),
];

if (isProduction) {
  plugins.push(
    new ZipPlugin({
      path: path.resolve(__dirname),
      filename: "bundle.zip",
    })
  );
}

module.exports = {
  devtool: isProduction ? "source-map" : "cheap-module-source-map",
  mode: isProduction ? "production" : "development",
  entry: {
    content: path.resolve(__dirname, "./src/content/content.js"),
    background: path.resolve(__dirname, "./src/background/background.js"),
    options: path.resolve(__dirname, "./src/options/options.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          reactivityTransform: true,
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: new RegExp(`.(${fileExtensions.join("|")})$`),
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          {
            loader: "source-map-loader",
          },
        ],
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      },
    ],
  },

  plugins: plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      vue$: "@vue/runtime-dom/dist/runtime-dom.esm-bundler.js",
    },
    extensions: [".*", ".js", ".vue", ".json"],
  },
};
