import express from "express";
import cors from "cors";
import CookieParser from "cookie-parser";
import dotenv from "dotenv";
import { profileRouter } from "./routes/profile";
import { planRouter } from "./routes/plan";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(CookieParser());

const distPath = path.resolve(__dirname, "../../dist");
const indexPath = path.join(distPath, "index.html");

// Debug Logs
console.log("Static files path:", distPath);

app.use(express.static(distPath));

app.use("/api/profile", profileRouter);
app.use("/api/plan", planRouter);

app.all(/.*/, (req, res) => {
  if (req.method !== "GET") {
    console.log(`Missing ${req.method} route for: ${req.url}`);
    return res
      .status(404)
      .json({ error: `Route ${req.url} not found on this server.` });
  }

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("Frontend build not found.");
  }
});

const PORT: number = parseInt(process.env.PORT || "3001", 10);
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
