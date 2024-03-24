export default class CNN {
  constructor() {
    this.base_url = "https://www.cnnindonesia.com";
  }

  async index() {
    return this.query(`${this.base_url}/`);
  }

  async national_news() {
    return this.query(`${this.base_url}/nasional`);
  }

  async international_news() {
    return this.query(`${this.base_url}/internasional`);
  }

  async economy_news() {
    return this.query(`${this.base_url}/ekonomi`);
  }

  async sports_news() {
    return this.query(`${this.base_url}/olahraga`);
  }

  async entertaiment_news() {
    return this.query(`${this.base_url}/hiburan`);
  }

  async technology_news() {
    return this.query(`${this.base_url}/teknologi`);
  }

  async lifestyle_news() {
    return this.query(`${this.base_url}/gaya-hidup`);
  }

  async search(keyword) {
    return this.query(`${this.base_url}/search/?query=${keyword}`, "article");
  }

  async detail(url) {
    try {
      const response = await fetch(url);
      const html = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const data = {};

      try {
        const title = doc.querySelector("h1");
        const tags = doc.querySelectorAll(".detail-wrap .detail-text p");

        let combinedText = "";

        tags.forEach((p) => {
          const text = p.textContent.trim();
          if (
            !text.includes("ADVERTISEMENT") &&
            !text.includes("SCROLL TO CONTINUE")
          ) {
            combinedText += text + " ";
          }
        });

        data.result = {
          title: title,
          body: combinedText.trim(),
        };
      } catch (e) {
        // console.error(`Error in getting element: ${e}`);
      }

      return data;
    } catch (error) {
      throw new Error("Network Error!");
    }
  }

  async query(url, articleEl = ".nhl-list article") {
    try {
      const response = await fetch(url);
      const html = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const data = [];
      const articles = doc.querySelectorAll(articleEl);
      articles.forEach((article) => {
        try {
          const link = article.querySelector(
            "a[aria-label='link description']"
          );
          const title = link.querySelector("h2").textContent.trim();
          const linkUrl = link.getAttribute("href").trim();

          data.push({
            title: title,
            link: linkUrl,
          });
        } catch (error) {
          // Do nothing, suppresses error logging
        }
      });

      return data;
    } catch (error) {
      throw new Error(`Network Error!`);
    }
  }
}
