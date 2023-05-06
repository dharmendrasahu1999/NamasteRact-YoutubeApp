import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    setLoader(true);
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const json = await data.json();
    // console.log(json.items )
    setVideos(json.items);
    setLoader(false);
  };
  return loader ? (
    <h1> Loading....</h1>
  ) : (
    <div className="flex flex-wrap">
      {videos.map((video) => (
        <Link to = {"/watch?v="+video.id} key={video.id}>
          <VideoCard  info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
