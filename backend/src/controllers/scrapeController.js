import { scrapeHackerNews } from "../services/scraperService.js";

export const scrapeStories = async (req, res) => {
  await scrapeHackerNews();

  res.json({
    message: "Scraping successful",
  });
};