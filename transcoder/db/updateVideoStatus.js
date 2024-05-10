import Video from "../models/video.model.js";

export const updateVideoStatus = async (uploadId, status) => {
  try {
    const video = await Video.findOne({ uploadId });
    video.status = status;
    await video.save();
  } catch (error) {
    console.error(error);
  }
};
