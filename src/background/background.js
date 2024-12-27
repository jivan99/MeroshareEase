import { sendMessage } from "webext-bridge/background";

browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.url && changeInfo.url.includes("#")) {
    await sendMessage("HASH_CHANGED", {}, `content-script@${tabId}`);
  }
});
