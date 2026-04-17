import clsx from "clsx";
import Image from "next/image";

import styles from "./youtube-video.module.scss";
import { YoutubeVideoProps } from "@/shared/ui/youtube-video/youtube-video";
import { Dispatch, SetStateAction } from "react";

interface YoutubeVideoThumbnailProps extends YoutubeVideoProps {
  setLoadIframe: Dispatch<SetStateAction<boolean>>;
}

export const YoutubeVideoThumbnail = ({
  id,
  title,
  className,
  setLoadIframe,
}: YoutubeVideoThumbnailProps) => {
  return (
    <div className={clsx(styles.video, className && className)}>
      <Image
        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
        alt={title}
        onClick={() => setLoadIframe(true)}
        width={1280}
        height={720}
        loading="lazy"
        className={styles.thumbnail}
      />
      <div className={styles.play}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
          viewBox="0 0 512 512"
        >
          <path
            d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-56 296V168l144 88z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};
