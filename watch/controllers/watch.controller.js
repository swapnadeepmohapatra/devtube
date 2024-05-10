import Video from "../models/video.model.js";
import { CLOUDFRONT_DOMAIN } from "../utils/config.js";

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json({
      status: "success",
      message: "Videos fetched successfully",
      data: videos.map((video) => ({
        ...video._doc,
        url: `${CLOUDFRONT_DOMAIN}/hls/${video.filename.replace(
          ".",
          "_"
        )}_converted/${video.filename.replace(".", "_")}_master.m3u8`,
        thumbnails: [
          `${CLOUDFRONT_DOMAIN}/hls/${video.filename.replace(
            ".",
            "_"
          )}_converted/thumbnails/thumbnail1.png`,
          `${CLOUDFRONT_DOMAIN}/hls/${video.filename.replace(
            ".",
            "_"
          )}_converted/thumbnails/thumbnail2.png`,
          `${CLOUDFRONT_DOMAIN}/hls/${video.filename.replace(
            ".",
            "_"
          )}_converted/thumbnails/thumbnail3.png`,
        ],
      })),
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch videos",
      data: {},
    });
  }
};
