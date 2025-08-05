import { styles } from ".";

export const TrailerVideo = () => (
  <div className={styles.video}>
    <iframe
      width="100%"
      height="100%"
      // todo: update 
      src="https://www.youtube.com/embed/v5O-AG9P1Ag"
      title="BETTER BEDROCK V7 RELEASE! The Best Utility Texture Pack for Minecraft Bedrock | Showcase Trailer"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  </div>
);
