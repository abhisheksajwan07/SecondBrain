import ReactPlayer from "react-player";
import { ShareIcon } from "./icons/ShareIcon";
import { useEffect } from "react";

declare global {
  interface Window {
    twttr?: any;
  }
}

interface CardProps {
  title: string;
  link: string;
  type: string;
}

export const Card = ({ title, link, type }: CardProps) => {
  useEffect(() => {
  if  (type==="twitter" && window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load();
  }
}, [link,type]);
  return (
    <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-md max-w-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-lg font-medium text-gray-800">
          <div className="text-gray-500 pr-2">
            <ShareIcon />
          </div>
          {title}
        </div>
        <div className="flex items-center space-x-3 text-gray-500">
          <div className="pr-2 text-gray-500">
            <a href={link} target="_blank">
              <ShareIcon />
            </a>
          </div>
          <div className="text-gray-500">
            <ShareIcon />
          </div>
        </div>
      </div>

      <div className="rounded-md flex justify-center overflow-hidden max-h-[50vh] ">
        {type === "youtube" && (
          <ReactPlayer
            src={link.replace("watch", "embed").replace("?v=", "/")}
            width="100%"
            height="100%"
            controls
            style={{ aspectRatio: "16/9" }}
          />
        )}
        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
};
