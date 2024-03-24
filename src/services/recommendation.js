import { getDataFromStorage } from "@/services/storage";
import { defaultDictionary, Stemmer } from "ts-sastrawi";
import { stopwords } from "./stopword-dictonary";

class Recommendation {
  removeSymbol(title) {
    const regex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
    return title.replace(regex, "").toLowerCase();
  }

  removeStopWord(title, stopwords) {
    const words = title.split(/\s+/);
    const filteredWords = words.filter((word) => !stopwords.includes(word));

    return filteredWords.join(" ");
  }

  removeStemmer(title) {
    const dictionary = defaultDictionary();
    const stemmer = new Stemmer(dictionary);
    return stemmer.stem(title);
  }

  preprocessing(title) {
    const words = stopwords();
    title = this.removeStopWord(title, words);
    title = this.removeStemmer(title);
    title = this.removeSymbol(title);

    return title;
  }

  async getSimilarDocuments(id, start = 0, size = undefined) {
    try {
      const { model } = await getDataFromStorage("model");

      let similarDocuments = model[id];

      if (similarDocuments === undefined) {
        return [];
      }

      const end = size !== undefined ? start + size : undefined;
      similarDocuments = similarDocuments.slice(start, end);

      return similarDocuments;
    } catch (error) {
      console.error(
        `Error when getting similar documents with ${id}: ${error}`
      );
    }
  }

  async getRecommendationFromTitle(title) {
    try {
      const { news } = await getDataFromStorage("news");
      let idx = news.findIndex((data) => data.title === title);

      if (idx !== -1) {
        return news[idx];
      } else {
        const keywords = this.preprocessing(title).split(" ");
        const filteredIndexesSet = new Set();

        news.forEach((item, index) => {
          if (keywords.some((key) => item.title.includes(key)))
            filteredIndexesSet.add(index);
        });

        const filteredIndexes = Array.from(filteredIndexesSet);
        if (filteredIndexes.length === 0) {
          return null;
        } else {
          const recommendations = [];

          for (const idx of filteredIndexes) {
            recommendations.push(await this.getSimilarDocuments(idx, 0, 10));
          }

          recommendations.sort((a, b) => b.score - a.score);
          const topRecommendations = recommendations.slice(0, 10);
          const recommendedNews = topRecommendations.map(
            (article) => news[article.id]
          );

          return filteredIndexes
            .map((idx) => news[idx])
            .concat(recommendedNews);
        }
      }
    } catch (error) {
      console.error(
        `Error when  getting recommendation from the title(${title}): ${error}`
      );
    }
  }
}

function getSelectedCategories(data) {
  const frekuensi = {};
  data.forEach((item) => {
    frekuensi[item] = (frekuensi[item] || 0) + 1;
  });

  const sortedData = Object.entries(frekuensi).sort((a, b) => b[1] - a[1]);
  const selected = sortedData.slice(0, 3).map((item) => item[0]);

  return selected;
}

function orderNews(news) {
  const total = 21;
  const average = total / news.length;
  const result = [];

  for (const value of news) {
    const numToTake = Math.min(value.length, Math.ceil(average));
    result.push(...value.slice(0, numToTake));
  }

  return result;
}

export async function getRecommendations(cnn) {
  try {
    const recom = new Recommendation();
    const result = [];
    const { history } = await getDataFromStorage("history");

    if (history.length > 0 && history !== undefined) {
      const titles = history.map((url) =>
        url.split("/").pop().replace(/-/g, " ")
      );

      const recommendations = [];

      for (const title of titles) {
        const articles = await recom.getRecommendationFromTitle(title);
        recommendations.push(...articles);
      }

      const filteredCat = getSelectedCategories(
        recommendations
          .filter((item) => item !== undefined && item !== null)
          .map((value) => value.category)
      );

      for (const cat of filteredCat) {
        switch (cat) {
          case "nasional":
            result.push(await cnn.national_news());
            break;
          case "internasional":
            result.push(await cnn.international_news());
            break;
          case "ekonomi":
            result.push(await cnn.economy_news());
            break;
          case "olahraga":
            result.push(await cnn.sports_news());
            break;
          case "hiburan":
            result.push(await cnn.entertaiment_news());
            break;
          case "teknologi":
            result.push(await cnn.technology_news());
            break;
          case "gaya-hidup":
            result.push(await cnn.lifestyle_news());
            break;
          default:
            break;
        }
      }

      const finalResult = orderNews(result);
      return finalResult;
    } else {
      return await cnn.index();
    }
  } catch (error) {
    console.error(`Error when getting recommendations: ${error}`);
    return await cnn.index();
  }
}
