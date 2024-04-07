import { ChatGPTAPI } from "chatgpt";
import { getDataFromStorage } from "./storage";

function getMessageFromErrorString(errorString) {
  try {
    const errorObject = JSON.parse(
      errorString.substring(errorString.indexOf("{"))
    );
    return errorObject.error.message;
  } catch (error) {
    return "Error parsing the error string";
  }
}

export async function generateSummary(text, callback) {
  const { options } = await getDataFromStorage("options");
  const { api, prompt } = options;

  try {
    const model = new ChatGPTAPI({
      apiKey: api,
    });

    await model.sendMessage(`${prompt} ${text}`, {
      onProgress: (response) => callback(response.text),
    });
  } catch (e) {
    if (e.message.includes("ChatGPT error")) {
      throw getMessageFromErrorString(e.message);
    } else {
      console.log(e.message);
    }
  }
}
