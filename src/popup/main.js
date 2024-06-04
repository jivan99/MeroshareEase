import { createApp } from "vue";
import Popup from "./components/Popup.vue";

import Browser from "webextension-polyfill";
global.browser = Browser;

createApp(Popup).mount("#app");
