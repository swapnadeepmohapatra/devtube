import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8084;

export const MONGO_URI = process.env.MONGO_URI;

export const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_DOMAIN;
