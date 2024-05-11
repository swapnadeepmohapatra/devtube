"use client";
import VideoPlayer from "@/components/VideoPlayer";
import { Video, VideoContext } from "@/contexts/VideoContext";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import styles from "./index.module.css";
import VideoElement from "@/components/VideoElement";

function WatchPage() {
  const [video, setVideo] = useState<Video | {}>({});
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const { getVideo, getRelatedVideos } = useContext(VideoContext);
  const { slug } = useParams();

  useEffect(() => {
    setVideo(getVideo(slug.toString()));
    setRelatedVideos(getRelatedVideos(slug.toString()));
  }, [slug, getVideo, setVideo, getRelatedVideos]);

  if (!video) {
    return <div>Loading...</div>;
  }

  if (!video.url) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.videoContainer}>
        <VideoPlayer src={video?.url} styles={styles.videoPlayer} />
        <h2>{video?.title}</h2>
        <p>{video?.description}</p>
      </div>
      <div className={styles.relatedVideo}>
        <h2>Related Videos</h2>
        {relatedVideos.length === 0 && <p>No related videos</p>}
        {relatedVideos.map((video) => (
          <VideoElement key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default WatchPage;
