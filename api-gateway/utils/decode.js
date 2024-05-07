import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export const decode = (token) => {
  console.log(token.split("=")[1], JWT_SECRET);
  return jwt.verify(token.split("=")[1], JWT_SECRET);
};
