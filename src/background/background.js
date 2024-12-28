import { sendMessage } from "webext-bridge/background";

browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.url && changeInfo.url.includes("#")) {
    await sendMessage("HASH_CHANGED", {}, `content-script@${tabId}`);
  }
});

browser.commands.onCommand.addListener(async (command) => {
  if (command === "LOGOUT") {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true
    });

    if (tabs.length) {
      await sendMessage("LOGOUT", {}, `content-script@${tabs[0].id}`);
    }
  }
});
