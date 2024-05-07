import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8081;

app.use(
  cors({
    allowedHeaders: ["*"],
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Auth service is running",
    data: req.headers,
  });
});

app.listen(PORT, () => {
  console.log(`Auth service is running on port: ${PORT}`);
});
