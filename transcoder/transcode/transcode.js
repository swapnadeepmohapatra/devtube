import AWS from "aws-sdk";
import fs from "fs";
import path, { parse } from "path";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import {
  AWS_ACCESS_KEY_ID,
  AWS_BUCKET,
  AWS_SECRET_ACCESS_KEY,
} from "../utils/config.js";
import ffprobe from "ffprobe";
import ffprobeStatic from "ffprobe-static";

ffmpeg.setFfmpegPath(ffmpegStatic);

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const bucketName = AWS_BUCKET;
const hlsFolder = "hls";

const s3ToS3 = async (mp4FileName) => {
  console.log("Starting script");
  console.time("req_time");
  try {
    console.log("Downloading s3 mp4 file locally");

    console.log("mp4FileName: ", mp4FileName);

    const mp4FilePath = `${mp4FileName}`;

    console.log("mp4FilePath: ", mp4FilePath);

    const writeStream = fs.createWriteStream("local.mp4");
    const readStream = s3
      .getObject({ Bucket: bucketName, Key: mp4FilePath })
      .createReadStream();
    readStream.pipe(writeStream);
    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });
    console.log("Downloaded s3 mp4 file locally");

    const metadata = await ffprobe("local.mp4", { path: ffprobeStatic.path });

    const duration = metadata.streams[0].duration;
    const height = metadata.streams[0].height;
    const width = metadata.streams[0].width;

    // Create dynamic resolutions based on the height and width of the video
    const resolutions = [
      {
        resolution: `${parseInt(width / 3)}x${parseInt(height / 3)}`,
        videoBitrate: "500k",
        audioBitrate: "64k",
      },
      {
        resolution: `${parseInt(width / 2)}x${parseInt(height / 2)}`,
        videoBitrate: "1000k",
        audioBitrate: "128k",
      },
      {
        resolution: `${width}x${height}`,
        videoBitrate: "2500k",
        audioBitrate: "192k",
      },
    ];

    console.log(resolutions);

    // const resolutions = [
    //   {
    //     resolution: "320x180",
    //     videoBitrate: "500k",
    //     audioBitrate: "64k",
    //   },
    //   {
    //     resolution: "854x480",
    //     videoBitrate: "1000k",
    //     audioBitrate: "128k",
    //   },
    //   {
    //     resolution: "1280x720",
    //     videoBitrate: "2500k",
    //     audioBitrate: "192k",
    //   },
    // ];

    const conversionPromises = [];
    for (const { resolution, videoBitrate, audioBitrate } of resolutions) {
      console.log(`HLS conversion starting for ${resolution}`);
      const outputFileName = `${mp4FileName.replace(
        ".",
        "_"
      )}_${resolution}.m3u8`;
      const segmentFileName = `${mp4FileName.replace(
        ".",
        "_"
      )}_${resolution}_%03d.ts`;
      const promise = new Promise((resolve, reject) => {
        ffmpeg("./local.mp4")
          .outputOptions([
            `-c:v h264`,
            `-b:v ${videoBitrate}`,
            `-c:a aac`,
            `-b:a ${audioBitrate}`,
            `-vf scale=${resolution}`,
            `-f hls`,
            `-hls_time 10`,
            `-hls_list_size 0`,
            `-hls_segment_filename hls/${segmentFileName}`,
          ])
          .output(`hls/${outputFileName}`)
          .on("end", () => resolve())
          .on("error", (err) => reject(err))
          .run();
      });
      conversionPromises.push(promise);
    }
    await Promise.all(conversionPromises);

    console.log(`HLS conversion done for all resolutions`);

    console.log(`HLS master m3u8 playlist generating`);
    let masterPlaylist = resolutions
      .map(({ resolution }, index) => {
        const outputFileName = `${mp4FileName.replace(
          ".",
          "_"
        )}_${resolution}.m3u8`;
        const bandwidth = [676800, 1353600, 3230400][index];
        return `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${resolution}\n${outputFileName}`;
      })
      .join("\n");
    masterPlaylist = `#EXTM3U\n` + masterPlaylist;

    const masterPlaylistFileName = `${mp4FileName.replace(
      ".",
      "_"
    )}_master.m3u8`;
    const masterPlaylistPath = `hls/${masterPlaylistFileName}`;
    fs.writeFileSync(masterPlaylistPath, masterPlaylist);

    console.log(`HLS master m3u8 playlist generated`);

    console.log("Creating thumbnails");

    const thumbnailPromises = [0.2, 0.5, 0.8].map(async (position, index) => {
      console.log(`Creating thumbnail ${index + 1}`);
      const outputPath = `hls/thumbnail${index + 1}.png`;
      return new Promise((resolve, reject) => {
        ffmpeg("local.mp4")
          .seekInput(parseInt(duration * position))
          .frames(1)
          .output(outputPath)
          .on("end", () => resolve())
          .on("error", (err) => reject(err))
          .run();
      });
    });

    await Promise.all(thumbnailPromises);

    console.log("Thumbnails created");

    console.log(`Uploading thumbnails to s3`);

    const thumbnailFiles = fs.readdirSync(hlsFolder);
    const thumbnailUploadPromises = thumbnailFiles.map((file) => {
      if (!file.startsWith("thumbnail")) {
        return Promise.resolve();
      }
      const filePath = path.join(hlsFolder, file);
      const fileStream = fs.createReadStream(filePath);
      const uploadParams = {
        Bucket: bucketName,
        Key: `${hlsFolder}/${mp4FileName.replace(
          ".",
          "_"
        )}_converted/thumbnails/${file}`,
        Body: fileStream,
        ContentType: "image/png",
      };
      return s3
        .upload(uploadParams)
        .promise()
        .then(() => fs.unlinkSync(filePath));
    });

    await Promise.all(thumbnailUploadPromises);

    console.log(`Uploaded thumbnails to s3`);

    console.log(`Uploading media m3u8 playlists and ts segments to s3`);

    const files = fs.readdirSync(hlsFolder);

    const uploadPromises = files.map((file) => {
      if (!file.startsWith(mp4FileName.replace(".", "_"))) {
        return Promise.resolve();
      }
      const filePath = path.join(hlsFolder, file);
      const fileStream = fs.createReadStream(filePath);
      const uploadParams = {
        Bucket: bucketName,
        Key: `${hlsFolder}/${mp4FileName.replace(".", "_")}_converted/${file}`,
        Body: fileStream,
        ContentType: file.endsWith(".ts")
          ? "video/mp2t"
          : file.endsWith(".m3u8")
          ? "application/x-mpegURL"
          : null,
      };
      return s3
        .upload(uploadParams)
        .promise()
        .then(() => fs.unlinkSync(filePath));
    });

    await Promise.all(uploadPromises);

    console.log(
      `Uploaded media m3u8 playlists and ts segments to s3. Also deleted locally`
    );

    console.log(`Deleting locally downloaded s3 mp4 file`);

    fs.unlinkSync("local.mp4");

    console.log(`Deleted locally downloaded s3 mp4 file`);

    console.log("Success. Time taken: ");
    console.timeEnd("req_time");
  } catch (error) {
    console.error("Error:", error);
  }
};

export default s3ToS3;
