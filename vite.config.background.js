import { defineConfig } from "vite";
import { r } from "./scripts/utils";
import AutoImport from "unplugin-auto-import/vite";

import { name as packageName } from "./package.json";

export default defineConfig({
  plugins: [
    AutoImport({
      imports: [
        {
          "webextension-polyfill": [["*", "browser"]]
        }
      ]
    })
  ],
  build: {
    watch: {},
    copyPublicDir: false,
    outDir: r("extension/dist/background"),
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: {
      entry: r("src/background/index.js"),
      name: packageName,
      formats: ["es"]
    },
    rollupOptions: {
      output: {
        entryFileNames: "index.js",
        extend: true
      }
    }
  }
});
