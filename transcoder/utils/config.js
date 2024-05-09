import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

export const PORT = process.env.PORT || 8083;

export const MONGO_URI = process.env.MONGO_URI;

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_BUCKET = process.env.AWS_BUCKET;

export const KAFKA_CONFIG = {
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [process.env.KAFKA_BROKER],
  ssl: {
    ca: [fs.readFileSync(path.resolve("./ca.pem"), "utf-8")],
  },
  sasl: {
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
    mechanism: "plain",
  },
};
