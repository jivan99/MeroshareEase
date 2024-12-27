import "@/assets/index.css";
import App from "./App.vue";
import { createApp } from "vue";
import { onMessage } from "webext-bridge/content-script";

document.documentElement.classList.add("dark");

// Factory function to create a fresh app instance
const createMyApp = () => createApp(App);
const root = document.createElement("div");
document.body.append(root);

// Initial app creation and mounting based on the hash
let app = null;

const mountApp = () => {
  // If app is already mounted, unmount it first
  if (app) {
    app.unmount();
  }

  // Create a fresh app instance and mount it
  app = createMyApp();
  app.mount(root);
};

// Mount the app if the initial hash is "#/login"
if (location.hash === "#/login") {
  mountApp();
}

// Listen for hash change events and remount app as necessary
onMessage("HASH_CHANGED", async () => {
  if (app) {
    app.unmount();
  }

  // Remount the app when the hash changes
  if (location.hash === "#/login") {
    mountApp();
  }
});
