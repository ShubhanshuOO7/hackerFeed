import axios from "axios";
import * as cheerio from "cheerio";
import Story from "../models/Story.js";

export const scrapeHackerNews = async () => {
  try {
    const { data } = await axios.get(
      "https://news.ycombinator.com"
    );

    const $ = cheerio.load(data);

    const stories = [];

    $(".athing").each((index, element) => {
      if (index >= 10) return false;

      const title = $(element)
        .find(".titleline a")
        .text();

      const url = $(element)
        .find(".titleline a")
        .attr("href");

      const subtext = $(element).next();

      const points =
        parseInt(
          subtext.find(".score").text()
        ) || 0;

      const author = subtext
        .find(".hnuser")
        .text();

      const postedAt = subtext
        .find(".age")
        .text();

      stories.push({
        title,
        url,
        points,
        author,
        postedAt,
      });
    });

    for (const story of stories) {
      const exists = await Story.findOne({
        url: story.url,
      });

      if (!exists) {
        await Story.create(story);
      }
    }

    console.log("Scraping completed");
  } catch (error) {
    console.error(error);
  }
};