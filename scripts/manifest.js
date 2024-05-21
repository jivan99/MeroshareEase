import fs from "fs-extra";
import { rp, log } from "./utils.js";
import { getManifest } from "../src/manifest.js";

export async function generateManifest() {
  const manifest = await getManifest();
  fs.writeJSON(rp("extension/dist/manifest.json"), manifest, {
    spaces: 4
  });
  log({ name: "GET-READY", message: "generate manifest" });
}
