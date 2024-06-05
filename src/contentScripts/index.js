import { createApp } from "vue";
import App from "./views/App.vue";
import Browser from "webextension-polyfill";

const root = document.createElement("div");
root.id = "browser-extension-root";
document.body.insertAdjacentElement("beforeend", root);

globalThis.browser = Browser;

createApp(App).mount("#browser-extension-root");
