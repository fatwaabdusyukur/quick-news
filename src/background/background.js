import { getFileJSON, setDataToStorage } from "@/services/storage";

const runtime = chrome.runtime;

async function getHistories() {
  try {
    const cnnURL = "https://www.cnnindonesia.com";
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
    } else {
      throw new Error("No articles in the browser's history!");
    }
  }
});
