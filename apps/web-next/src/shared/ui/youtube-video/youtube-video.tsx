"use client";

import { useState } from "react";

import { YoutubeVideoThumbnail } from "./youtube-video-thumbnail";
import { YoutubeVideoIframe } from "./youtube-video-iframe";

export interface YoutubeVideoProps {
  title: string;
  id: string;
  className?: string;
}

export const YoutubeVideo = ({ title, id, className }: YoutubeVideoProps) => {
  const [loadIFrame, setLoadIframe] = useState(false);

  return loadIFrame ? (
    <YoutubeVideoIframe title={title} id={id} className={className} />
  ) : (
    <YoutubeVideoThumbnail
      className={className}
      id={id}
      title={title}
      setLoadIframe={setLoadIframe}
    />
  );
};
