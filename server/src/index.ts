import express from "express";
import cors from "cors";
import CookieParser from "cookie-parser";
import dotenv from "dotenv";
import { profileRouter } from "./routes/profile";
import { planRouter } from "./routes/plan";
import path from "path";

dotenv.config();

const app = express();
const distPath = path.join(__dirname, "../../dist");

app.use(cors());
app.use(CookieParser());
app.use(express.json());

// API Routes
app.use("/api/profile", profileRouter);
app.use("/api/plan", planRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// PORT and HOST
const PORT: number = parseInt(process.env.PORT || "3001", 10);
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
