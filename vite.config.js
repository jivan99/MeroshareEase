import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import { dirname, relative } from "node:path";
import { isDev, port, rp } from "./scripts/utils";
import AutoImport from "unplugin-auto-import/vite";

export const sharedConfig = {
  root: rp("src"),
  resolve: {
    alias: {
      "~/": `${rp("src")}/`
    }
  },
  plugins: [
    Vue(),

    AutoImport({
      imports: [
        "vue",
        {
          "webextension-polyfill": [["default", "browser"]]
        }
      ]
    }),

    // rewrite assets to use relative path
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), "/assets")}/`
        );
      }
    }
  ],
  optimizeDeps: {
    include: ["vue", "webextension-polyfill"]
  }
};

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === "serve" ? `http://localhost:${port}/` : "/dist/",
  server: {
    port,
    hmr: {
      host: "localhost"
    },
    origin: `http://localhost:${port}`
  },
  build: {
    watch: isDev ? {} : undefined,
    outDir: rp("extension/dist"),
    emptyOutDir: false,
    sourcemap: isDev ? "inline" : false,
    terserOptions: {
      mangle: false
    }
  }
}));
