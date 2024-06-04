import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(() => {
  console.log(`Howdy, I'm installed!`);
	console.log(`Hurray! It worked.`)
});
