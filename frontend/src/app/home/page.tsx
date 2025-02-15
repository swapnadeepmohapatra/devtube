"use client";
import VideoElement from "@/components/VideoElement";
// import VideoPlayer from "@/components/VideoPlayer";
import { VideoContext } from "@/contexts/VideoContext";
import React, { useContext } from "react";
import styles from "./index.module.css";

function Home() {
  const { videos } = useContext(VideoContext);

  return (
    <>
      <div className={styles.videoGrid}>
        {videos.map((video) => (
          <VideoElement key={video._id} video={video} />
        ))}
      </div>
      {videos.length === 0 && (
        <div className={styles.noVideos}>
          <h1>No videos found</h1>
          <br />
          <h2>
            The background services like OpenSearch, CloudFront CDN and other
            services might have been disabled due to high costs. Please contact
            the developer to enable the services.
          </h2>
          <br />
          <h3>
            The developer can be contacted via the{" "}
            <a
              href="mailto:hello@swapnadeep.com"
              style={{
                color: "rgb(3, 196, 184)",
              }}
            >
              email
            </a>
          </h3>
          <br />
          <h3>
            You can visit the GitHub repository{" "}
            <a
              href="https://github.com/swapnadeepmohapatra/devtube"
              style={{
                color: "rgb(3, 196, 184)",
              }}
            >
              here
            </a>
          </h3>
          <br />
          <br />
          <br />
          <h3>
            <a
              href="https://swapnadeep.com"
              style={{
                color: "rgb(3, 196, 184)",
              }}
            >
              View the developer&#39;s website
            </a>
          </h3>
        </div>
      )}
    </>
  );
}

export default Home;
