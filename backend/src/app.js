import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";
import scrapeRoutes from "./routes/scrapeRoutes.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use("/api/auth", authRoutes);

app.use("/api/stories", storyRoutes);

app.use("/api/scrape", scrapeRoutes);

export default app;