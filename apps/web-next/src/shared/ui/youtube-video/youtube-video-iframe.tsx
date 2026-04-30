import clsx from "clsx";

import styles from "./youtube-video.module.scss";
import { YoutubeVideoProps } from "@/shared/ui/youtube-video/youtube-video";

export const YoutubeVideoIframe = ({
  id,
  title,
  className,
}: YoutubeVideoProps) => (
  <div className={clsx(styles.video, className && className)}>
    <iframe
      width="100%"
      height="100%"
      src={"https://www.youtube.com/embed/" + id + "?autoplay=1"}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      loading="lazy"
    ></iframe>
  </div>
);
