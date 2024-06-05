import Browser from "webextension-polyfill";
globalThis.browser = Browser;

browser.runtime.onInstalled.addListener(() => {
  console.log(`Howdy, I'm installed!`);
  console.log(`Hurray! It worked.`);
});
