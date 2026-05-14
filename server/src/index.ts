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
const distPath = path.resolve(__dirname, "../../dist");
const indexPath = path.join(distPath, "index.html");

console.log("Current Directory (__dirname):", __dirname);
console.log("Looking for static files in:", distPath);
console.log("Does dist folder exist?", fs.existsSync(distPath));
console.log("Does index.html exist?", fs.existsSync(indexPath));

app.use(express.static(distPath));
app.use(cors());
app.use(CookieParser());
app.use(express.json());

// API Routes
app.use("/api/profile", profileRouter);
app.use("/api/plan", planRouter);

app.get(/.*/, (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("Frontend build not found. Check Docker paths.");
  }
});

// PORT and HOST
const PORT: number = parseInt(process.env.PORT || "3001", 10);
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
