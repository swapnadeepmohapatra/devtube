import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8082;

export const MONGO_URI = process.env.MONGO_URI;

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_BUCKET = process.env.AWS_BUCKET;
