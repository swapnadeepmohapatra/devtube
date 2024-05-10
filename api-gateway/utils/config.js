import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8080;

export const publicRoutes = {
  "/api/auth": "http://localhost:8081",
  "/api/watch": "http://localhost:8084",
};

export const privateRoutes = {
  "/api/user": "http://localhost:8081",
  "/api/upload": "http://localhost:8082",
  "/api/transcode": "http://localhost:8083",
  "/api/edit": "http://localhost:8084",
};

export const JWT_SECRET = process.env.JWT_SECRET;
