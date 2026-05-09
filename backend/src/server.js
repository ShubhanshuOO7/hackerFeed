import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import { scrapeHackerNews } from "./services/scraperService.js";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

connectDB();

scrapeHackerNews();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});