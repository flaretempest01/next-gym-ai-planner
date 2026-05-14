import express from "express";
import cors from "cors";
import CookieParser from "cookie-parser";
import dotenv from "dotenv";
import { profileRouter } from "./routes/profile";
import { planRouter } from "./routes/plan";
import path from "path";

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || "3001", 10);
const HOST = "0.0.0.0";

app.use(cors());
app.use(CookieParser());
app.use(express.json());

// API Routes
app.use("/api/profile", profileRouter);
app.use("/api/plan", planRouter);

app.use(express.static(path.join(__dirname, "../../dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist", "index.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT}`);
});
