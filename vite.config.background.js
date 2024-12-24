import { defineConfig } from "vite";
import { rp } from "./scripts/utils";
import { sharedConfig } from "./vite.config";

import { name as packageName } from "./package.json";

export default defineConfig({
  ...sharedConfig,
  build: {
    watch: {},
    copyPublicDir: false,
    outDir: rp("extension/dist/background"),
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: {
      entry: rp("src/background/index.js"),
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
