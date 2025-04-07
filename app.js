import dotenv from "dotenv";
dotenv.config({ path:"./.env" })

import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import userRoutes from "./routers/router.js";
import { connectDB } from "./database/database.js";
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cookieParser())
app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use("/api/v1", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "response from the server"
  })
})

connectDB();

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
