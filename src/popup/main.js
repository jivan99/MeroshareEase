import { createApp } from "vue";
import Popup from "./components/Popup.vue";

import Browser from "webextension-polyfill";

createApp(Popup).mount("#app");
