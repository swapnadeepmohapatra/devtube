import jwt from "jsonwebtoken";

export const decode = (token) =>
  jwt.verify(token.split("=")[1], process.env.JWT_SECRET);
