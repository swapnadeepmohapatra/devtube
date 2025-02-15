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
  getVideo: (id: string) => Video | object;
  getRelatedVideos: (id: string) => Video[];
}

export const VideoContext = createContext<VideoContextType>({
  videos: [],
  getVideo: (id: string) => {
    console.log(id);

    return {};
  },
  getRelatedVideos: (id: string) => {
    console.log(id);

    return [];
  },
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

  const getVideo = (id: string) => {
    return videos.find((video) => video._id === id) || {};
  };

  const getRelatedVideos = (id: string) => {
    return videos.filter((video) => video._id !== id);
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <VideoContext.Provider value={{ videos, getVideo, getRelatedVideos }}>
      {children}
    </VideoContext.Provider>
  );
};
