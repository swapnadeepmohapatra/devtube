"use client";
import VideoElement from "@/components/VideoElement";
import VideoPlayer from "@/components/VideoPlayer";
import { VideoContext } from "@/contexts/VideoContext";
import React, { useContext } from "react";
import styles from "./index.module.css";

function Home() {
  const { videos } = useContext(VideoContext);

  return (
    <div>
      <h1>Video</h1>
      <div className={styles.videoGrid}>
        {videos.map((video) => (
          <VideoElement key={video._id} video={video} />
        ))}
      </div>

      {/* <VideoPlayer /> */}
    </div>
  );
}

export default Home;
