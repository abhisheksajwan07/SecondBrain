import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async (): Promise<void> => {
  console.log("🌐 Attempting DB connection ");

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ MongoDB Connected");

    mongoose.connection.on("error", (err) => {
      console.error(" Mongoose runtime error:", err);
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(" MongoDB Connection Failed:", err.message);
    }
  }
};
