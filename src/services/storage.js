const cs = chrome.storage.local;

export async function getFileJSON(filename) {
  try {
    const response = await fetch(chrome.runtime.getURL(filename));
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error catching JSON file: ${error}`);
    return null;
  }
}

export async function getDataFromStorage(key) {
  if (!key) {
    throw new Error("Key is required to retrieve data from storage.");
  }

  try {
    const data = await cs.get(key);
    if (data === undefined || data === null) {
      throw new Error(`No data found in storage for key: ${key}`);
    }
    return data;
  } catch (error) {
    console.error("Error retrieving data from storage:", error);
  }
}

export async function setDataToStorage(key, value) {
  try {
    await cs.set({ [key]: value });
  } catch (error) {
    console.error("Error setting data to storage:", error);
  }
}

export async function removeDataFromStorage(key) {
  try {
    await cs.remove(key);
  } catch (error) {
    console.error("Error removing data from storage:", error);
  }
}
