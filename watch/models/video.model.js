import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    totalChunks: {
      type: Number,
      required: true,
    },
    uploadId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;
