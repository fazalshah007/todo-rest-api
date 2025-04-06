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
app.use(cors());
app.use("/api/v1", userRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});