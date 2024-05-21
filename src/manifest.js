import fs from "fs-extra";
import { rp } from "../scripts/utils.js";

export async function getManifest() {
  const pkg = await fs.readJSON(rp("package.json"), { encoding: "utf-8" });

  return {
    name: pkg.displayName || pkg.name,
    description: pkg.description,
    version: pkg.version,
    manifest_version: 3,
    background: {
      service_worker: "./dist/background/index.js"
    },
    permissions: ["alarms"],
    icons: {
      16: "/assets/icon-16x16.png",
      32: "/assets/icon-32x32.png",
      48: "/assets/icon-48x48.png",
      128: "/assets/icon-128x128.png"
    }
  };
}
