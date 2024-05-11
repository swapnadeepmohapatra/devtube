"use client";
import VideoElement from "@/components/VideoElement";
import VideoPlayer from "@/components/VideoPlayer";
import { VideoContext } from "@/contexts/VideoContext";
import React, { useContext } from "react";
import styles from "./index.module.css";

function Home() {
  const { videos } = useContext(VideoContext);

  return (
    <div className={styles.videoGrid}>
      {videos.map((video) => (
        <VideoElement key={video._id} video={video} />
      ))}
    </div>
  );
}

export default Home;
