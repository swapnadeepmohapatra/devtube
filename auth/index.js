import express from "express";
import dotenv from "dotenv";
import { PORT } from "./utils/config.js";
import authRouter from "./routes/auth.route.js";
import { connectToMongoDB } from "./db/connectToMongoDB.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/", authRouter);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Auth service is running on port: ${PORT}`);
});
