import clsx from "clsx";
import { styles } from ".";

export const HeroVideo = () => (
  <div className={clsx(styles.video, styles.cardContainer)}>
    <iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/92l1-LzJZxI"
      title="Better Bedrock Projects: AD Revenue Tutorial | MCBE"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  </div>
);
