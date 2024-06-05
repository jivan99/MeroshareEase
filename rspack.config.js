import path from "node:path";
import rspack from "@rspack/core";
import { defineConfig } from "@rspack/cli";
import { VueLoaderPlugin } from "vue-loader";

const { dirname } = import.meta;

const config = defineConfig({
  context: dirname,
  mode: "production",
  devtool: false,
  devServer: {
    hot: false
  },
  entry: {
    background: "./src/background/index.js",
    options: "./src/options/main.js",
    popup: "./src/popup/main.js",
    content: "./src/contentScripts/index.js"
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./src/options/index.html",
      filename: "options/index.html",
      chunks: ["options"],
      scriptLoading: "module",
      publicPath: "../"
    }),
    new rspack.HtmlRspackPlugin({
      template: "./src/popup/index.html",
      filename: "popup/index.html",
      chunks: ["popup"],
      scriptLoading: "module",
      publicPath: "../"
    }),
    new rspack.DefinePlugin({
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false",
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false"
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          experimentalInlineMatchResource: true
        }
      }
    ]
  },
  output: {
    path: path.resolve(dirname, "extension/dist"),
    filename: "[name].js",
    clean: true,
    publicPath: ""
  },
  target: ["web"]
});

export default config;
