import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import autoprefixer from "autoprefixer";
import { crx } from "@crxjs/vite-plugin";
import { fileURLToPath, URL } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import manifest from "./manifest.json" with { type: "json" };

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
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
    Icons({ compiler: "vue3", autoInstall: true }),
    crx({
      manifest,
      contentScripts: {
        injectCss: true
      }
    }),
    {
      name: "merge-css-shadow-dom",
      enforce: "post",
      apply: "serve",
      transform(src, id) {
        if (/\.(css).*$/.test(id)) {
          const fn =
            "import { updateStyle, removeStyle } from '/src/content/utils.js';\n";
          let updatedSrc = fn + src;
          updatedSrc = updatedSrc.replace(
            "__vite__updateStyle(",
            "updateStyle("
          );
          updatedSrc = updatedSrc.replace(
            "__vite__removeStyle(",
            "removeStyle("
          );
          return {
            code: updatedSrc,
            map: null
          };
        }
      }
    }
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  optimizeDeps: {
    include: ["vue", "webextension-polyfill"]
  }
});
