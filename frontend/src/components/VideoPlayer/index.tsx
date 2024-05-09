"use client";
import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const src =
    "https://d3k7jx4586igb2.cloudfront.net/hls/WhyArvindKejriwalGotArrested_DelhiLiquorScam_mp4_master.m3u8";
  // "https://hhld-youtube-app.s3.ap-south-1.amazonaws.com/hls/WhyArvindKejriwalGotArrested_DelhiLiquorScam_mp4_master.m3u8?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA6GBMETUMVQQS37O3%2F20240509%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240509T190457Z&X-Amz-Expires=3600&X-Amz-Signature=a5a016ab562a52937ec4040cee013f2ad2007b6fae027e39383014b0cc57d5a8&X-Amz-SignedHeaders=host";
  //   const src =

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
    } else {
      console.log("HLS is not supported");
      // Play from the original video file
    }
  }, [src]);

  return <video ref={videoRef} controls />;
};

export default VideoPlayer;
