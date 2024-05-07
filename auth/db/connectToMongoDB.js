import mongoose from "mongoose";
import { MONGO_URI } from "../utils/config.js";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error in connecting to MongoDB", error.message);
  }
};
