import {
  getDataFromStorage,
  getFileJSON,
  setDataToStorage,
} from "@/services/storage";

const runtime = chrome.runtime;
const cnnURL = "https://www.cnnindonesia.com";

async function getHistories() {
  try {
    const kMillisecondsPerMonth = 1000 * 60 * 60 * 24 * 30;
    const kOneMonthAgo = new Date().getTime() - kMillisecondsPerMonth;

    const historyItems = await chrome.history.search({
      text: cnnURL,
      startTime: kOneMonthAgo,
      maxResults: 5,
    });

    if (historyItems.length > 0) {
      return historyItems
        .map((item) => item.url)
        .filter(
          (url) =>
            url !== cnnURL && url !== cnnURL + "/" && url.split("/").length > 5
        );
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Failed getting histories: ${error}`);
  }
}

runtime.onInstalled.addListener(async (details) => {
  if (details.reason === runtime.OnInstalledReason.INSTALL) {
    const files = {
      news: "/data/news.json",
      model: "/data/model.json",
    };

    for (const [key, value] of Object.entries(files)) {
      try {
        const fileJSON = await getFileJSON(value);
        if (fileJSON !== null && fileJSON !== undefined)
          await setDataToStorage(key, fileJSON);
        else console.error(`Data from ${value} is not found!`);
      } catch (error) {
        console.error(`Error storing ${key} JSON file: ${error}`);
      }
    }

    const histories = await getHistories();
    if (histories.length > 0 && histories !== undefined) {
      await setDataToStorage("history", histories);
    }
  }
});

chrome.history.onVisited.addListener(async (historyItem) => {
  const { history } = await getDataFromStorage("history");

  if (historyItem.url.includes(cnnURL)) {
    if (history === undefined) {
      const historyItems = await getHistories();
      await setDataToStorage("history", historyItems);
    }

    if (history.includes(historyItem.url) === false) {
      const newHistory = [...history, historyItem.url];
      await setDataToStorage("history", newHistory);
    }
  }
});

runtime.onMessage.addListener((msg) => {
  if (msg.action === "options") {
    chrome.tabs.create({ url: runtime.getURL("options.html") });
  }
});
