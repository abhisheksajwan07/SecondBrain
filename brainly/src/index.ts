import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import authRoutes from "./routes/auth";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

app.use("/api/v1", authRoutes);
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
