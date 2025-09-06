import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ DB connected to", process.env.MONGO_URI);
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1)
  }
};
