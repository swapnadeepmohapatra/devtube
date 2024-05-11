"use client";
import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  src: string;
  styles?: string;
}

const VideoPlayer = ({ src, styles }: VideoPlayerProps) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported()) {
      console.log("HLS is supported");
      console.log(src);
      const hls = new Hls();
      if (video) {
        hls.attachMedia(video);
      }
      hls.loadSource(src);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        console.log("playing video");

        if (video) {
          (video as HTMLVideoElement).play();
        }
      });
      // setInterval(() => {
      //   // console.log(hls.currentLevel);
      //   console.log(
      //     hls.levels[hls.currentLevel].height,
      //     hls.levels[hls.currentLevel].width,
      //     hls.levels[hls.currentLevel].bitrate,
      //     hls.levels[hls.currentLevel].name
      //   );
      // }, 1000);
    } else {
      console.log("HLS is not supported");
      // Play from the original video file
    }
  }, [src]);

  return <video className={styles} ref={videoRef} controls />;
};

export default VideoPlayer;
