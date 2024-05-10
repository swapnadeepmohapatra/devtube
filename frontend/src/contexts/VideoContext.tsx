import { BACKEND_URL } from "@/config/keys";
import React, { createContext, useEffect, useState } from "react";

export interface Video {
  _id: string;
  title: string;
  description: string;
  author: string;
  filename: string;
  totalChunks: number;
  uploadId: string;
  status: string;
  __v: number;
  url: string;
  thumbnails: string[];
}

export interface VideoContextType {
  videos: Video[];
}

export const VideoContext = createContext<VideoContextType>({
  videos: [],
});

export const VideoProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [videos, setVideos] = useState<Video[]>([]);

  const getVideos = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/watch/videos`);
      const data = await response.json();
      console.log(data);
      setVideos(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <VideoContext.Provider value={{ videos: videos }}>
      {children}
    </VideoContext.Provider>
  );
};
