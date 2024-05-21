import { rp } from "./utils.js";
import chokidar from "chokidar";
import { generateManifest } from "./manifest.js";

generateManifest();

chokidar.watch([rp("src/manifest.js"), rp("package.json")]).on("change", () => {
  generateManifest();
});
