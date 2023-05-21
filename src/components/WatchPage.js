import React, { useEffect } from "react";
import { closeMenu } from "../utils/appSlice";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get("v"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    dispatch(closeMenu());
     // eslint-disable-next-line
  }, []);
  return (
    <div className="flex flex-col w-full">
    <div className="px-5 flex w-full">
      <div>
      <iframe
        width="1000px"
        height="600"
        src={"https://www.youtube.com/embed/"+searchParams.get("v")}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      </div>
      <div className="w-full">
        <LiveChat/>
      </div>
    </div>
    <CommentsContainer/>
    </div>
  );
};

export default WatchPage;
