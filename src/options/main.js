import { createApp } from "vue";
import Options from "./components/Options.vue";

import Browser from "webextension-polyfill";
globalThis.browser = Browser;

createApp(Options).mount("#app");
