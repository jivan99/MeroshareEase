import path from "node:path";
import rspack from "@rspack/core";
import { defineConfig } from "@rspack/cli";
import { VueLoaderPlugin } from "vue-loader";

const { dirname } = import.meta;

const config = defineConfig({
  context: dirname,
  mode: "production",
  devtool: "inline-source-map",
  devServer: {
    hot: false
  },
  entry: {
    background: "./src/background/index.js",
    options: "./src/options/main.js",
    popup: "./src/popup/main.js"
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      filename: "options/index.html",
      chunks: ["options"],
      scriptLoading: "module"
    }),
    new rspack.HtmlRspackPlugin({
      filename: "popup/index.html",
      chunks: ["popup"],
      scriptLoading: "module"
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      // ...
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          // Note, for the majority of features to be available, make sure this option is `true`
          experimentalInlineMatchResource: true
        }
      }
    ]
  },
  output: {
    path: path.resolve(dirname, "extension/dist"),
    filename: "[name].js",
    clean: true
  },
  target: ["web"]
});

export default config;
