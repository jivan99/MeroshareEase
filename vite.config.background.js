import { defineConfig } from "vite";
import { r } from "./scripts/utils";
import { name as packageName } from "./package.json";

export default defineConfig({
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
