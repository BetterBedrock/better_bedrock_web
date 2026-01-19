"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./youtube-video.module.scss";
import clsx from "clsx";

interface YoutubeVideoProps {
  title: string;
  id: string;
  className?: string;
}

export const YoutubeVideo = ({ title, id, className }: YoutubeVideoProps) => {
  const [loadIFrame, setLoadIframe] = useState(false);

  if (!loadIFrame)
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

  return (
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
};
