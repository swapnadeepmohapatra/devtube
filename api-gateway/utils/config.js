import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8080;

export const publicRoutes = {
  "/api/auth": "http://localhost:8081",
};

export const privateRoutes = {
  "/api/user": "http://localhost:8081",
};

export const JWT_SECRET = process.env.JWT_SECRET;
