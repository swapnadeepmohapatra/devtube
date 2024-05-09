"use client";
import VideoPlayer from "@/components/VideoPlayer";
import React from "react";

function Home() {
  //   useEffect(() => {
  //   const checkAuth = async () => {
  //     const isAuth = await isAuthenticated();
  //     if (isAuth) {
  //       window.location.href = "/";
  //     }
  //   };
  //   checkAuth();
  // }, [isAuthenticated]);
  return (
    <div>
      <h1>Video</h1>
      <VideoPlayer />
    </div>
  );
}

export default Home;
