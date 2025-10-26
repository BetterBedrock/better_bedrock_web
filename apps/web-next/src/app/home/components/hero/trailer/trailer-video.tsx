import { styles } from ".";

export const TrailerVideo = () => (
  <div className={styles.video}>
    <iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/uCB4S8EE28k"
      title="Better Bedrock: Projects | Release Trailer"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  </div>
);
