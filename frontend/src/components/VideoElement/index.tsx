import React from "react";
import { Video } from "@/contexts/VideoContext";
import styles from "./index.module.css";
import Image from "next/image";

export interface VideoElementProps {
  video: Video;
}

function VideoElement({
  video: {
    title,
    description,
    author,
    filename,
    totalChunks,
    uploadId,
    status,
    url,
    thumbnails,
  },
}: Readonly<VideoElementProps>) {
  return (
    <div className={styles.videoContainer}>
      <div className={styles.videoThumbnail}>
        <Image
          src={thumbnails[1]}
          width={1000}
          height={1000}
          alt={title}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </div>
      <div className={styles.videoInfo}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default VideoElement;
