import express from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "./db/connectToMongoDB.js";
import { PORT } from "./utils/config.js";
import KafkaConfig from "./kafka/kafka.js";
import s3ToS3 from "./transcode/transcode.js";

dotenv.config();

const app = express();

const kafkaconfig = new KafkaConfig();

app.use(express.json());

kafkaconfig.consume("transcode", (value) => {
  console.log("got data from kafka : ", value);
  s3ToS3({
    mp4FileName: JSON.parse(value).Key,
    uploadId: JSON.parse(value).UploadId,
  });
});

// app.get("/", async (req, res) => {
//   await s3ToS3("hls/BJPsREALPower.mp4");
//   res.send("Done");
// });

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is listening at http://localhost:${PORT}`);
});
